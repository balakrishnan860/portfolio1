import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authcontext/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">MyPortfolio</Link>
      </div>
      <div className="nav-right">
        <ThemeToggle />
        {user ? (
          <>
            <span className="nav-user">Hi, {user.username}</span>
            <button className="btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/signup" className="btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}
