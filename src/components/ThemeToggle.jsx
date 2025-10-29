import React, { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      />
      <span className="toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </label>
  )
}
