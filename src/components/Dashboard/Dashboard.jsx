// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent, Droppable, useDraggable, useDroppable } from '@dnd-kit/core';
import { MdArrowBack } from "react-icons/md"; // Import back icon

const Dashboard = ({ notes, setNotes }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const [notesByStatus, setNotesByStatus] = useState({
    Pending: notes.filter(note => note.status === 'Pending'),
    Working: notes.filter(note => note.status === 'Working'),
    Done: notes.filter(note => note.status === 'Done'),
  });

  const handleDragEnd = ({ active, over }) => {
    if (over) {
      const oldStatus = notes.find(note => note.id === active.id).status;
      const newStatus = over.id;

      // Update note status
      const updatedNotes = notes.map(note =>
        note.id === active.id ? { ...note, status: newStatus } : note
      );

      setNotes(updatedNotes);
      setNotesByStatus({
        Pending: updatedNotes.filter(note => note.status === 'Pending'),
        Working: updatedNotes.filter(note => note.status === 'Working'),
        Done: updatedNotes.filter(note => note.status === 'Done'),
      });
    }
  };

  const DraggableNote = ({ note }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: note.id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          padding: '10px',
          margin: '5px 0',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {note.title}
      </div>
    );
  };

  const DroppableColumn = ({ status }) => {
    const { setNodeRef } = useDroppable({
      id: status,
    });

    return (
      <div
        ref={setNodeRef}
        style={{
          flex: 1,
          margin: '0 10px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          minHeight: '300px',
        }}
      >
        <h3>{status}</h3>
        {notesByStatus[status].map(note => (
          <DraggableNote key={note.id} note={note} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Back Icon */}
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '10px' }} onClick={() => navigate('/')}>
        <MdArrowBack style={{ fontSize: '24px', marginRight: '8px' }} />
        <span style={{ fontSize: '18px' }}>Back</span>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['Pending', 'Working', 'Done'].map(status => (
            <DroppableColumn key={status} status={status} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
