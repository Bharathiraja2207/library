
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './App.css'


export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1' },
    { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2' },
    { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Genre 3' },
  ]);
  return (<div>
    <BrowserRouter>
    <div className="App">
         <header className="header">
          <h1>Library Management</h1>
         <nav>
           <ul>
            <div className='main'>
            <li>
              <Link to="/">Book List</Link>
           </li>
             <li>
               <Link to="/add">Add Book</Link>
            </li>
             <li>
               <Link to="/edit/:id">edit Book</Link>
            </li>
            </div>
          </ul>
        </nav>
      </header>
</div>
<div className="container">
    <Routes>
      <Route exact path="/" element={<BookList books={books} setBooks={setBooks}/>} />
      <Route path="/add" element={<BookForm books={books} setBooks={setBooks}/>} />
      {/* <Route path="/edit/:id" element={<BookForms />} /> */}
      {books.map((book) => (
            <Route exact path={`/edit/${book.id}`} key={book.id} element={<BookForms book={book}  books={books} setBooks={setBooks} />}>
              
            </Route>
          ))}
      <Route path="/details/:id" element={<BookDetails  books={books}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    
    </div>
  );
}

function BookList({books,setBooks}) {
  

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h1>Book List</h1>
      <Link to="/add">Add Book</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td><Link to={`/details/${book.id}`}>{book.title}</Link></td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                <Link to={`/edit/${book.id}`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




function BookForm({books,setBooks}) {
  // const history = useHistory();
  const { id } = useParams();

  const initialValues =  {
        title: '',
        author: '',
        genre: '',
      };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title is required';
    }

    if (!values.author) {
      errors.author = 'Author is required';
    }

    if (!values.genre) {
      errors.genre = 'Genre is required';
    }

    return errors;
  };
  const handleSubmit = (values) => {
    console.log(values);
   
   setBooks([...books, values]);
//   
    // history.push('/');
  };

  return (
    <div>
      <h1> Add Book</h1>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <Field type="text" name="author" />
              <ErrorMessage name="author" component="div" />
            </div>
            <div>
              <label htmlFor="genre">Genre:</label>
              <Field type="text" name="genre" />
              <ErrorMessage name="genre" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}



function BookForms({books,book,setBooks}) {
  // const history = useHistory();
  const { id } = useParams();

  const initialValues = 
    {
        title: book.title,
        author: book.author,
        genre: book.genre,
      }
    

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title is required';
    }

    if (!values.author) {
      errors.author = 'Author is required';
    }

    if (!values.genre) {
      errors.genre = 'Genre is required';
    }

    return errors;
  };
  const updateBook = (books) => {
    console.log(books);
    const index = books.findIndex((b) => b.id === books.id);
    const newBooks = [...books];
    newBooks[index] = books;
    console.log(newBooks);
    setBooks(newBooks);
  };
  

  return (
    <div>
      <h1>Edit Book</h1>
      <Formik initialValues={initialValues} validate={validate} onSubmit={updateBook}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <Field type="text" name="author" />
              <ErrorMessage name="author" component="div" />
            </div>
            <div>
              <label htmlFor="genre">Genre:</label>
              <Field type="text" name="genre" />
              <ErrorMessage name="genre" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function BookDetails({ books }) {
  // const history = useHistory();
  const { id } = useParams();
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <div>Author: {book.author}</div>
      <div>Genre: {book.genre}</div>
      <button onClick={() => (`/edit/${book.id}`)}>Edit</button>
    </div>
  );
}





