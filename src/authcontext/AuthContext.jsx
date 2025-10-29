import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AuthStateKey = 'portfolio_auth_v1'

const initialState = {
  user: null,   // {id, username, email}
  token: null,  // optional if using real backend
  loading: false,
  error: null
}

function reducer(state, action){
  switch(action.type){
    case 'INIT':
      return {...state, ...action.payload}
    case 'LOGIN_START':
      return {...state, loading: true, error: null}
    case 'LOGIN_SUCCESS':
      return {...state, loading:false, user: action.payload.user, token: action.payload.token}
    case 'LOGIN_ERROR':
      return {...state, loading:false, error: action.payload}
    case 'LOGOUT':
      return {...initialState}
    default:
      return state
  }
}

const AuthContext = createContext()

export function AuthProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    // load from localStorage on mount
    const raw = localStorage.getItem(AuthStateKey)
    if(raw){
      try{
        const saved = JSON.parse(raw)
        dispatch({type:'INIT', payload: saved})
      }catch(e){}
    }
  }, [])

  useEffect(()=>{
    // persist user/token to localStorage
    localStorage.setItem(AuthStateKey, JSON.stringify({
      user: state.user,
      token: state.token
    }))
  }, [state.user, state.token])

  // simple client-side auth using a 'users' list in localStorage
  const signup = ({username, email, password}) => {
    // store hashed password? For demo we keep plaintext (NOT for production)
    const USERS_KEY = 'portfolio_users_v1'
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    if(users.find(u => u.email === email)) {
      throw new Error('Email already registered')
    }
    const newUser = { id: Date.now(), username, email, password }
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    // auto-login
    dispatch({type:'LOGIN_SUCCESS', payload: { user: {id:newUser.id, username, email}, token: null }})
    return newUser
  }

  const login = ({email, password}) => {
    const USERS_KEY = 'portfolio_users_v1'
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if(!user) throw new Error('Invalid credentials')
    dispatch({type:'LOGIN_SUCCESS', payload: { user: {id:user.id, username:user.username, email:user.email}, token: null }})
    return user
  }

  const logout = () => {
    dispatch({type:'LOGOUT'})
    localStorage.removeItem(AuthStateKey)
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      loading: state.loading,
      error: state.error,
      signup,
      login,
      logout,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
