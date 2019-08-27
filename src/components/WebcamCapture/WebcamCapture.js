// import React, { Component } from 'react'
// import Webcam from 'react-webcam'
// import PostForm from '../Posts/PostForm'
//
// class WebcamCapture extends Component {
//   state = {
//     imageData: null,
//     saveImage: false
//   }
//
//   setRef = webcam => {
//     this.webcam = webcam
//   }
//
//   capture = () => {
//     const imageSrc = this.webcam.getScreenshot()
//     this.setState({
//       imageData: imageSrc
//     })
//   }
//
//   onClickRetake = e => {
//     e.persist()
//     this.setState({
//       imageData: null
//     })
//   }
//
//   onClickSave = e => {
//     e.persist()
//     this.setState((previousState) => {
//       return {
//         saveImage: !previousState.saveImage
//       }
//     })
//   }
//
//   handleChange = e => {
//     e.persist()
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//
//   handleSaveSubmit = e => {
//     e.preventDefault()
//     const imageObject = {
//       image_name: this.state.image_name
//     }
//     this.props.PostForm(imageObject)
//   }
//
//   render () {
//     const videoConstraints = {
//       width: 1280,
//       height: 720,
//       facingMode: 'user'
//     }
//
//     return (
//       <div>
//         <Webcam
//           audio={false}
//           height={350}
//           ref={this.setRef}
//           screenshotFormat="image/jpeg"
//           width={350}
//           videoConstraints={videoConstraints}
//         />
//         <button onClick={this.capture}>Capture photo</button>
//       </div>
//     )
//   }
// }
//
// export default WebcamCapture
