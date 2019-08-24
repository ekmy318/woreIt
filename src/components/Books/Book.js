import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

class Book extends Component {
  state = {
    book: null
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/books/${this.props.match.params.id}`)
      this.setState({ book: res.data.book })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { book } = this.state
    // const buttonsJsx = () => {
    //   if (this.props.user && book) {
    //     if (this.props.user._id === book.owner) {
    //       return (
    //         <Button href={`#book/${book._id}/edit`}>Edit Book</Button>
    //       )
    //     }
    //   }
    // }

    return (
      <div>
        { book && (
          <Fragment>
            <h1>{book.title}</h1>
            <h1>{book.author || 'No author'}</h1>
            {(this.props.user && book) && this.props.user._id === book.owner ? <Button href={`#books/${book._id}/edit`}>Edit Book</Button> : '' }
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Book)
