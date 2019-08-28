import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Tags.css'
import { WithContext as ReactTags } from 'react-tag-input'

class Tags extends Component {
  constructor () {
    super()

    this.state = {
      tags: []
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
  }

  handleDelete (i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAddition (tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  handleTagClick (index) {
    console.log('The tag at index ' + index + ' was clicked')
  }

  render () {
    const { tags } = this.state
    return (
      <div>
        <ReactTags
          tags={tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          allowDragDrop={false}
          handleTagClick={this.handleTagClick}
          name={this.name}
        />
      </div>
    )
  }
}

export default withRouter(Tags)
