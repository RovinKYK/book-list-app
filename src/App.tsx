import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './components/Navbar'
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:uuid" element={<EditBook />} />
          </Routes>
        </main>
        <footer className="bg-light py-3 text-center">
          <div className="container">
            <p className="text-muted mb-0">
              Book List App - Created with React & Choreo
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
