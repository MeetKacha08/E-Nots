import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../NoteCard/NoteCard';
import SearchBar from '../SearchBar/SearchBar';
import { getNotes, deleteNote } from '../../services/notesApi';
import './NotesList.css'; // Import the new CSS file

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const data = await getNotes();
      setNotes(data); 
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes. Is your .NET API running?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (err) {
        alert('Failed to delete the note.');
        console.error(err);
      }
    }
  };

  const filteredNotes = notes.filter(note => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchTitle = note.title.toLowerCase().includes(lowerCaseSearch);
    
    const matchContent = note.content 
        ? note.content.toLowerCase().includes(lowerCaseSearch) 
        : false;
    
    return matchTitle || matchContent;
  });

  return (
    <div className="notes-list-container">
      <div className="notes-list-header">
        <h2>My Notes</h2>
        <Link to="/create" className="notes-list-create-btn">+ Create New Note</Link>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {isLoading && <p>Loading notes...</p>}
      
      {error && <p className="notes-list-error">{error}</p>}
      
      {!isLoading && !error && filteredNotes.length === 0 && (
        <div className="notes-list-empty">
          <p>No notes found. {searchTerm ? 'Try a different search.' : 'Create your first note!'}</p>
        </div>
      )}

      <div className="notes-list-grid">
        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;