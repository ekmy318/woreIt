import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Layout from '../Layout/Layout'
import './Posts.css'

class PostsAll extends Component {
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
      const ownedPosts = res.data.posts.filter(post => (post.owner.token === this.props.user.token))
      this.setState({ posts: ownedPosts })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }
  render () {
    const { posts } = this.state
    let postsJsx = ' '

    if (posts.length > 0) {
      postsJsx = (
        posts.map(post => (
          <ListGroup.Item key={post._id}>
            <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <p>Notes: {post.notes}</p>
          </ListGroup.Item>
        ))
      )
    } else {
      postsJsx = (
        <h3>No outfits logged.</h3>
      )
    }
    return (
      <Layout md='4' lg='6' className="postsAll">
        {postsJsx}
      </Layout>
    )
  }
}

export default withRouter(PostsAll)
