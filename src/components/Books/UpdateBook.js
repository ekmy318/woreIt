import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from './BookForm'

class UpdateBook extends Component {
  state = {
    book: null
  }

  // async componentDidMount () {
  //   try {
  //     const res = await axios(`${apiUrl}/books/${this.props.match.params.id}`)
  //     this.setState({ book: res.data.book })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => this.setState({ book: res.data.book }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      }))
  }

  handleChange = event => {
    this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/books/${this.state.book._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        book: this.state.book
      }
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!',
          message: 'You updated the book!',
          variant: 'success'
        })
        this.props.history.push(`/books/${this.state.book._id}`)
      })
      .catch(console.error)
  }

  render () {
    const { book } = this.state

    if (!book) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <BookForm
        book={book}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdateBook)
