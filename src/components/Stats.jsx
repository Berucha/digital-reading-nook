import { useBooks } from '../context/BookContext';
import './Stats.css';

const Stats = () => {
  const { getStats } = useBooks();
  const stats = getStats();

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-content">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Books</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <div className="stat-number">{stats.read}</div>
          <div className="stat-label">Books Read</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📖</div>
        <div className="stat-content">
          <div className="stat-number">{stats.reading}</div>
          <div className="stat-label">Currently Reading</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-content">
          <div className="stat-number">{stats.avgRating}</div>
          <div className="stat-label">Avg Rating</div>
        </div>
      </div>

      <div className="stat-card format-card">
        <div className="stat-content">
          <div className="format-stats">
            <div className="format-stat">
              <span className="format-icon">📖</span>
              <span>{stats.formatCounts.physical}</span>
            </div>
            <div className="format-stat">
              <span className="format-icon">📱</span>
              <span>{stats.formatCounts.ebook}</span>
            </div>
            <div className="format-stat">
              <span className="format-icon">🎧</span>
              <span>{stats.formatCounts.audiobook}</span>
            </div>
          </div>
          <div className="stat-label">By Format</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
