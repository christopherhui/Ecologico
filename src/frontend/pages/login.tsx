import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Input, Button, Link, TextField, InputProps } from '@material-ui/core'
import React, { ReactElement, useEffect, useState, MouseEvent } from 'react'
import { auth } from '../middleware/firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import NotAuthenticated from '../middleware/NotAuthenticated'
// @ts-ignore
import Logo from 'react-svg-loader!../public/static/logo.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(128),
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    background: '#FFFFFF',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '5px',
    minWidth: theme.spacing(52)
  },
  title: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    marginLeft: '10%'
  },
  formInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  margin: {
    marginBottom: theme.spacing(3)
  },
  icon: {
    width: '10em',
    height: '10em',
    borderRadius: '50%',
    background: '#A3A3A3',
    marginBottom: theme.spacing(2)
  },
  input: {
    background: '#C9EBDE',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    borderRadius: theme.spacing(2)
  },
  button: {
    filter: 'drop-shadow(0px 8px 50px rgba(0, 0, 0, 0.14))',
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(90deg, #0BA360 0%, #3CBA92 100%)',
    color: 'white'
  }
}))

const Login: NextPage = (): ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const redirectToSignup = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/signup')
  }

  const inputStyle: Partial<InputProps> = {
    style: {
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#000000',
      marginLeft: '15px',
      marginRight: '15px'
    }
  }

  return (
    <>
      <NotAuthenticated>
        <div className={classes.container}>
          <div className={classes.title}>
            <Logo />
          </div>
          <div className={classes.formInfo}>
            <TextField
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className={classes.input}
              InputProps={inputStyle}
            />
            <TextField
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className={classes.input}
              InputProps={inputStyle}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => signInWithEmailAndPassword(email, password)}
              className={classes.button}
            >
              {'Log In'}
            </Button>
            <Link onClick={redirectToSignup}>{`Don't have an account? Sign up!`}</Link>
          </div>
        </div>
      </NotAuthenticated>
    </>
  )
}

export default Login
