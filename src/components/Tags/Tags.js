import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input'
import './Tags.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Tags extends Component {
  constructor () {
    super()

    this.state = {
      tags: []
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
  }

  handleDelete (i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAddition (tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  handleDrag (tag, currPos, newPos) {
    const tags = [...this.state.tags]
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    this.setState({ tags: newTags })
  }

  handleTagClick (index) {
    console.log('The tag at index ' + index + ' was clicked')
  }

  render () {
    const { post, handleChange, tags, handleSubmit } = this.state
    return (
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
          <ReactTags
            type="text"
            value={tags}
            name="tags"
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            handleTagClick={this.handleTagClick}
            onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withRouter(Tags)
