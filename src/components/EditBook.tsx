import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookService from '../services/BookService';
import type { BookWithUuid, Status } from '../types/Book';

const EditBook = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [book, setBook] = useState<BookWithUuid | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [uuid]);

  const fetchBook = async () => {
    if (!uuid) {
      setError('Invalid book ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const bookData = await bookService.getBookByUuid(uuid);
      setBook(bookData);
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
      console.error(`Error fetching book with UUID ${uuid}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!book || !uuid) return;
    
    const newStatus = e.target.value;
    
    try {
      setUpdating(true);
      const statusUpdate: Status = { status: newStatus };
      await bookService.updateBookStatus(uuid, statusUpdate);
      
      // Update local state after successful API call
      setBook({ ...book, status: newStatus });
      setError(null);
    } catch (err) {
      setError('Failed to update book status. Please try again.');
      console.error('Error updating book status:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="alert alert-warning" role="alert">
        Book not found
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Edit Book</h1>
      
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-subtitle mb-4 text-muted">By {book.author}</h6>
          
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Reading Status</label>
            <select
              className="form-select"
              id="status"
              value={book.status}
              onChange={handleStatusChange}
              disabled={updating}
            >
              <option value="to-read">To Read</option>
              <option value="reading">Currently Reading</option>
              <option value="read">Finished Reading</option>
            </select>
            
            {updating && (
              <div className="text-muted mt-2">
                <small>Updating status...</small>
              </div>
            )}
          </div>
          
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Back to Book List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
