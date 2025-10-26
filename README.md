# Digital Reading Nook 📚

A cozy digital bookshelf Progressive Web App where readers can visually track and display their reading journey - perfect for audiobook listeners, library borrowers, and ereader users who want a visual collection.

![Digital Reading Nook](https://github.com/user-attachments/assets/abac01f2-8e55-4cf2-9d76-5cb5b6b70630)

## Features ✨

- **User Authentication** - Simple login/signup system with persistent sessions
- **Book Search** - Search millions of books using Google Books API with cover images
- **Multiple Formats** - Track physical books, ebooks, and audiobooks 📖 📱 🎧
- **Reading Status** - Organize books by Want to Read, Currently Reading, and Read
- **Personal Notes** - Add ratings (1-5 stars) and personal notes for each book
- **Reading Stats** - View your reading statistics at a glance
- **Currently Reading** - Dedicated section for books you're actively reading
- **Cozy Design** - Warm color palette with plant accents for a relaxing experience
- **Mobile-First** - Fully responsive design that works great on all devices
- **Offline Support** - PWA features allow offline access to your bookshelf
- **Persistent Storage** - All your data is saved locally in your browser

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Berucha/digital-reading-nook.git
cd digital-reading-nook
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder. You can preview it with:

```bash
npm run preview
```

## Usage 📖

1. **Sign Up** - Create an account with a username, email, and password
2. **Add Books** - Click the "+ Add Book" button and search for books by title, author, or ISBN
3. **Manage Your Collection** - 
   - Choose the format (physical, ebook, or audiobook)
   - Set the reading status
   - Add a rating (1-5 stars)
   - Write personal notes
4. **Track Your Reading** - View statistics and filter your books by status
5. **Edit or Remove** - Click on any book to expand details and edit or remove it

## Technology Stack 🛠️

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Google Books API** - Book search and metadata
- **PWA (Vite Plugin)** - Progressive Web App capabilities
- **localStorage** - Client-side data persistence

## Project Structure 📁

```
digital-reading-nook/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── BookCard.jsx
│   │   ├── BookSearch.jsx
│   │   ├── CurrentlyReading.jsx
│   │   ├── Header.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Stats.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── BookContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── styles/          # Global styles
│   │   └── global.css
│   ├── utils/           # Utility functions
│   │   └── bookApi.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── index.html
├── package.json
└── vite.config.js       # Vite configuration with PWA setup
```

## Features in Detail 🔍

### Authentication
- Client-side authentication using localStorage
- Secure UUID generation for user IDs
- Protected routes for authenticated users
- Note: This is a demo/personal use app. For production, implement backend authentication.

### Book Management
- Integration with Google Books API for comprehensive book data
- Support for three reading formats with emoji indicators
- Expandable book cards with detailed information
- Inline editing and deletion

### Statistics Dashboard
- Total books in collection
- Books read counter
- Currently reading counter
- Average rating calculation
- Format distribution breakdown

### Design Philosophy
- Warm, earthy color palette (#8B5A3C primary, #FFF8F0 background)
- Cozy library aesthetic with plant decorations
- Smooth animations and transitions
- Custom scrollbar styling
- Mobile-first responsive design

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- Google Books API for providing book data and cover images
- The React and Vite teams for excellent developer tools
- Icons and emojis used throughout the app

---

Built with ❤️ and ☕ for book lovers everywhere
