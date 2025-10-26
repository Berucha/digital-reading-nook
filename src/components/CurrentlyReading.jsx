import { useBooks } from '../context/BookContext';
import './CurrentlyReading.css';

const CurrentlyReading = () => {
  const { getCurrentlyReading } = useBooks();
  const currentBooks = getCurrentlyReading();

  if (currentBooks.length === 0) {
    return null;
  }

  return (
    <div className="currently-reading">
      <h2>📖 Currently Reading</h2>
      <div className="reading-list">
        {currentBooks.map(book => (
          <div key={book.id} className="reading-item">
            <div className="reading-cover">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} />
              ) : (
                <div className="reading-placeholder">📚</div>
              )}
            </div>
            <div className="reading-info">
              <h3>{book.title}</h3>
              <p>{book.authors?.join(', ')}</p>
              <span className="format-badge">{
                book.format === 'audiobook' ? '🎧 Audiobook' :
                book.format === 'ebook' ? '📱 E-book' :
                '📖 Physical'
              }</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyReading;
