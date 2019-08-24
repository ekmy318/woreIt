import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BookForm from './BookForm'

class CreateBook extends Component {
  state = {
    book: {
      title: '',
      author: ''
    }
  }

  handleChange = event => {
    this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } })
  }

  // handleChange = event => {
  //   const updatedField = { [event.target.name]: event.target.value }
  //   const editedBook = Object.assign(this.state.book, updatedField)
  //   this.setState({ book: editedBook })
  // }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/books`,
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
          message: 'You created a book!',
          variant: 'success'
        })
        this.props.history.push(`/books/${res.data.book._id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <BookForm
        book={this.state.book}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateBook)
