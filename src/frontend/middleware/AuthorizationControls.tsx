//eslint-disable-next-line
const globalAny: any = global

import React, { ReactElement } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../middleware/firebase'
import { Typography, makeStyles } from '@material-ui/core'
import PaperContainer from '../components/PaperContainer'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(64),
    margin: 'auto'
  }
}))

const AuthorizationControls = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const classes = useStyles()
  const [user, loading, error] = useAuthState(auth)

  if (process.browser && !loading && !user) {
    window.location.replace('/start')
  }

  if (loading) {
    return (
      <div className={classes.container}>
        <PaperContainer
          borderPrimary
          content={
            <Typography color={'textPrimary'} variant={'h4'} style={{ padding: '1.5rem' }}>
              {'Loading. Please wait.'}
            </Typography>
          }
        />
      </div>
    )
  }

  if (user) {
    return <>{children}</>
  }

  return null
}

export default AuthorizationControls
