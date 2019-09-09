import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
import './Posts.css'
import WebcamCapture from '../WebcamCapture/WebcamCapture'

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
          prevImage={prevImage}
          showFileField={showFileField}
          deleteImageButton={this.deleteImageButton}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleTagClick={this.handleTagClick}
          allowDragDrop={false}
        />
      </div>
    )
  }
}

export default withRouter(PostUpdate)
