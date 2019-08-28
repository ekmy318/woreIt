import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
import Layout from '../Layout/Layout'

// import WebcamCapture from '../WebcamCapture/WebcamCapture'

class PostCreate extends Component {
  state = {
    post: {
      date: '',
      notes: '',
      file: '',
      tags: [],
      owner: this.props.user
    },
    imageDelete: false,
    showFileField: true
  }

  handleChange = event => {
    this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!',
          message: 'You made a post!',
          variant: 'success'
        })
        this.props.history.push(`/posts/${res.data.post._id}`)
      })
      .catch(res => {
        this.props.alert({
          heading: 'Error',
          message: 'Failed to create a post',
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
        <PostForm
          post={post}
          imageDelete={imageDelete}
          showFileField={showFileField}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default withRouter(PostCreate)
