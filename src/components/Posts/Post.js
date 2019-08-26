import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

class Post extends Component {
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
      this.setState({ post: res.data.post })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  render () {
    const { post } = this.state
    return (
      <div>
        { post && (
          <Fragment>
            <img src={post.url} />
            <h3>{post.date || 'No date provided'}</h3>
            <p>{post.notes || 'No notes provided'}</p>
            <Button href={`#posts/${post._id}/edit`}>Edit Post</Button>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Post)
