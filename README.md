# IITK Blog Platform

A full-stack blog platform for IIT Kanpur students, built with React and Node.js.

## Features

- User authentication
- Blog creation and management
- Admin dashboard
- Report system
- Save/unsave blogs
- Voting system
- Search functionality

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: Local Storage (for demo)
- Styling: CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd IITK_BLOG
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Start the backend server:
```bash
node server.js
```

5. Start the frontend development server:
```bash
cd ../frontend
npm start
```

The application will be available at `http://localhost:3000`

## Admin Access

To access the admin dashboard:
1. Open browser console (F12)
2. Run: `localStorage.setItem('isAdmin', 'true')`
3. Refresh the page

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 