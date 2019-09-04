import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import apiUrl from '../../apiConfig'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Layout from '../Layout/Layout'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

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
      this.props.alert({
        heading: 'Something went wrong..',
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
          <Card key={post._id} style={{ width: '34rem' }} className="col">
            <Card.Img variant="top" src={post.file} />
            <Card.Body>
              <Card.Title><Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link></Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{post.notes || 'No notes provided'}</ListGroupItem>
              <ListGroupItem><div>Tags: {post.tags.map(tag => <div style={{ padding: '0.5rem', border: '1px solid #ccc', marginRight: '0.5rem', backgroundColor: '#eee', display: 'inline-block' }} key={tag}>{tag}</div>) }</div></ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="primary" className="mr-2" href={`#posts/${post._id}/edit`}>Edit Post</Button>
              <Button variant="outline-danger" onClick={this.delete}>Delete Post</Button>
            </Card.Body>
          </Card>
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
