import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Typography, Grid, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import React, { ReactElement, useEffect, useState } from 'react'
import AuthorizationControls from '../middleware/AuthorizationControls'
import { auth, firestore } from '../middleware/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import FeedbackIcon from '@material-ui/icons/Feedback'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Button from '@material-ui/core/Button'
import Carousel from 'react-material-ui-carousel'

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
    padding: theme.spacing(3),
    background: '#FFFFFF',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '9px',
    marginTop: theme.spacing(2)
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
    marginTop: theme.spacing(1),
    color: 'white',
    position: 'absolute',
    bottom: '0.8em',
    left: '0.7em'
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
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    whiteSpace: 'nowrap'
  },
  altbutton: {
    background: '#FFFFFF',
    border: '2px solid #0BA360',
    boxSizing: 'border-box',
    boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.14)',
    borderRadius: '8px',
    color: '#0BA360',
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4)
  },
  item: {
    minHeight: theme.spacing(45),
    borderRadius: '10px',
    marginTop: '1em'
  }
}))

function Item(props: any) {
  const classes = useStyles()

  return (
    <Paper
      className={classes.item}
      style={{ backgroundImage: `url(${props.item.img})`, backgroundPosition: `50% ${props.item.y}` }}
    >
      <Typography color={'textPrimary'} variant={'h2'} className={classes.ques}>
        {props.item.description}
      </Typography>
    </Paper>
  )
}

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
    gilad: false,
    jason: false,
    antoine: false,
    who: false,
    drwho: false
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  const [idx, setIdx] = useState(0)

  const items = [
    {
      name:
        'LED lighting is the most efficient type available on the market. While most competing lighting fixtures cannot surpass 70 lumens per watt, LED bulbs produce 90 to 112 lumens per watt, making them highly efficient and energy-saving! They will save you money and reduce your environmental impact.',
      description: 'Switch to LEDs',
      img: 'https://media.discordapp.net/attachments/839645188154720266/840722733432045648/LEDs.png',
      y: '75%'
    },
    {
      name:
        'Wherever it may be possible, look for ways to increase the amount of natural lighting in your workplace! This may include rearranging desk, cubicle and shelf layouts or undergoing a renovation project. Natural light is shown to improve the mental health and productivity of your workers, along with it being the most environmentally friendly option of all.',
      description: 'Let in more natural light',
      img: 'https://media.discordapp.net/attachments/839645188154720266/840722744882364516/Natural_light.png',
      y: '0%'
    }
  ]

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

  return (
    <>
      <AuthorizationControls>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <IconButton onClick={() => router.push('/')}>
                <ArrowBackIcon style={{ fontSize: 50, color: '#474747' }} />
              </IconButton>
              {
                <Carousel
                  navButtonsAlwaysVisible
                  indicators={false}
                  next={() => {
                    setIdx((idx + items.length + 1) % items.length)
                  }}
                  prev={() => {
                    setIdx((idx + items.length - 1) % items.length)
                  }}
                >
                  {items.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              }
              <div className={classes.title}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <p
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '17px',
                      lineHeight: '27px',
                      marginRight: '4em'
                    }}
                  >
                    {items[idx].name}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => router.push('/')}
                      className={classes.button}
                    >
                      {'Learn More'}
                    </Button>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => router.push('/signup')}
                      className={classes.altbutton}
                    >
                      {'OK'}
                    </Button>
                  </div>
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
