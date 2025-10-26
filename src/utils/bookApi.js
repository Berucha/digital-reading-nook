const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query, maxResults = 20) => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_BASE}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&printType=books`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || '',
      publishedDate: item.volumeInfo.publishedDate || '',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      averageRating: item.volumeInfo.averageRating || 0,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || ''
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_BASE}/${bookId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    
    const item = await response.json();
    
    return {
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || '',
      publishedDate: item.volumeInfo.publishedDate || '',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      averageRating: item.volumeInfo.averageRating || 0,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || ''
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
