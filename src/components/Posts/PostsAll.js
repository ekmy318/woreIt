import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import apiUrl from '../../apiConfig'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup'

import Layout from '../Layout/Layout'
import './Posts.css'

class PostsAll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      filteredWord: null
    }
  }

  async componentDidMount () {
    const { alert, user } = this.props
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      const ownedPosts = res.data.posts.filter(post => (post.owner.token === user.token))
      this.setState({ posts: ownedPosts })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ filteredWord: event.target.value })
  }

  handleSubmit = async () => {
    const { alert, user } = this.props
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      const ownedTag = res.data.posts.filter(post => (post.owner.token === user.token)).filter(post => post.tags.includes(this.state.filteredWord.toLowerCase() || this.state.filteredWord.toUpperCase()))
      this.setState({ posts: ownedTag })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  handleClear = async () => {
    const { alert, user } = this.props
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      const ownedTag = res.data.posts.filter(post => (post.owner.token === user.token))
      this.setState({ posts: ownedTag })
    } catch (error) {
      alert({
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
          <ListGroup.Item key={post._id}>
            <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <p>Notes: {post.notes}</p>
            <div>Tags: {post.tags.map(tag => <div style={{ padding: '0.25rem', border: '1px solid #ccc', marginRight: '0.5rem', backgroundColor: '#eee', display: 'inline-block' }} key={tag}>{tag}</div>) }</div>
          </ListGroup.Item>
        )).reverse()
      )
    } else {
      postsJsx = (
        <h3>No outfits logged.</h3>
      )
    }
    return (
      <Layout md='4' lg='6' className="postsAll">
        <Form inline>
          <FormControl type="text" placeholder="Search by tag" className="mr-sm-2" onChange={this.handleChange} />
          <Button variant="outline-dark" onClick={this.handleSubmit} className="mr-2">Search</Button>
          <Button variant="dark" onClick={this.handleClear}>Clear Search</Button>
        </Form>
        {postsJsx}
      </Layout>
    )
  }
}

export default withRouter(PostsAll)
