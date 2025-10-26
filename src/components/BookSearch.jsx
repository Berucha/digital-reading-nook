import { useState } from 'react';
import { searchBooks } from '../utils/bookApi';
import { useBooks } from '../context/BookContext';
import './BookSearch.css';

const BookSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { addBook } = useBooks();
  const [selectedFormat, setSelectedFormat] = useState('physical');
  const [selectedStatus, setSelectedStatus] = useState('want-to-read');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const books = await searchBooks(query);
    setResults(books);
    setLoading(false);
  };

  const handleAddBook = (book) => {
    addBook({
      ...book,
      format: selectedFormat,
      status: selectedStatus
    });
    setSuccessMessage(`"${book.title}" added to your bookshelf!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="book-search">
      <div className="search-header">
        <h3>Search for Books</h3>
        <button className="btn-icon close-btn" onClick={onClose}>✕</button>
      </div>

      {successMessage && (
        <div className="success">{successMessage}</div>
      )}

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="search-options">
        <div className="option-group">
          <label>Add as:</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="search-select"
          >
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Read</option>
          </select>
        </div>

        <div className="option-group">
          <label>Format:</label>
          <select 
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="search-select"
          >
            <option value="physical">📖 Physical</option>
            <option value="ebook">📱 E-book</option>
            <option value="audiobook">🎧 Audiobook</option>
          </select>
        </div>
      </div>

      {loading && <div className="search-loading">Searching...</div>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map(book => (
            <div key={book.id} className="search-result-item">
              <div className="result-cover">
                {book.thumbnail ? (
                  <img src={book.thumbnail} alt={book.title} />
                ) : (
                  <div className="result-placeholder">📚</div>
                )}
              </div>
              <div className="result-info">
                <h4>{book.title}</h4>
                <p className="result-author">{book.authors.join(', ')}</p>
                {book.publishedDate && (
                  <p className="result-year">Published: {book.publishedDate.substring(0, 4)}</p>
                )}
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleAddBook(book)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
