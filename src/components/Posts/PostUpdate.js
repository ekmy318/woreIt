import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
import Layout from '../Layout/Layout'

class PostUpdate extends Component {
  state = {
    post: null,
    imageDelete: false,
    showFileField: false
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
      const dateObj = new Date(res.data.post.date)
      const formattedDate = dateObj.toISOString().substring(0, 10)
      this.setState({ post: { ...res.data.post, date: formattedDate } })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value, file: '' } })
    console.log(event.target.file)
  }

  deleteImageButton = event => {
    this.setState(prevState => {
      return { imageDelete: !prevState.imageDelete, showFileField: !prevState.showFileField }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.state.post._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(() => this.props.history.push(`/posts/${this.state.post._id}`))
      .then(() => this.props.alert('Success!', 'You updated the post!', 'success'))
      .catch(() => this.props.alert('Error', 'Failed to create a post', 'danger'))
  }

  render () {
    const { post, showFileField } = this.state

    if (!post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <Layout md="8" lg="6">
        <PostForm
          post={post}
          showFileField={showFileField}
          deleteImageButton={this.deleteImageButton}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default withRouter(PostUpdate)
