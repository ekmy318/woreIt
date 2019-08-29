import React, { Component } from 'react'
import Webcam from 'react-webcam'
import './WebcamCapture.css'

class WebcamCapture extends Component {
  state = {
    imageData: null,
    saveImage: false,
    taken: false,
    cameraOn: false
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  useCamera = () => {
    this.setState((previousState) => {
      return {
        cameraOn: !previousState.cameraOn
      }
    })
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
    this.setState({ imageData: imageSrc, cameraOn: false, taken: true })
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
            <p><img src={this.state.imageData}/></p>
          </div>
          : null }
        {this.state.cameraOn && (
          <Webcam
            audio={false}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        )}
      </div>
    )
  }
}

export default WebcamCapture
