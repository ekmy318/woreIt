import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BookForm = ({ book, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Book Title</Form.Label>
      <Form.Control type="text" placeholder="Title" value={book.title} name="title" required onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="author">
      <Form.Label>Book Author</Form.Label>
      <Form.Control type="text" placeholder="Author" value={book.author} name="author" required onChange={handleChange} />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default BookForm
