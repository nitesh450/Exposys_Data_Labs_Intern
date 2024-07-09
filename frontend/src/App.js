import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import EmailList from './components/EmailList';
import EmailForm from './components/EmailForm';
import './index.css';

const App = () => {
  const [validEmails, setValidEmails] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setValidEmails(data.validEmails);
      setInvalidEmails(data.invalidEmails);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mass Mail Dispatcher</h1>
      <FileUpload onUpload={handleUpload} />
      <EmailList validEmails={validEmails} invalidEmails={invalidEmails} />
      {validEmails.length > 0 && <EmailForm emails={validEmails} />}
    </div>
  );
};

export default App;
