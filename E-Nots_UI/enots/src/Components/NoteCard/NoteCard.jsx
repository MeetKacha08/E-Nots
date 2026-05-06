import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css'; 

const NoteCard = ({ note, onDelete }) => {
  // State to control if the popup is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format both dates to look nice (e.g., "May 6, 2026")
  const formattedCreated = new Date(note.createdAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const formattedUpdated = new Date(note.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const contentPreview = note.content 
    ? note.content.substring(0, 60) + (note.content.length > 60 ? '...' : '') 
    : 'No content';

  return (
    <>
      {/* 1. The Main Card (Now Clickable) */}
      <div className="note-card" onClick={() => setIsModalOpen(true)}>
        <h3 className="note-card-title">{note.title}</h3>
        
        <div className="note-card-dates">
          <small className="note-card-date">Created: {formattedCreated}</small>
          <small className="note-card-date">Updated: {formattedUpdated}</small>
        </div>

        <p className="note-card-content">{contentPreview}</p>
        
        <div className="note-card-actions">
          {/* Note: e.stopPropagation() prevents the card click event from firing when we click a button */}
          <Link 
            to={`/edit/${note.id}`} 
            className="note-btn"
            onClick={(e) => e.stopPropagation()} 
          >
            Edit
          </Link>
          
          <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }} 
              className="note-btn note-btn-danger"
          >
              Delete
          </button>
        </div>
      </div>

      {/* 2. The Popup (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          {/* Prevent clicks inside the white box from closing the modal */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2>{note.title}</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <div className="modal-meta">
              <small>Created: {formattedCreated}</small>
              <small>Last Updated: {formattedUpdated}</small>
            </div>

            <div className="modal-body">
              {note.content ? note.content : <em style={{color: '#999'}}>No content provided.</em>}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;