import React from 'react'
import Image from 'react-image-webp'
import './Home.css'

const Home = () => (
  <React.Fragment>
    <h1>Don&apos;t be an outfit repeater</h1>
    <Image
      webp={require('./homepage.webp')}
    />
  </React.Fragment>
)

export default Home
