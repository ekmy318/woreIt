import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
import Layout from '../Layout/Layout'
import './Tags.css'
import WebcamCapture from '../WebcamCapture/WebcamCapture'

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
    this.setState({
      post: {
        ...this.state.post,
        tags: this.state.post.tags.filter((tag, index) => index !== i)
      }
    })
  }

  handleAddition = tag => {
    this.setState({
      post: {
        ...this.state.post,
        tags: [...this.state.post.tags, tag]
      }
    })
  }

  handleChange = event => {
    this.setState({
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('tags', JSON.stringify(this.state.post.tags))
    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(res => {
        this.props.history.push(`/posts/${res.data.post._id}`)
        this.props.alert({
          heading: 'Looking good!',
          variant: 'success'
        })
      })
      .catch(res => {
        this.props.alert({
          heading: 'Error',
          message: 'Something went wrong..',
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
      <Layout md="8" lg="6">
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
      </Layout>
    )
  }
}

export default withRouter(PostCreate)
