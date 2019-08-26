import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PostForm = ({ post, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>

    <Form.Group controlId="file" encType="multipart/form-data">
      <Form.Control type="file" value={post.file} name="file" required onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="date">
      <Form.Label>Post Date</Form.Label>
      <Form.Control type="date" placeholder="date" value={post.date} name="date" required onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="notes">
      <Form.Label>Post Notes</Form.Label>
      <Form.Control type="notes" placeholder="notes" value={post.notes} name="notes" onChange={handleChange} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default PostForm
