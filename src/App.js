import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList/Notelist';
import Header from './components/Header/Header';
import NoteView from './components/NoteView/Noteview';
import CreateNote from './components/CreateNote/Createnote';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  return (
    <Router>
      <div>
        <Header searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}/>
        <Routes>
          <Route path="/" element={<NoteList notes={notes} setNotes={setNotes} searchTerm={searchTerm} />} />
          <Route path="/note/:id" element={<NoteView notes={notes} setNotes={setNotes} />} />
          <Route path="/create" element={<CreateNote notes={notes} setNotes={setNotes} />} />
          <Route path="/dashboard" element={<Dashboard notes={notes} setNotes={setNotes} />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
