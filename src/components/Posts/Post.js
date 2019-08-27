import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      deleted: false
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
      this.setState({ post: res.data.post })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  delete = async () => {
    try {
      await axios.delete({
        method: 'DELETE',
        url: `${apiUrl}/posts/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ deleted: true })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  render () {
    const { post, deleted } = this.state
    let postJsx = ''

    if (deleted) {
      return <Redirect to={
        {
          pathname: '/posts',
          state: {
            msg: 'Post successfully deleted'
          }
        }
      }/>
    } else if (post) {
      postJsx = (
        <Fragment>
          <img src={post.file} />
          <h3>{post.date || 'No date provided'}</h3>
          <p>{post.notes || 'No notes provided'}</p>
          <Button href={`#posts/${post._id}/edit`}>Edit Post</Button>
          <Button onClick={this.delete}>Delete Post</Button>
        </Fragment>
      )
    } else {
      postJsx = (
        'Loading...'
      )
    }

    return (
      <div>
        {postJsx}
      </div>
    )
  }
}

export default withRouter(Post)
