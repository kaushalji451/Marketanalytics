import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
