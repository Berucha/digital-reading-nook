import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { updateBook, deleteBook } = useBooks();
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: book.status,
    format: book.format,
    rating: book.rating,
    notes: book.notes
  });

  const handleUpdate = () => {
    updateBook(book.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this book from your shelf?')) {
      deleteBook(book.id);
    }
  };

  const formatOptions = [
    { value: 'physical', label: '📖 Physical', emoji: '📖' },
    { value: 'ebook', label: '📱 E-book', emoji: '📱' },
    { value: 'audiobook', label: '🎧 Audiobook', emoji: '🎧' }
  ];

  const statusOptions = [
    { value: 'want-to-read', label: 'Want to Read' },
    { value: 'reading', label: 'Currently Reading' },
    { value: 'read', label: 'Read' }
  ];

  const getFormatEmoji = (format) => {
    return formatOptions.find(f => f.value === format)?.emoji || '📖';
  };

  return (
    <div className="book-card">
      <div className="book-cover-container">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="book-cover" />
        ) : (
          <div className="book-cover-placeholder">
            <span>📚</span>
          </div>
        )}
        <div className="book-format-badge">{getFormatEmoji(book.format)}</div>
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.authors?.join(', ')}</p>
        
        {book.rating > 0 && (
          <div className="book-rating">
            {'⭐'.repeat(book.rating)}
          </div>
        )}
      </div>

      <div className="book-actions">
        <button 
          className="btn-icon"
          onClick={() => setShowDetails(!showDetails)}
          title="View details"
        >
          {showDetails ? '▲' : '▼'}
        </button>
      </div>

      {showDetails && (
        <div className="book-details">
          {!isEditing ? (
            <>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`status-badge status-${editData.status}`}>
                  {statusOptions.find(s => s.value === editData.status)?.label}
                </span>
              </div>
              <div className="detail-row">
                <strong>Format:</strong>
                <span>{formatOptions.find(f => f.value === editData.format)?.label}</span>
              </div>
              <div className="detail-row">
                <strong>Rating:</strong>
                <span>{editData.rating > 0 ? '⭐'.repeat(editData.rating) : 'Not rated'}</span>
              </div>
              {editData.notes && (
                <div className="detail-row">
                  <strong>Notes:</strong>
                  <p className="book-notes">{editData.notes}</p>
                </div>
              )}
              
              <div className="detail-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={handleDelete}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Format</label>
                <select
                  value={editData.format}
                  onChange={(e) => setEditData({ ...editData, format: e.target.value })}
                >
                  {formatOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= editData.rating ? 'active' : ''}`}
                      onClick={() => setEditData({ ...editData, rating: star })}
                    >
                      ⭐
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => setEditData({ ...editData, rating: 0 })}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  placeholder="Add your thoughts..."
                  rows="3"
                />
              </div>

              <div className="detail-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      status: book.status,
                      format: book.format,
                      rating: book.rating,
                      notes: book.notes
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
