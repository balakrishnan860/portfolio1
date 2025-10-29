import React from 'react'
import AppRoutes from './router/AppRoutes'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-container">
        <AppRoutes />
      </main>
    </div>
  )
}
