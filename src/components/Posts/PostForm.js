import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tags from '../Tags/Tags'

const PostForm = ({ post, showFileField, handleChange, handleSubmit, deleteImageButton, tags }) => {
  const cancelpath = post._id ? `#posts/${post._id}` : '#calendar'
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="file" encType="multipart/form-data">
        {post._id ? <img style={{ filter: showFileField ? 'grayscale(100%)' : 'grayscale(0%)' }} src={post.file}/> : <Form.Label>Upload a picture!</Form.Label>}
        {showFileField && <Form.Control name="file" type="file" className="inputfile" required onChange={handleChange} />}
      </Form.Group>
      {post._id && <Button variant="outline-dark" className="mb-3" onClick={deleteImageButton}>{showFileField ? 'Cancel' : 'Update Picture'}</Button>}

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="date" value={post.date} name="date" required onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control type="text" placeholder="notes" value={post.notes} name="notes" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="tags">
        <p>Save a tag with your post!</p>
        <Tags value={tags} name="tags"
        />
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="outline-danger" href={cancelpath} className="ml-2 mb-3">Cancel</Button>
    </Form>
  )
}

export default PostForm
