import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, Input, Button, Link } from '@material-ui/core'
import React, { ReactElement, useEffect, useState, MouseEvent } from 'react'
import { auth } from '../middleware/firebase'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import NotAuthenticated from '../middleware/NotAuthenticated'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(128),
    margin: 'auto',
    background: '#D8D8D8',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(10),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    borderRadius: theme.spacing(2),
    minWidth: theme.spacing(52)
  },
  title: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2)
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
  }
}))

const Login: NextPage = (): ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const redirectToSignin = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/login')
  }

  return (
    <>
      <NotAuthenticated>
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.icon} />
          </div>
          <Typography color={'textPrimary'} variant={'h4'} className={classes.title}>
            {'Sign Up'}
          </Typography>
          <div className={classes.formInfo}>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Username'
              className={classes.margin}
            />
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className={classes.margin}
            />
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className={classes.margin}
            />
            <Input
              type='password'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder='Password Confirmation'
              className={classes.margin}
            />
            <Button
              variant='contained'
              color='secondary'
              onClick={() => createUserWithEmailAndPassword(email, password)}
              className={classes.margin}
            >
              {'Sign Up'}
            </Button>
            <Link onClick={redirectToSignin}>{`Don't have an account? Sign up!`}</Link>
          </div>
        </div>
      </NotAuthenticated>
    </>
  )
}

export default Login
