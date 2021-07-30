import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Library from '@material-ui/icons/LocalLibrary'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import img from './../assets/allemni.png'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#44c9aa'}
  else
    return {color: '#616161'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#44c9aa', backgroundColor: '#fff',border:'1px solid #44c9aa', marginRight:10}
  else
    return {color: '#616161', backgroundColor: '#fff', marginRight:10}
}
const Menu = withRouter(({history}) => (
  <AppBar position="fixed" style={{zIndex:12343455}}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
      <img src={img} width="120" height="60" />
      </Typography>
      <Typography variant="h6" color="inherit">
      &nbsp; &nbsp; &nbsp; &nbsp;
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Inscription
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>se connecter
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(history, "/teach/")}><Library/> Prof</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Mon profil</Button>
          </Link>
          <Button color="fffde7" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Déconnexion            </Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
