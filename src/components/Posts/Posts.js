import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Layout from '../Layout/Layout'
import Button from 'react-bootstrap/Button'

class Posts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  async componentDidMount () {
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      const ownedPosts = res.data.posts.filter(post => (post.owner.token === this.props.user.token) && (this.props.location.state.date.substring(0, 10) === post.date.substring(0, 10)))
      this.setState({ posts: ownedPosts })
    } catch (error) {
      this.props.alert('Error', 'Something went wrong..', 'danger')
    }
  }
  render () {
    const { posts } = this.state

    let postsJsx = ' '

    if (posts.length > 0) {
      postsJsx = (
        posts.map(post => (
          <ListGroup.Item key={post._id}>
            <img src={post.file}/>
            <br />
            <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <p>Notes: {post.notes || 'No notes'}</p>
            <p>Tags: {post.tags || 'No tags'}</p>
          </ListGroup.Item>
        ))
      )
    } else {
      postsJsx = (
        <div>
          <h3>No outfit logged for this day.</h3>
        </div>
      )
    }
    return (
      <Layout md='8' lg='6'>
        <Button variant="dark" className="mb-3 ml-1" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
        {postsJsx}
      </Layout>
    )
  }
}

export default withRouter(Posts)
