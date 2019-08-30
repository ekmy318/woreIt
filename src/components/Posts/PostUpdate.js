import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostForm from './PostForm'
import Layout from '../Layout/Layout'
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
      res.data.post.tags = res.data.post.tags.map((tag, i) => {
        return { id: tag, text: tag }
      })
      this.setState({ post: { ...res.data.post, date: formattedDate } })
      this.setState({ prevImage: this.state.post.file })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
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
    this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value, file: '' } })
  }

  deleteImageButton = event => {
    this.setState(prevState => {
      return { imageDelete: !prevState.imageDelete, showFileField: !prevState.showFileField }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('tags', JSON.stringify(this.state.post.tags))
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.state.post._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(() => this.props.history.push(`/posts/${this.state.post._id}`))
      .then(() => this.props.alert({
        heading: 'Post updated!',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Failed to create a post',
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
      <Layout md="8" lg="6">
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
      </Layout>
    )
  }
}

export default withRouter(PostUpdate)
