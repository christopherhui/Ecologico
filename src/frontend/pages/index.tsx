import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
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
    marginTop: theme.spacing(3)
  },
  desc: {
    fontSize: '15px',
    marginTop: theme.spacing(1)
  },
  products: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  product: {
    padding: theme.spacing(15),
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
  }
}))

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState<string>()
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [history, setHistory] = useState(false)
  const [person, setPerson] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [currentProducts, setCurrentProducts] = useState([
    {
      name: 'Lighting',
      desc: 'Improve your...',
      bgk:
        'https://cdn.discordapp.com/attachments/839645188154720266/840717212242280478/max-malax-rHKMXPJgSl4-unsplash.jpg',
      width: '400px',
      height: '288px'
    },
    {
      name: 'Packaging',
      desc: 'Reduce waste in...',
      bgk: 'https://cdn.discordapp.com/attachments/839645188154720266/840716676495704064/Packaging.jpg',
      width: '600px',
      height: '388px'
    },
    {
      name: 'Electricity',
      desc: 'Provide better...',
      bgk:
        'https://cdn.discordapp.com/attachments/839645188154720266/840716731197423636/sigmund-r9PeXDCJyEw-unsplash.jpg',
      width: '500px',
      height: '388px'
    },
    {
      name: 'Architecture',
      desc: 'Improve the use of...',
      bgk: 'https://cdn.discordapp.com/attachments/839645188154720266/840722744882364516/Natural_light.png',
      width: '500px',
      height: '388px'
    }
  ])

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
              <Search searchText={searchText} setSearchText={(string: string) => setSearchText(string)} />
              <div className={classes.title}>
                <Typography color={'textPrimary'} variant={'h4'}>
                  {`Welcome Back, `}
                  <span className={classes.comp}>{`${name}!`}</span>
                </Typography>
                <Typography color={'textPrimary'} variant={'h5'} className={classes.desc}>
                  {`Check out these questionnaires for you to fill out and improve your business operations!`}
                </Typography>
              </div>
              <div className={classes.products}>
                {currentProducts.map((product) => (
                  <div
                    className={classes.product}
                    style={{
                      backgroundImage: `url(${product.bgk})`,
                      backgroundSize: `${product.width} ${product.height}`
                    }}
                  >
                    <Typography color={'textPrimary'} variant={'h5'} className={classes.descr}>
                      {`${product.desc}`}
                    </Typography>
                    <Typography color={'textPrimary'} variant={'h3'} className={classes.names}>
                      {`${product.name}`}
                    </Typography>
                  </div>
                ))}
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
