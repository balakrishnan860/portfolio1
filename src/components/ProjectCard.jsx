import React from 'react'

export default function ProjectCard({project}){
  return (
    <article className="project-card">
      <img src={project.image} alt={project.title} className="project-image" />
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Repo</a>}
        </div>
      </div>
    </article>
  )
}
