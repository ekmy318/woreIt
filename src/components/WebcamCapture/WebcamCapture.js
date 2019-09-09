import React, { Component } from 'react'
import Webcam from 'react-webcam'
import Button from 'react-bootstrap/Button'
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
        <div className="row" style={{ justifyContent: 'center' }}>
          <div className="mr-1">
            {this.state.cameraOn ? (!this.state.taken && <Button variant="dark" onClick={this.useCamera}>Webcam Off</Button>) : (!this.state.taken && <Button variant="dark" onClick={this.useCamera}>Use Webcam</Button>)}
          </div>
          <div className="ml-1">
            {this.state.cameraOn && <Button variant="dark" className='cameraButton' onClick={this.capture}>Capture</Button>}
          </div>
        </div>
        {this.state.imageData
          ? <div className="row" style={{ justifyContent: 'center', marginBottom: '1rem', marginTop: '.5rem' }}>
            <div className="mr-1">
              <Button variant='dark' onClick={this.onClickRetake}>Retake</Button>
            </div>
            <div className="ml-1">
              <a href={this.state.imageData} download="image"><Button variant='dark' className='cameraButton' onClick={this.onClickSave}>Save</Button></a>
            </div>
          </div>
          : null }
        <div className="row justify-content-center">
          <img style={{ marginBottom: '1.5rem' }} src={this.state.imageData}/>
        </div>
        {this.state.cameraOn && (
          <div className="overlay-container row justify-content-center" style={{ marginBottom: '1.5rem' }}>
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
