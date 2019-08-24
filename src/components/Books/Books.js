import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

class Books extends Component {
  constructor () {
    super()
    this.state = {
      books: [],
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/books`)
      this.setState({ books: res.data.books, isLoading: false })
      // setTimeout(() => this.setState({ books: res.data.books, isLoading: false }), 2000)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const booksJsx = this.state.books.map(book => (
      <ListGroup.Item key={book._id}>
        <Link to={`/books/${book._id}`} >{book.title}</Link>
      </ListGroup.Item>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }

    return (
      <ListGroup>
        {this.state.books.length ? booksJsx : <ListGroup.Item>No books found</ListGroup.Item>}
      </ListGroup>
    )
  }
}

export default Books
