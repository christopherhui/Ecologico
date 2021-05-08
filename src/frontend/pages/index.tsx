import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography, Grid, Paper } from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import AuthorizationControls from '../middleware/AuthorizationControls'
import Search from '../components/Search'
import { auth, firestore } from '../middleware/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

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
    padding: theme.spacing(2),
    background: '#E2E2E2',
    borderRadius: theme.spacing(2),
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
    justifyContent: 'center'
  },
  product: {
    padding: theme.spacing(16),
    background: '#E2E2E2',
    borderRadius: theme.spacing(2),
    margin: theme.spacing(4),
    maxWidth: theme.spacing(64)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState<string>()
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const [currentProducts, setCurrentProducts] = useState([
    {
      name: 'Lighting',
      desc: 'Improve your...'
    },
    {
      name: 'Packaging',
      desc: 'Reduce waste in...'
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

  return (
    <>
      <AuthorizationControls>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Search searchText={searchText} setSearchText={(string: string) => setSearchText(string)} />
              <div className={classes.title}>
                <Typography color={'textPrimary'} variant={'h4'}>
                  {`Welcome Back, ${name}!`}
                </Typography>
                <Typography color={'textPrimary'} variant={'h5'} className={classes.desc}>
                  {`Check out these questionnaires for you to fill out and improve your business operations!`}
                </Typography>
              </div>
              <div className={classes.products}>
                {currentProducts.map((product) => (
                  <div className={classes.product}>
                    <Typography color={'textPrimary'} variant={'h4'}>
                      {`${product.name}`}
                    </Typography>
                    <Typography color={'textPrimary'} variant={'h5'}>
                      {`${product.desc}`}
                    </Typography>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </div>
      </AuthorizationControls>
    </>
  )
}

export default Home
