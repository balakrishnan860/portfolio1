import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ProjectCard from '../components/ProjectCard'
import SkillBar from '../components/SkillBar'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactSchema } from '../utils/validators'
import profilePic from "../assets/profile.png";
import weatherApp from "../assets/weather.jpg";
import groceryApp from "../assets/grocery.jpg";


const demoProjects = [
    {id:1, title:'Weather App', description:'React + API based weather UI', image:weatherApp, live:'#', repo:'#'},
  {id:2, title:'Grocery App', description:'Full-stack grocery app with user auth', image:groceryApp, live:'#', repo:'#'}
  
]

export default function Portfolio(){
  const { user } = useAuth()
  const [status, setStatus] = useState('')

  return (
    <div className="portfolio-page container">
      <section className="intro">
        <div className="intro-left">
            
          <h1>Hello, I'm <span className="name">{user?.username || 'Your Name'}</span></h1>
          <p className="subtitle">Electrical & Electronics student • Frontend & Python developer</p>
          <p className="bio">I build web apps and power-electronics simulations. Check out my projects below.</p>
          <div className="cta-row">
            <a className="btn-primary" href="#projects">See projects</a>
            <a className="btn-outline" href="#contact">Contact me</a>
            <a className="btn-link" href="#resume">Resume</a>
          </div>
        </div>
        <div className="intro-right">
          <div className="avatar"><img src={profilePic} alt="Profile" className='project-image'/></div>
        </div>
      </section>

      <section id="skills" className="skills">
        <h2>Skills</h2>
        <SkillBar name="React" level={80} />
        <SkillBar name="Python" level={75} />
        <SkillBar name="MATLAB/Simulink" level={70} />
        <SkillBar name="CSS / UI" level={70} />
      </section>

      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {demoProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          
        </div>
        <a href="https://weather-kv4w.vercel.app" target="_blank" rel="noopener noreferrer">
  <button className="view-btn">View Project</button>
</a>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>
        <Formik
          initialValues={{name:'', email:'', message:''}}
          validationSchema={contactSchema}
          onSubmit={(values, { resetForm, setSubmitting })=>{
            // Replace with real email endpoint or Netlify Forms later
            setStatus('Message sent (mock). Thank you!')
            setSubmitting(false)
            resetForm()
            setTimeout(()=>setStatus(''), 4000)
          }}
        >
          {({isSubmitting})=>(
            <Form className="contact-form">
              {status && <div className="status">{status}</div>}
              <label>Name <Field name="name" /></label>
              <ErrorMessage name="name" component="div" className="error" />
              <label>Email <Field name="email" type="email" /></label>
              <ErrorMessage name="email" component="div" className="error" />
              <label>Message <Field name="message" as="textarea" /></label>
              <ErrorMessage name="message" component="div" className="error" />
              <button className="btn-primary" type="submit" disabled={isSubmitting}>Send message</button>
            </Form>
          )}
        </Formik>
      </section>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} — Built with ❤️</small>
      </footer>
    </div>
  )
}
