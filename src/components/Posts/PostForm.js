import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tags from '../Tags/Tags'

const PostForm = ({ post, showFileField, handleChange, handleSubmit, deleteImageButton }) => {
  const cancelpath = post._id ? `#posts/${post._id}` : '#calendar'

  console.log(post.file)
  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group controlId="file" encType="multipart/form-data">
        {post._id ? <img style={{ filter: showFileField ? 'grayscale(100%)' : 'grayscale(0%)' }} src={post.file}/> : <Form.Label>Upload a picture!</Form.Label>}
        {showFileField && <Form.Control name="file" type="file" required onChange={handleChange} />}
      </Form.Group>
      {post._id && <Button className="mb-3" onClick={deleteImageButton}>{showFileField ? 'Cancel' : 'Update Picture'}</Button>}

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
      <Button variant="danger" href={cancelpath} className="ml-2"><i className="icofont-arrow-left" /> Cancel</Button>
    </Form>
  )
}

export default PostForm
