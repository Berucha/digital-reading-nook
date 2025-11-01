const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes';

const ensureHttps = (url) => {
  if (!url) return '';
  try {
    return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
  } catch {
    return url;
  }
};

const extractZoom = (url) => {
  if (!url) return 0;
  const m = url.match(/[?&]zoom=(\d+)/);
  return m ? Number(m[1]) : 0;
};

const bumpZoom = (url, target = 2) => {
  if (!url) return url;
  if (/[?&]zoom=\d+/.test(url)) {
    return url.replace(/([?&]zoom=)\d+/, `$1${target}`);
  }
  // if no zoom param, attempt to append one
  return url.includes('?') ? `${url}&zoom=${target}` : `${url}?zoom=${target}`;
};

const pickThumbnail = (imageLinks = {}) => {
  // Collect available links with an estimated zoom priority
  const candidates = [];
  for (const key of ['extraLarge', 'large', 'medium', 'thumbnail', 'small', 'smallThumbnail']) {
    if (imageLinks[key]) {
      const url = imageLinks[key];
      candidates.push({ key, url, zoom: extractZoom(url) });
    }
  }

  if (candidates.length === 0) return '';

  // Prefer the candidate with the highest zoom value; if equal, prefer larger keys earlier in the list
  candidates.sort((a, b) => {
    if (b.zoom !== a.zoom) return b.zoom - a.zoom;
    const rank = { extraLarge: 6, large: 5, medium: 4, thumbnail: 3, small: 2, smallThumbnail: 1 };
    return rank[b.key] - rank[a.key];
  });

  let chosen = candidates[0].url;

  // If the chosen image has a low zoom, try to request a higher zoom (many Google Books URLs accept zoom=2 or 5)
  const chosenZoom = extractZoom(chosen);
  if (chosenZoom > 0 && chosenZoom < 3) {
    // bump to a modest higher value for better clarity
    chosen = bumpZoom(chosen, 2);
  }

  return ensureHttps(chosen);
};

export const searchBooks = async (query, maxResults = 12) => {
  if (!query) return [];

  const trimmed = query.trim();
  // Detect ISBN-10 or ISBN-13 (digits with optional dashes, or ending with X for ISBN-10)
  const normalized = trimmed.replace(/[-\s]/g, '');
  const isIsbn13 = /^\d{13}$/.test(normalized);
  const isIsbn10 = /^\d{9}[\dXx]$/.test(normalized);
  const q = (isIsbn13 || isIsbn10) ? `isbn:${normalized}` : trimmed;

  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_BASE}?q=${encodeURIComponent(q)}&maxResults=${maxResults}&printType=books`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map(item => {
      const info = item.volumeInfo || {};
      return {
        id: item.id,
        title: info.title || 'Unknown Title',
        authors: info.authors || ['Unknown Author'],
        description: info.description || 'No description available',
        thumbnail: pickThumbnail(info.imageLinks),
        publishedDate: info.publishedDate || '',
        pageCount: info.pageCount || 0,
        categories: info.categories || [],
        averageRating: info.averageRating || 0,
        isbn: info.industryIdentifiers?.[0]?.identifier || ''
      };
    });
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
    const info = item.volumeInfo || {};

    return {
      id: item.id,
      title: info.title || 'Unknown Title',
      authors: info.authors || ['Unknown Author'],
      description: info.description || 'No description available',
      thumbnail: pickThumbnail(info.imageLinks),
      publishedDate: info.publishedDate || '',
      pageCount: info.pageCount || 0,
      categories: info.categories || [],
      averageRating: info.averageRating || 0,
      isbn: info.industryIdentifiers?.[0]?.identifier || ''
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
