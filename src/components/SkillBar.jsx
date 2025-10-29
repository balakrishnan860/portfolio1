import React from 'react'

export default function SkillBar({name, level}){
  const width = Math.min(100, Math.max(0, level))
  return (
    <div className="skill">
      <div className="skill-label">{name} <span className="skill-percent">{width}%</span></div>
      <div className="skill-bar"><div className="skill-fill" style={{width:`${width}%`}}/></div>
    </div>
  )
}
