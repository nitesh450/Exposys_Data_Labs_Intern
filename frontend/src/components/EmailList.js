// src/components/EmailList.js
import React from 'react';

const EmailList = ({ validEmails, invalidEmails }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Valid Emails</h2>
      <ul className="list-disc pl-4">
        {validEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Invalid Emails</h2>
      <ul className="list-disc pl-4 text-red-500">
        {invalidEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
