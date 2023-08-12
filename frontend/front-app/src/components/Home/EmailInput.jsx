import React from 'react';

const EmailInputComponent = () => {
  const emailFieldStyle = {
    width: '350px',
    padding: '10px',
    outline: 'none',
    border: '1px solid #d7d7e0',
    borderRadius: '5px',
    backgroundColor: '#d7d7e0'
  };
  const containerStyle = {
    alignItems: 'flex-start', // Align items to the left
  };
  const asteriskStyle = {
    color: 'red', // Set the color to red
    marginLeft: '2px', // Add some space between the text and the asterisk
  };

  return (
    <div style={containerStyle}>
      <label htmlFor="email" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
        Email
        <span style={asteriskStyle}>*</span>
      </label>
      <textarea
        id="email"
        name="email"
        style={emailFieldStyle}
        placeholder="Enter your email..."
        required
      />
    </div>
  );
};

export default EmailInputComponent;
