import React, { Component } from 'react'
import Webcam from 'react-webcam'
import './WebcamCapture.css'

class WebcamCapture extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageData: null,
      saveImage: false,
      taken: false,
      cameraOn: false,
      count: null
    }
    this.setCameraRef = React.createRef(null)
  }

  capture = () => {
    setTimeout(() => {
      const imageSrc = this.setCameraRef.current.getScreenshot()
      this.setState({ imageData: imageSrc, cameraOn: false, taken: true, count: null })
    }, 3000)
    this.setState({ count: 3 })
    setTimeout(() => { this.setState({ count: 2 }) }, 1000)
    setTimeout(() => { this.setState({ count: 1 }) }, 2000)
  }

  useCamera = () => {
    this.setState((previousState) => {
      return {
        cameraOn: !previousState.cameraOn
      }
    })
  }

  onClickRetake = e => {
    e.persist()
    this.setState({ imageData: null, cameraOn: true, taken: false })
  }

  onClickSave = e => {
    e.persist()
    this.setState((previousState) => {
      return {
        saveImage: !previousState.saveImage
      }
    })
  }

  handleChange = e => {
    e.persist()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveSubmit = e => {
    e.preventDefault()
    const imageObject = {
      image_name: this.state.image_name
    }
    this.props.PostForm(imageObject)
  }

  render () {
    const videoConstraints = {
      width: 900,
      height: 1500,
      facingMode: 'user'
    }

    return (
      <div className="webcam">
        {this.state.cameraOn ? (!this.state.taken && <button onClick={this.useCamera}>Webcam Off</button>) : (!this.state.taken && <button onClick={this.useCamera}>Use Webcam</button>)}
        {this.state.cameraOn && <button onClick={this.capture}>Capture</button>}
        {this.state.imageData
          ? <div>
            <button onClick={this.onClickRetake}>Retake</button>
            <a href={this.state.imageData} download="image"><button onClick={this.onClickSave}>Save</button></a>
            <img src={this.state.imageData}/>
          </div>
          : null }
        {this.state.cameraOn && (
          <div className="overlay-container">
            <div className="overlay">{this.state.count}</div>
            <Webcam
              audio={false}
              ref={this.setCameraRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
        )}
      </div>
    )
  }
}

export default WebcamCapture
