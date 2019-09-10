import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import WebcamCapture from '../WebcamCapture/WebcamCapture'
import { WithContext as ReactTags } from 'react-tag-input'

import apiUrl from '../../apiConfig'
import './Posts.css'
import './Tags.css'

class PostCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        date: '',
        notes: '',
        file: '',
        tags: []
      }
    }
  }

  handleDelete = i => {
    const { post } = this.state
    this.setState({
      post: {
        ...post,
        tags: post.tags.filter((tag, index) => index !== i)
      }
    })
  }

  handleAddition = tag => {
    const { post } = this.state
    this.setState({
      post: {
        ...post,
        tags: [...post.tags, tag]
      }
    })
  }

  handleChange = event => {
    const { post } = this.state
    this.setState({
      post: {
        ...post,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    const { post } = this.state
    const { alert, history, user } = this.props

    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('tags', JSON.stringify(post.tags))
    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: formData
    })
      .then(res => {
        history.push(`/posts/${res.data.post._id}`)
        // alert({
        //   heading: 'Looking good!',
        //   variant: 'success'
        // })
      })
      .catch(res => {
        alert({
          heading: 'Something went wrong..',
          variant: 'danger'
        })
      })
  }

  render () {
    const { post } = this.state

    if (!post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div className="row">
        <WebcamCapture />
        <Form className="postForm" onSubmit={this.handleSubmit}>
          <Form.Group controlId="file" encType="multipart/form-data">
            <Form.Control name="file" type="file" className="inputfile" required onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label className='labelPost'>Date</Form.Label>
            <Form.Control className='inputPost' type="date" placeholder="date" value={post.date} name="date" required onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="notes">
            <Form.Label className='labelPost'>Notes</Form.Label>
            <Form.Control className='inputPost' type="text" placeholder="notes" value={post.notes} name="notes" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="tags">
            <Form.Label className='labelPost'>Press Enter after each tag</Form.Label>
            <ReactTags tags={post.tags} handleAddition={this.handleAddition} handleDelete={this.handleDelete} handleTagClick={this.handleTagClick} allowDragDrop={false}
            />
          </Form.Group>

          <Button className="mb-3" variant="dark" type="submit">
            Submit
          </Button>
          <Button variant="danger" href={post._id ? `#posts/${post._id}` : '#calendar'} className="ml-2 mb-3">Cancel</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(PostCreate)
