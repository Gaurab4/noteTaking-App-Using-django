import React, { useState } from 'react';

const CreateNote = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '', status: 'Pending', category: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleCreate = () => {
    if (!newNote.title || !newNote.content) {
      alert('Please fill out both title and content!');
      return;
    }
   
    const noteToAdd = { ...newNote, id: Date.now() };
    setNotes([...notes, noteToAdd]);
   
    setNewNote({ title: '', content: '', status: 'Pending', category: '' });
  };

  return (
    <div style={containerStyle}>
      <h2>Create Note</h2>
      <input
        type="text"
        name="title"
        value={newNote.title}
        onChange={handleInputChange}
        placeholder="Note Title"
        style={inputStyle}
      />
      <textarea
        name="content"
        value={newNote.content}
        onChange={handleInputChange}
        placeholder="Note Content"
        style={textareaStyle}
      />
      <button onClick={handleCreate} style={buttonStyle}>Create</button>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  textAlign: 'center',
};

const inputStyle = {
  width: '95%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '8px',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  height: '200px',
  borderRadius: '8px',
  resize: 'none',
};

const buttonStyle = {
  padding: '15px 30px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
};

export default CreateNote;
