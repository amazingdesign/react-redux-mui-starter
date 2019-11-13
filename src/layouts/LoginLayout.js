import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  col: {
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
    minHeight: '50vh',
  },
  asideCol: {
  },
  contentCol: {
    padding: '1rem 2rem',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  contentColInner: {
  },
  header: {
    width: '100%',
  },
  footer: {
    width: '100%',
  },
  content: {
    width: '100%',
  },
}))

const LoginLayout = (props) => {
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.root}
      spacing={0}
    >
      <Grid
        className={`${classes.asideCol} ${classes.col}`}
        container
        item
        xs={12}
        md={6}
      >
        {props.aside}
      </Grid>
      <Grid
        className={`${classes.contentCol} ${classes.col}`}
        container
        item
        xs={12}
        md={6}
      >
        <Grid
          className={`${classes.header}`}
          item
        >
          {props.header}
        </Grid>
        <Grid
          className={`${classes.content}`}
          item
        >
          {props.content}
        </Grid>
        <Grid
          className={`${classes.footer}`}
          item
        >
          {props.footer}
        </Grid>
      </Grid>
    </Grid>
  )
}

LoginLayout.propTypes = {
  aside: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  content: PropTypes.node,
}

export default LoginLayout