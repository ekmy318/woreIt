import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'

class PostUpdate extends Component {
  state = {
    post: null
  }

  async componentDidMount () {
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      console.log(res.data.post)
      this.setState({ post: res.data.post })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.state.post._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!',
          message: 'You updated the post!',
          variant: 'success'
        })
        return <Redirect to={`/posts/${this.state.post._id}`} />
        // this.props.history.push(`/posts/${this.state.post._id}`)
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
    const { post } = this.state

    if (!post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <PostForm
        post={post}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(PostUpdate)
