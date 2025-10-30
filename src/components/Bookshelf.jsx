import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import './Bookshelf.css';

const Bookshelf = ({ books }) => {
  const { updateBook, deleteBook } = useBooks();
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [bookViewMode, setBookViewMode] = useState('spine'); // 'spine' or 'cover'
  const [decorations, setDecorations] = useState([]);

  // Organize books into shelves (5 books per shelf for good visual balance)
  const booksPerShelf = 5;
  const shelves = [];
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  const formatOptions = [
    { value: 'physical', label: '📖 Physical', emoji: '📖' },
    { value: 'ebook', label: '📱 E-book', emoji: '📱' },
    { value: 'audiobook', label: '🎧 Audiobook', emoji: '🎧' }
  ];

  const statusOptions = [
    { value: 'want-to-read', label: 'TBR' },
    { value: 'reading', label: 'Currently Reading' },
    { value: 'read', label: 'Read' }
  ];

  const getFormatEmoji = (format) => {
    return formatOptions.find(f => f.value === format)?.emoji || '📖';
  };

  const getSpineColor = (status) => {
    // Different colors based on status
    if (status === 'reading') return '#7CB342'; // Green
    if (status === 'read') return '#8B5A3C'; // Primary brown
    return '#D4A574'; // Secondary beige for want-to-read
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setEditData({
      status: book.status,
      format: book.format,
      rating: book.rating,
      notes: book.notes
    });
    setIsEditing(false);
  };

  const handleUpdate = () => {
    updateBook(selectedBook.id, editData);
    setSelectedBook({ ...selectedBook, ...editData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this book from your shelf?')) {
      deleteBook(selectedBook.id);
      setSelectedBook(null);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  const availableDecorations = [
    { id: 'plant1', emoji: '🌿', name: 'Small Plant' },
    { id: 'plant2', emoji: '🪴', name: 'Potted Plant' },
    { id: 'plant3', emoji: '🌱', name: 'Sprout' },
    { id: 'cactus', emoji: '🌵', name: 'Cactus' },
    { id: 'candle', emoji: '🕯️', name: 'Candle' },
    { id: 'mug', emoji: '☕', name: 'Coffee Mug' },
    { id: 'frame', emoji: '🖼️', name: 'Picture Frame' },
    { id: 'globe', emoji: '🌍', name: 'Globe' }
  ];

  const addDecoration = (decorationId, shelfIndex) => {
    const decoration = availableDecorations.find(d => d.id === decorationId);
    if (decoration) {
      setDecorations([...decorations, { ...decoration, shelfIndex, id: `${decorationId}-${Date.now()}` }]);
    }
  };

  const removeDecoration = (decorationId) => {
    setDecorations(decorations.filter(d => d.id !== decorationId));
  };

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-controls">
        <div className="view-mode-toggle">
          <button
            className={`mode-btn ${bookViewMode === 'spine' ? 'active' : ''}`}
            onClick={() => setBookViewMode('spine')}
            title="Spine View"
          >
            📚 Spine View
          </button>
          <button
            className={`mode-btn ${bookViewMode === 'cover' ? 'active' : ''}`}
            onClick={() => setBookViewMode('cover')}
            title="Cover View"
          >
            🖼️ Cover View
          </button>
        </div>
      </div>

      {shelves.length === 0 ? (
        <div className="empty-bookshelf">
          <p>Your bookshelf is empty. Add some books to see them here!</p>
        </div>
      ) : (
        shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="shelf">
            <div className="books-row">
              {shelf.map((book) => (
                bookViewMode === 'spine' ? (
                  <div
                    key={book.id}
                    className="book-spine"
                    style={{ backgroundColor: getSpineColor(book.status) }}
                    onClick={() => handleBookClick(book)}
                    onMouseEnter={() => setHoveredBook(book.id)}
                    onMouseLeave={() => setHoveredBook(null)}
                  >
                    <div className="spine-content">
                      <div className="spine-text">
                        <div className="spine-title">{book.title}</div>
                        <div className="spine-author">{book.authors?.[0] || 'Unknown'}</div>
                      </div>
                      <div className="spine-format">{getFormatEmoji(book.format)}</div>
                    </div>
                    
                    {hoveredBook === book.id && (
                      <div className="book-hover-info">
                        <div className="hover-cover">
                          {book.thumbnail ? (
                            <img src={book.thumbnail} alt={book.title} />
                          ) : (
                            <div className="hover-cover-placeholder">📚</div>
                          )}
                        </div>
                        <div className="hover-details">
                          <h4>{book.title}</h4>
                          <p>{book.authors?.join(', ')}</p>
                          {book.rating > 0 && (
                            <div className="hover-rating">{'⭐'.repeat(book.rating)}</div>
                          )}
                          <div className="hover-status">
                            {statusOptions.find(s => s.value === book.status)?.label}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={book.id}
                    className="book-cover-view"
                    onClick={() => handleBookClick(book)}
                    onMouseEnter={() => setHoveredBook(book.id)}
                    onMouseLeave={() => setHoveredBook(null)}
                  >
                    {book.thumbnail ? (
                      <img src={book.thumbnail} alt={book.title} className="cover-image" />
                    ) : (
                      <div className="cover-placeholder">
                        <span>📚</span>
                        <div className="placeholder-title">{book.title}</div>
                      </div>
                    )}
                    <div className="cover-format-badge">{getFormatEmoji(book.format)}</div>
                    
                    {hoveredBook === book.id && (
                      <div className="book-hover-info">
                        <div className="hover-details">
                          <h4>{book.title}</h4>
                          <p>{book.authors?.join(', ')}</p>
                          {book.rating > 0 && (
                            <div className="hover-rating">{'⭐'.repeat(book.rating)}</div>
                          )}
                          <div className="hover-status">
                            {statusOptions.find(s => s.value === book.status)?.label}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ))}
              
              {decorations.filter(d => d.shelfIndex === shelfIndex).map((decoration) => (
                <div key={decoration.id} className="shelf-decoration">
                  <span className="decoration-emoji">{decoration.emoji}</span>
                  <button 
                    className="remove-decoration"
                    onClick={() => removeDecoration(decoration.id)}
                    title="Remove decoration"
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div className="add-decoration-btn">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addDecoration(e.target.value, shelfIndex);
                      e.target.value = '';
                    }
                  }}
                  className="decoration-select"
                >
                  <option value="">+ Add Decoration</option>
                  {availableDecorations.map(dec => (
                    <option key={dec.id} value={dec.id}>
                      {dec.emoji} {dec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="shelf-board"></div>
          </div>
        ))
      )}

      {selectedBook && (
        <div className="book-modal-overlay" onClick={closeModal}>
          <div className="book-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <div className="modal-content">
              <div className="modal-cover">
                {selectedBook.thumbnail ? (
                  <img src={selectedBook.thumbnail} alt={selectedBook.title} />
                ) : (
                  <div className="modal-cover-placeholder">📚</div>
                )}
              </div>

              <div className="modal-info">
                <h2>{selectedBook.title}</h2>
                <p className="modal-author">{selectedBook.authors?.join(', ')}</p>

                {!isEditing ? (
                  <>
                    <div className="modal-detail-row">
                      <strong>Status:</strong>
                      <span className={`status-badge status-${editData.status}`}>
                        {statusOptions.find(s => s.value === editData.status)?.label}
                      </span>
                    </div>
                    <div className="modal-detail-row">
                      <strong>Format:</strong>
                      <span>{formatOptions.find(f => f.value === editData.format)?.label}</span>
                    </div>
                    <div className="modal-detail-row">
                      <strong>Rating:</strong>
                      <span>{editData.rating > 0 ? '⭐'.repeat(editData.rating) : 'Not rated'}</span>
                    </div>
                    {editData.notes && (
                      <div className="modal-detail-row">
                        <strong>Notes:</strong>
                        <p className="modal-notes">{editData.notes}</p>
                      </div>
                    )}
                    
                    <div className="modal-actions">
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
                  <div className="modal-edit-form">
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

                    <div className="modal-actions">
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
                            status: selectedBook.status,
                            format: selectedBook.format,
                            rating: selectedBook.rating,
                            notes: selectedBook.notes
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
