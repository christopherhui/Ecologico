//eslint-disable-next-line
const globalAny: any = global

import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

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

const NotAuthenticated = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)

  React.useEffect(() => {
    if (user) {
      globalAny.setNotification('success', 'Welcome Back!')
      router.push('/')
    }
  }, [user])

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

  return (
    <>
      {React.Children.map(children, (child) => {
        return child
      })}
    </>
  )
}

export default NotAuthenticated
