import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
// import WebcamCapture from '../WebcamCapture/WebcamCapture'

class PostCreate extends Component {
  state = {
    post: {
      date: '',
      notes: '',
      file: '',
      owner: this.props.user
    }
  }

  handleChange = event => {
    this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
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
    return (
      <div>
        <PostForm
          post={this.state.post}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(PostCreate)
