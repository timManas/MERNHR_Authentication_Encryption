import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
