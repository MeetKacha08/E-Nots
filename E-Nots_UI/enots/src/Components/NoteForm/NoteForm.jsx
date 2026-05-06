import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createNote, updateNote, getNoteById } from '../../services/notesApi';
import './NoteForm.css'; // Import the new CSS file

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const isEditMode = Boolean(id);

  // Moved the fetch function inside useEffect to fix the React warning
  useEffect(() => {
    const fetchExistingNote = async () => {
      try {
        const existingNote = await getNoteById(id);
        setTitle(existingNote.title);
        setContent(existingNote.content || ''); 
      } catch (err) {
        setError('Failed to load the note for editing.');
        console.error(err);
      }
    };

    if (isEditMode) {
      fetchExistingNote();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title.trim()) {
      setError('Title cannot be empty. Please enter a title.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const noteData = { title, content };

    try {
      if (isEditMode) {
        await updateNote(id, noteData);
      } else {
        await createNote(noteData);
      }
      
      navigate('/'); 
    } catch (err) {
      setError('Failed to save the note. Please try again.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="note-form-container">
      <div className="note-form-header">
        <h2>{isEditMode ? 'Edit Note' : 'Create New Note'}</h2>
        <Link to="/" className="note-form-cancel">Cancel</Link>
      </div>

      {error && <div className="note-form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="note-form-body">
        <div className="note-form-group">
          <label className="note-form-label">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-form-input"
            placeholder="Enter note title..."
          />
        </div>

        <div className="note-form-group">
          <label className="note-form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-form-textarea"
            placeholder="Write your note here..."
            rows="8"
          />
        </div>

        <button 
          type="submit" 
          className="note-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;