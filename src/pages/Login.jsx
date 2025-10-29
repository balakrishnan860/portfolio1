import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authcontext/AuthContext'
import { loginSchema } from '../utils/Validators.js'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="auth-form card">
        <h2>Welcome back</h2>
        <Formik
          initialValues={{email:'', password:''}}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, setStatus })=>{
            try{
              login(values)
              setSubmitting(false)
              navigate('/portfolio')
            }catch(err){
              setStatus(err.message)
              setSubmitting(false)
            }
          }}
        >
          {({isSubmitting, status})=>(
            <Form>
              {status && <div className="error">{status}</div>}
              <label>Email <Field name="email" type="email" /></label>
              <ErrorMessage name="email" component="div" className="error" />
              <label>Password <Field name="password" type="password" /></label>
              <ErrorMessage name="password" component="div" className="error" />
              <button className="btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging...' : 'Login'}
              </button>
              <p className="muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
