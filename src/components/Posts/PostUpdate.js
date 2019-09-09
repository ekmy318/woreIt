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

class PostUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        date: '',
        notes: '',
        file: '',
        tags: []
      },
      imageDelete: false,
      showFileField: false,
      prevImage: ''
    }
  }

  async componentDidMount () {
    const { alert, match, user } = this.props
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts/${match.params.id}`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      const dateObj = new Date(res.data.post.date)
      const formattedDate = dateObj.toISOString().substring(0, 10)
      res.data.post.tags = res.data.post.tags.map((tag, i) => {
        return { id: tag, text: tag }
      })
      this.setState({ post: { ...res.data.post, date: formattedDate } })
      this.setState({ prevImage: this.state.post.file })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
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
    this.setState({ post: { ...post, [event.target.name]: event.target.value, file: '' } })
  }

  deleteImageButton = event => {
    this.setState(prevState => {
      return { imageDelete: !prevState.imageDelete, showFileField: !prevState.showFileField }
    })
  }

  handleSubmit = event => {
    const { alert, history, user } = this.props
    const { post } = this.state

    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('tags', JSON.stringify(post.tags))
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${post._id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: formData
    })
      .then(() => history.push(`/posts/${post._id}`))
      .then(() => alert({
        heading: 'Post updated!',
        variant: 'success'
      }))
      .catch(() => alert({
        heading: 'Failed to create a post',
        variant: 'danger'
      }))
  }

  render () {
    const { post, showFileField, prevImage } = this.state
    const cancelpath = post._id ? `#posts/${post._id}` : '#calendar'

    if (!post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div>
        <WebcamCapture />
        <Form className="row" onSubmit={this.handleSubmit}>
          <Form.Group controlId="file" encType="multipart/form-data" className='col'>
            <img style={{ filter: showFileField ? 'grayscale(100%)' : 'grayscale(0%)' }} src={post.file || prevImage}/>
          </Form.Group>

          <div className="col" style={{ marginTop: '3.5rem' }}>
            {showFileField && <Form.Control name="file" type="file" className="inputfile" style={{ borderRadius: '4px 4px 4px 4px' }} required onChange={this.handleChange} />}
            <Button variant={ showFileField ? 'danger' : 'dark' } onClick={this.deleteImageButton}>{showFileField ? 'Cancel' : 'Update Picture'}</Button>
            <Form.Group controlId="date" className="mt-3">
              <Form.Label className='labelPost'>Date</Form.Label>
              <Form.Control className="inputPost" type="date" placeholder="date" value={post.date} name="date" required onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="notes">
              <Form.Label className='labelPost'>Notes</Form.Label>
              <Form.Control className="inputPost" type="text" placeholder="notes" value={post.notes} name="notes" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label className='labelPost'>Press Enter after each tag</Form.Label>
              <ReactTags tags={post.tags} handleAddition={this.handleAddition} handleDelete={this.handleDelete} handleTagClick={this.handleTagClick} allowDragDrop={false}
              />
            </Form.Group>

            <Button className="mb-3" variant="dark" type="submit">
              Submit
            </Button>
            <Button variant="danger" href={cancelpath} className="ml-2 mb-3">Cancel</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default withRouter(PostUpdate)
