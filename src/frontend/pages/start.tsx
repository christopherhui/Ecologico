import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, Input, Button, Link, TextField, InputProps } from '@material-ui/core'
import React, { ReactElement, useEffect, useState, MouseEvent } from 'react'
import { auth } from '../middleware/firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import NotAuthenticated from '../middleware/NotAuthenticated'
// import Logo from 'react-svg-loader!../public/static/logo.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(128),
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(8),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    background: '#FFFFFF',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '5px',
    minWidth: theme.spacing(42)
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
    color: 'white',
    paddingRight: theme.spacing(8),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    paddingLeft: theme.spacing(8),
    boxShadow: '0px 8px 50px 0px #00000024'
  },
  altbutton: {
    background: '#FFFFFF',
    border: '2px solid #0BA360',
    boxSizing: 'border-box',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '8px',
    color: '#0BA360',
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1.25),
    paddingTop: theme.spacing(1.25),
    paddingLeft: theme.spacing(4)
  },
  welcome: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(3)
  }
}))

const Login: NextPage = (): ReactElement => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <NotAuthenticated>
        <div className={classes.container}>
          <div className={classes.title}>{/* <Logo /> */}</div>
          <div className={classes.center}>
            <Typography variant='h3' component='h3' className={classes.welcome}>
              {'Welcome to'}
            </Typography>
            <Typography variant='h3' component='h3' className={classes.name}>
              {'ECOLOGICO!'}
            </Typography>
            <Typography variant='h4' component='h4' className={classes.welcome}>
              {'Ready to start making better choices for your enterprise?'}
            </Typography>
          </div>
          <div className={classes.options}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push('/login')}
              className={classes.button}
            >
              {'Log In'}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => router.push('/signup')}
              className={classes.altbutton}
            >
              {'Sign up'}
            </Button>
          </div>
        </div>
      </NotAuthenticated>
    </>
  )
}

export default Login
