// import React from 'react'
import './App.css'
import Profile from './pages/Profile/Profile'
import Auth from './pages/Auth/Auth'
import ProfileSide from './components/profileSide/ProfileSide'
import Home from './pages/home/Home'
// import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className='app'>
      <Home />
      {/* <Profile /> */}
      {/* <Auth /> */}
    </div>
  )
}

export default App