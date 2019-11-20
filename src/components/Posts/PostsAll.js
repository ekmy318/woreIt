import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import apiUrl from '../../apiConfig'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'

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

  keyPress = event => {
    if (event.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit = async () => {
    event.preventDefault()
    const { alert, user } = this.props
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      const ownedTag = res.data.posts.filter(post => (post.owner.token === user.token)).filter(post => post.tags.includes(this.state.filteredWord.toLowerCase()))
      this.setState({ posts: ownedTag })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  handleClear = async () => {
    event.preventDefault()
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
      this.setState({ posts: ownedTag, filteredWord: '' })
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
          <ListGroup.Item style={{ backgroundColor: 'rgba(184, 179, 165, .65)', marginBottom: '.25rem', borderRadius: '4px 4px 4px 4px' }} key={post._id}>
            <Link style={{ color: '#4b3802', fontWeight: 'bold' }} to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <hr/>
            <p>Notes: {post.notes}</p>
            <div>Tags: {post.tags.map(tag => <div className="tags" key={tag}>{tag}</div>) }</div>
          </ListGroup.Item>
        )).reverse()
      )
    } else {
      postsJsx = (
        <h3>No outfits logged.</h3>
      )
    }
    return (
      <div className="col-md-4">
        <Form>
          <InputGroup className="mb-4">
            <FormControl type="text" placeholder="Search by tag" onKeyDown={this.keyPress} onChange={this.handleChange} />
            <InputGroup.Append>
              <Button variant="dark" onClick={this.handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" width="17">
                  <path fill="white" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </Button>
              <Button variant="danger" onClick={this.handleClear}>
                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="18" width="16">
                  <path fill="white" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
                </svg>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <div className="postAllPost">{postsJsx}</div>
      </div>
    )
  }
}

export default withRouter(PostsAll)
