import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import Layout from '../Layout/Layout'

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
      this.props.alert('Error', 'Something went wrong..', 'danger')
    }
  }

  delete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `${apiUrl}/posts/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ deleted: true })
      this.props.alert('Success', 'Post deleted!', 'success')
    } catch (error) {
      this.props.alert('Error', 'Something went wrong..', 'danger')
    }
  }

  render () {
    const { post, deleted } = this.state
    let postJsx = ''

    if (deleted) {
      return <Redirect to={{ pathname: '/calendar' }}/>
    } else if (post) {
      postJsx = (
        <div>
          <img src={post.file} />
          <h3><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></h3>
          <p>{post.notes || 'No notes provided'}</p>
          <p>{post.tags || 'No tags provided'}</p>
          {console.log('tags are:', post.tags)}
          <Button className="mt-2 mr-5" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
          <Button className="mt-2 mr-2" href={`#posts/${post._id}/edit`}>Edit Post</Button>
          <Button className="mt-2" onClick={this.delete}>Delete Post</Button>
        </div>
      )
    }

    return (
      <Layout md='8' lg='6'>
        {postJsx}
      </Layout>
    )
  }
}

export default withRouter(Post)
