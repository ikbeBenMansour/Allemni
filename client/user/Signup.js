import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Background from './../assets/signup.png'

const useStyles = makeStyles(theme => ({
  card: {

    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
    backgroundImage: `url(${Background})`,
    border:'1px solid #588ba8'
   
   
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    educator: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleCheck = (event, checked) => {
    setValues({...values, educator: checked})
  }
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      educator: values.educator 
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

    return (<div  >
     
      <Card className={classes.card}>
        <CardContent >
          <Typography variant="h6" className={classes.title}>
          Inscrire
          </Typography>
          <TextField id="name" label="Nom & Prénom" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br/>
          <TextField id="email" type="email" label="E-mail" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Mot de passe" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
         <Typography variant="subtitle1" className={classes.subheading}>
           je suis un enseignant
          </Typography>
          <FormControlLabel
            control={
              <Switch classes={{
                                checked: classes.checked,
                                bar: classes.bar,
                              }}
                      checked={values.educator}
                      onChange={handleCheck}
              />}
            label={values.educator? 'Oui' : 'Non'}
          />
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
         
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="dark" variant="contained" onClick={clickSubmit} className={classes.submit}>S'inscrire</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>Nouveau compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nouveau compte créé avec succès
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="dark" autoFocus="autoFocus" variant="contained">
              Se connecter
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
    )
}