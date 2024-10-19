import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNote from '../CreateNote/Createnote';
import { MdModeEdit } from "react-icons/md";

const NoteList = ({ notes, setNotes,searchTerm }) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const navigate = useNavigate();


  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentNotes = showAll ? [...filteredNotes].reverse() : [...filteredNotes].reverse().slice(0, 12);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleExpandNote = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/note/${id}`);
  };

  const handleNavigateDashboard = () => {
    navigate('/dashboard');
  };

  const truncateText = (text, maxLength = 15) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div style={containerStyle}>
      <div style={leftRightContainerStyle}>
        <div style={leftColumnStyle}>
          <CreateNote notes={notes} setNotes={setNotes} />
        </div>

        <div style={rightColumnStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Recent Notes</h2>
            <button onClick={handleNavigateDashboard} style={dashboardButtonStyle}>
              Go to Dashboard
            </button>
          </div>
          

          

          {filteredNotes.length === 0 ? (
            <p>No notes available!! Create a new note.</p>
          ) : (
            <div style={scrollableContainerStyle}>
              <div style={gridStyle}>
                {recentNotes.map(note => (
                  <div
                    key={note.id}
                    style={{
                      ...noteStyle,
                      height: expandedNoteId === note.id ? '100px' : '50px',
                    }}
                    onClick={() => handleExpandNote(note.id)}
                  >
                    <div style={noteHeaderStyle}>
                      <p style={noteLinkStyle}>
                        {truncateText(note.title)}
                      </p>
                      {expandedNoteId === note.id && (
                        <MdModeEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(note.id);
                          }}
                          style={editIconStyle}
                        />
                      )}
                    </div>
                    {expandedNoteId === note.id && (
                    <>
                      <div style={noteContentStyle}>Content: {truncateText(note.content, 40)}</div>
                      <div>Status: {note.status}</div>
                    </>  
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showAll && recentNotes.length >= 12 && (
            <button onClick={handleShowAll} style={buttonStyle}>
              Show All Notes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  textAlign: 'center',
};

const leftRightContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const leftColumnStyle = {
  flex: '1',
  padding: '20px',
  borderRight: '1px solid #ddd',
};

const rightColumnStyle = {
  flex: '1',
  padding: '20px',
  maxHeight: '80vh',
  overflow: 'hidden',
};

const scrollableContainerStyle = {
  maxHeight: '70vh',
  overflowY: 'auto',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px',
};

const noteStyle = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '15px',
  cursor: 'pointer',
  transition: 'height 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
};

const noteHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const noteLinkStyle = {
  textDecoration: 'none',
  color: '#000',
  fontWeight: 'bold',
  flex: '1',
};

const editIconStyle = {
  fontSize: '20px',
  color: '#007bff',
  cursor: 'pointer',
};

const noteContentStyle = {
  marginTop: '10px',
  color: '#333',
  maxHeight: '150px',
  overflowY: 'auto',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  marginTop: '20px',
};

const dashboardButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  marginLeft: '20px',
  borderRadius:'8px'
};

// New style for the search bar
const searchBarStyle = {
  width: '100%',
  padding: '10px',
  margin: '20px 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

export default NoteList;
