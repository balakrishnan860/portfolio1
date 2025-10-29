import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signupSchema } from '../utils/validators'

export default function Signup(){
  const { signup } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="auth-form card">
        <h2>Create account</h2>
        <Formik
          initialValues={{username:'', email:'', password:''}}
          validationSchema={signupSchema}
          onSubmit={(values, { setSubmitting, setStatus })=>{
            try{
              signup(values)
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
              <label>Username <Field name="username" /></label>
              <ErrorMessage name="username" component="div" className="error" />
              <label>Email <Field name="email" type="email" /></label>
              <ErrorMessage name="email" component="div" className="error" />
              <label>Password <Field name="password" type="password" /></label>
              <ErrorMessage name="password" component="div" className="error" />
              <button className="btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Sign up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
