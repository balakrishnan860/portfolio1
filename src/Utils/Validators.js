import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 chars').required('Required')
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid').required('Required'),
  password: Yup.string().required('Required')
})

export const contactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  message: Yup.string().min(10, 'Too short').required('Required')
})
