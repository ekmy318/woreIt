import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import apiUrl from '../../apiConfig'
import Layout from '../Layout/Layout'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      deleted: false
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
      this.setState({ post: res.data.post })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }

  delete = async () => {
    const { alert, match, user } = this.props
    try {
      await axios({
        method: 'DELETE',
        url: `${apiUrl}/posts/${match.params.id}`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
      this.setState({ deleted: true })
      alert({
        heading: 'Post deleted!',
        variant: 'success'
      })
    } catch (error) {
      alert({
        heading: 'Something went wrong..',
        variant: 'danger'
      })
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
          <Button variant="dark" className="mb-3 ml-1" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
          <Card style={{ width: '34rem', backgroundColor: 'rgba(184, 179, 165, .65)' }}>
            <Card.Img variant="top" src={post.file} />
            <Card.Body>
              <Card.Title><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="listGroupItem">Notes: {post.notes || 'No notes provided'}</ListGroupItem>
              <ListGroupItem className="listGroupItem"><div>Tags: {post.tags.map(tag => <div className="tags" style={{ padding: '0.5rem', border: '1px solid #ccc', marginRight: '0.5rem', backgroundColor: '#eee', display: 'inline-block' }} key={tag}>{tag}</div>) }</div></ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="dark" className="mr-2" href={`#posts/${post._id}/edit`}>Edit Post</Button>
              <Button variant="outline-danger" onClick={this.delete}>Delete Post</Button>
            </Card.Body>
          </Card>
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
