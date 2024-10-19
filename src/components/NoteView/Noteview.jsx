import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const NoteView = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find(note => note.id === parseInt(id));

  const [editNote, setEditNote] = useState(note);

  if (!note) {
    return <p>Note not found!</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNote({
      ...editNote,
      [name]: value,
    });
  };

  const handleSave = () => {
    setNotes(notes.map(n => (n.id === note.id ? editNote : n)));
    navigate('/');
  };

  const handleDelete = () => {
    setNotes(notes.filter(n => n.id !== note.id)); 
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <p onClick={handleBack} style={backButtonStyle}><IoMdArrowRoundBack /></p>
        <h2 style={headerTextStyle}>Edit Note</h2>
      </div>
      <input
        type="text"
        name="title"
        value={editNote.title}
        onChange={handleInputChange}
        style={inputStyle}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={editNote.content}
        onChange={handleInputChange}
        style={textareaStyle}
        placeholder="Content"
      />
            <input
        type="text"
        name="category"
        value={editNote.category}
        onChange={handleInputChange}
        style={inputStyle}
        placeholder="Category"
      />
      <select
        name="status"
        value={editNote.status}
        onChange={handleInputChange}
        style={selectStyle}
      >
        <option value="Pending">Pending</option>
        <option value="Working">Working</option>
        <option value="Done">Done</option>
      </select>

      <div style={buttonContainerStyle}>
        <button onClick={handleDelete} style={deleteButtonStyle}>
          Delete Note
        </button>
        <button onClick={handleSave} style={buttonStyle}>
          Save
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',        
  margin: '0 auto',  
  padding: '20px',
  textAlign: 'center',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  width: '100%',
  position: 'relative',    
};

const backButtonStyle = {
  position: 'absolute',     
  left: 0,
  cursor: 'pointer',
  fontSize: '24px',
};

const headerTextStyle = {
  textAlign: 'center',
  flex: '1',
};

const inputStyle = {
  width: '100%',            
  padding: '10px',
  marginBottom: '10px',
  marginTop:'10px',
};

const textareaStyle = {
  width: '100%',           
  padding: '10px',
  height: '200px',
};

const selectStyle = {
  width: '80%',           
  padding: '10px',
  marginTop: '10px',
  marginBottom:'10px', 
  marginLeft:'0',
  marginRight:'0',

};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  width: '100%',            
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px'
};

const deleteButtonStyle = {
  padding: '10px 20px',
  backgroundColor: 'gray',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px'
};

export default NoteView;
