import React from 'react'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid
} from '@material-ui/core'
import './NavBar.css'
import { 
    isAuthenticated,
    modifiedAuthProvider as authProvider
} from '../Admin/Providers/TokenAuthProvider'

const NavBar = () => {
    const navItems = [
        {
            title : 'Schedule',
            to : '/schedule'
        },
    ]
    const logged = isAuthenticated()
    const onClick = () => {
        authProvider.logout()
        window.location.reload()
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h1">
                            <Link className="text-white" to="/">Motorcyclers Schedule</Link>
                        </Typography>
                    </Grid>
                    <Grid item container alignItems="center" justify="flex-end" xs={6}>
                        {navItems.map(navItem => (
                            <Link to={navItem.to}>
                                <Button>
                                    <Typography variant="p" className="text-white">
                                        {navItem.title}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                        {logged ? (
                            <Button onClick={() => onClick()}>
                                <Typography variant="p" className="text-white">
                                    Logout
                                </Typography>
                            </Button>
                        ) : (
                            <Link to='/login'>
                                <Button>
                                    <Typography variant="p" className="text-white">
                                        Login
                                    </Typography>
                                </Button>
                            </Link>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar