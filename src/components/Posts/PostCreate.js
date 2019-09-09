import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import PostForm from './PostForm'
import WebcamCapture from '../WebcamCapture/WebcamCapture'
import apiUrl from '../../apiConfig'
import './Tags.css'
import './Posts.css'

class PostCreate extends Component {
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
      showFileField: true
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
        alert({
          heading: 'Looking good!',
          variant: 'success'
        })
      })
      .catch(res => {
        alert({
          heading: 'Something went wrong..',
          variant: 'danger'
        })
      })
  }

  render () {
    const { post, showFileField, imageDelete } = this.state

    if (!post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div className="PostForm row">
        <WebcamCapture />
        <PostForm
          post={post}
          imageDelete={imageDelete}
          showFileField={showFileField}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          allowDragDrop={false}
        />
      </div>
    )
  }
}

export default withRouter(PostCreate)
