// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
    </form>
  );
};

export default FileUpload;
