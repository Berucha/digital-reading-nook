import { searchBooks } from '../src/utils/bookApi.js';

const run = async () => {
  const isbn = '9781547603909';
  console.log('Searching for:', isbn);
  const results = await searchBooks(isbn, 5);
  console.log('Found', results.length, 'results');
  if (results.length > 0) {
    console.log('First result:', results[0]);
  } else {
    console.log('No results returned.');
  }
};

run().catch(err => {
  console.error('Test failed:', err);
});
