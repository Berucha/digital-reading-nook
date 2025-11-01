import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import BookSearch from '../components/BookSearch';
import CurrentlyReading from '../components/CurrentlyReading';
import Stats from '../components/Stats';
import Header from '../components/Header';
import Bookshelf from '../components/Bookshelf';
import './Home.css';

const Home = () => {
  const { books, loading } = useBooks();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [viewMode, setViewMode] = useState('bookshelf'); // 'grid' or 'bookshelf'

  const getFilteredBooks = () => {
    if (filter === 'all') return books;
    return books.filter(book => book.status === filter);
  };

  const filteredBooks = getFilteredBooks();

  if (loading) {
    return <div className="loading">Loading your bookshelf...</div>;
  }

  return (
    <div className="home">
      <Header />
      
      <div className="container">
        <div className="welcome-section">
          <h1>Welcome to Your Reading Nook, {user?.username}! 📚</h1>
          <p className="welcome-subtitle">Your cozy corner for tracking your reading journey</p>
          <div className="plant-accent">🌿</div>
        </div>

        <Stats />

        <CurrentlyReading />

        <div className="bookshelf-section">
          <div className="section-header">
            <h2>Your Bookshelf</h2>
            <div className="section-actions">
              <div className="view-toggle">
                <button
                  className={`toggle-btn ${viewMode === 'bookshelf' ? 'active' : ''}`}
                  onClick={() => setViewMode('bookshelf')}
                  title="Bookshelf View"
                >
                  📚
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? '✕ Close' : '+ Add Book'}
              </button>
            </div>
          </div>

          {showSearch && (
            <BookSearch onClose={() => setShowSearch(false)} />
          )}

          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Books ({books.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'reading' ? 'active' : ''}`}
              onClick={() => setFilter('reading')}
            >
              Currently Reading
            </button>
            <button 
              className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read
            </button>
            <button 
              className={`filter-tab ${filter === 'want-to-read' ? 'active' : ''}`}
              onClick={() => setFilter('want-to-read')}
            >
              TBR
            </button>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <h3>No books yet</h3>
              <p>Start building your cozy library by adding some books!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowSearch(true)}
              >
                Add Your First Book
              </button>
            </div>
          ) : viewMode === 'bookshelf' ? (
            <Bookshelf books={filteredBooks} />
          ) : (
            <div className="book-grid">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
