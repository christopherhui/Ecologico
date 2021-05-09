import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Typography, Grid, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import React, { ReactElement, useEffect, useState } from 'react'
import AuthorizationControls from '../middleware/AuthorizationControls'
import Search from '../components/Search'
import { auth, firestore } from '../middleware/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import FeedbackIcon from '@material-ui/icons/Feedback'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

// @ts-ignore
import Chat from 'react-svg-loader!../public/static/chat.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(164),
    margin: 'auto',
    marginTop: theme.spacing(4)
  },
  padding: {
    padding: theme.spacing(2)
  },
  title: {
    padding: theme.spacing(4),
    background: '#FFFFFF',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '9px',
    marginTop: theme.spacing(3),
    maxHeight: '550px',
    overflowY: 'scroll'
  },
  desc: {
    marginTop: theme.spacing(0.5),
    fontWeight: 'bold',
    marginBottom: theme.spacing(4.5)
  },
  products: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  product: {
    padding: theme.spacing(24),
    paddingRight: theme.spacing(35),
    margin: theme.spacing(2),
    marginLeft: '0px',
    marginRight: '0px',
    maxWidth: theme.spacing(55),
    minWidth: '410px',
    filter: 'drop-shadow(0px 8px 40px rgba(105, 105, 105, 0.14))',
    borderRadius: '15px',
    minHeight: theme.spacing(40)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  comp: { color: '#0BA360' },
  names: { color: 'white', position: 'absolute', left: '0.65em', bottom: '0.5em', fontWeight: 'bold' },
  descr: { color: 'white', position: 'absolute', left: '1.4em', bottom: '3.4em' },
  icons: { marginTop: '16px' },
  signout: { color: '#717171' },
  dropname: { textAlign: 'center', textTransform: 'uppercase' },
  oneBackground: {
    background: 'linear-gradient(215.45deg, rgba(141, 231, 108, 0.125) 9.1%, rgba(227, 255, 214, 0.125) 39.7%)',
    boxShadow: '0px 4px 50px rgba(199, 240, 184, 0.3)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0px',
    zIndex: -1
  },
  anotherBackground: {
    background: 'linear-gradient(204.38deg, rgba(244, 255, 239, 0.25) 45.96%, rgba(164, 240, 136, 0.25) 79.24%)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    bottom: '0px',
    zIndex: -1
  },
  chat: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  ques: {
    fontSize: '20px',
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(3)
  },
  total: {
    marginTop: theme.spacing(2),
    width: '50%',
    marginBottom: theme.spacing(2)
  },
  button: {
    filter: 'drop-shadow(0px 8px 50px rgba(0, 0, 0, 0.14))',
    background: 'linear-gradient(90deg, #0BA360 0%, #3CBA92 100%)',
    color: 'white',
    marginBottom: '2em',
    marginTop: '2em',
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(6)
  }
}))

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [person, setPerson] = useState(false)
  const [history, setHistory] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [state, setState] = React.useState({
    led: false,
    halogen: false,
    fl: false,
    incan: false,
    solar: false
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const { led, halogen, fl, incan, solar } = state

  useEffect(() => {
    if (!loading && user) {
      console.log(user.uid)
      const docRef = firestore.collection('companies').where('uid', '==', user.uid)
      docRef.get().then((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          const info = doc.data()
          setName(info?.name)
          setUsername(info?.username)
        })
      })
    }
  }, [user])

  const setHistoryDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setHistory(true)
    setPerson(false)
  }

  const setPersonDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setPerson(true)
    setHistory(false)
  }

  const signOut = (event: React.MouseEvent<HTMLElement>) => {
    auth.signOut()
  }

  const handleSubmit = () => {
    const API_URL = 'https://sustainable-products-api.herokuapp.com/lighting'

    fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ led: led, email: user.email })
    })

    router.push('/result')
  }

  return (
    <>
      <AuthorizationControls>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <IconButton onClick={() => router.push('/')}>
                <ArrowBackIcon style={{ fontSize: 50, color: '#474747' }} />
              </IconButton>
              <div className={classes.title}>
                <Typography color={'textPrimary'} variant={'h4'}>
                  {`Improve your...`}
                </Typography>
                <Typography color={'textPrimary'} variant={'h3'} className={classes.desc}>
                  {`Lighting`}
                </Typography>
                <Typography color={'textPrimary'} variant={'h5'} className={classes.ques}>
                  {`What types of lighting do you currently use in your workplace?`}
                </Typography>
                <FormControl component='fieldset' className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={led} onChange={handleChange} name='led' color='primary' />}
                      label='LED'
                    />
                    <FormControlLabel
                      control={<Checkbox checked={halogen} onChange={handleChange} name='halogen' color='primary' />}
                      label='Halogen'
                    />
                    <FormControlLabel
                      control={<Checkbox checked={fl} onChange={handleChange} name='fl' color='primary' />}
                      label='Fluorescent'
                    />
                    <FormControlLabel
                      control={<Checkbox checked={incan} onChange={handleChange} name='incan' color='primary' />}
                      label='Incandescent'
                    />
                    <FormControlLabel
                      control={<Checkbox checked={solar} onChange={handleChange} name='solar' color='primary' />}
                      label='Outdoor solar'
                    />
                  </FormGroup>
                </FormControl>
                <Typography color={'textPrimary'} variant={'h5'} className={classes.ques}>
                  {`How many lighting fixtures are used in total?`}
                </Typography>
                <Input className={classes.total} />
                <Typography color={'textPrimary'} variant={'h5'} className={classes.ques}>
                  {`What are your annual costs associated with lighting?`}
                </Typography>
                <Input className={classes.total} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant='contained' color='primary' onClick={handleSubmit} className={classes.button}>
                    {'Submit'}
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.icons}>
                <IconButton style={{ marginLeft: '3.5em' }} onClick={setHistoryDropdown}>
                  <HistoryIcon style={{ fontSize: 50, color: '#474747' }} />
                </IconButton>
                <IconButton style={{ marginLeft: '0.5em' }} onClick={setPersonDropdown}>
                  <PersonIcon style={{ fontSize: 50, color: '#474747' }} />
                </IconButton>
                <Menu
                  id='fade-menu'
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  anchorEl={anchorEl}
                  keepMounted
                  open={person}
                  onClose={() => setPerson(false)}
                  TransitionComponent={Fade}
                >
                  <Typography className={classes.dropname} variant={'h5'}>
                    {username}
                  </Typography>
                  <Typography className={classes.dropname} style={{ marginBottom: '0.5em' }}>
                    {name}
                  </Typography>
                  <MenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Account Settings</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <HelpIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Get Help</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <FeedbackIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Provide Feedback</ListItemText>
                  </MenuItem>
                  <div
                    style={{
                      borderTop: '1px solid #C4C4C4',
                      marginLeft: '10%',
                      width: '80%',
                      marginBottom: '0.5em',
                      marginTop: '0.5em'
                    }}
                  />
                  <MenuItem onClick={signOut}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize='small' style={{ color: '#717171' }} />
                    </ListItemIcon>
                    <ListItemText className={classes.signout}>Sign out</ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.oneBackground} />
        <div className={classes.anotherBackground} />
        <div className={classes.chat}>
          <IconButton>
            <Chat />
          </IconButton>
        </div>
      </AuthorizationControls>
    </>
  )
}

export default Home
