import React from 'react';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header style={headerStyle}>
      <h1>Note Taking App</h1>
      
      <input 
        type="text" 
        placeholder="Search notes..." 
        value={searchTerm} 
        onChange={onSearchChange} 
        style={inputStyle} 
        
      />
    </header>
  );
};

const headerStyle = {
  marginLeft: '20px',
  padding: '2px',
  textAlign: 'left',
  color: '#282c34',
  display:'flex',
  justifyContent:'space-between'
};

const inputStyle = {

  padding: '2px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '300px', 
  height:'40px',
  marginRight:'40px',
  marginTop:'15px'
};

export default Header;
