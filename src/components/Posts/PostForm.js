import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tags from '../Tags/Tags'

const PostForm = ({ post, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>

    <Form.Group controlId="file" encType="multipart/form-data">
      <Form.Label>Picture</Form.Label>
      <Form.Control type="file" value={post.file} name="file" required onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="date">
      <Form.Label>Date</Form.Label>
      <Form.Control type="date" placeholder="date" value={post.date} name="date" required onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="notes">
      <Form.Label>Notes</Form.Label>
      <Form.Control type="text" placeholder="notes" value={post.notes} name="notes" onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="tags">
      <Form.Label>Tags</Form.Label>
      <Tags type="text" value={post.tags} name="tags" onChange={handleChange} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default PostForm
