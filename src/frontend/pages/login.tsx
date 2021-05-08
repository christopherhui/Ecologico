import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import AppBarComponent from '../layouts/moduleViewer/AppBarComponent'
import Search from '../components/Search'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(64),
    margin: 'auto'
  },
  padding: {
    padding: theme.spacing(2)
  }
}))

const Login: NextPage = (): ReactElement => {
  const classes = useStyles()

  return (
    <>
      <AppBarComponent title='Project Boilerplate' />
      <Typography color={'textPrimary'} variant={'h4'} className={classes.padding}>
        {'Login'}
      </Typography>
    </>
  )
}

export default Login
