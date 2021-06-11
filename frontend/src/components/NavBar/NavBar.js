import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    IconButton,
    Box,
    SwipeableDrawer,
} from '@material-ui/core'
import './NavBar.css'
import { 
    isAuthenticated,
    modifiedAuthProvider as authProvider
} from '../Admin/Providers/TokenAuthProvider'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NavBar = props => {
    const [openBar, setOpenBar] = useState(false)

    const handleBarToggle = () => {
        setOpenBar(!openBar)
    }

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

    const sideBarItems = navItems.map(navItem => (
        <Box 
            borderTop={0.5}
            borderColor="blue" 
            width="100%"
        >
            <Grid item container justify="center" alignItems="center">
                <Link to={navItem.to}>
                    <Button>
                        <Typography variant="p">
                            {navItem.title}
                        </Typography>
                    </Button>
                </Link>
            </Grid>
        </Box>
    ))
    return (
        <AppBar position="static">
            <Toolbar>
                {isWidthUp('sm', props.width) ? (
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h4" component="h1">
                                <Link className="text-white" to="/">Motorcyclers Schedule</Link>
                            </Typography>
                        </Grid>
                        <Grid item container alignItems="center" justify="flex-end" xs={4}>
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
                ) : (
                    <Grid container>
                        <Grid item xs={2}>
                            <IconButton onClick={handleBarToggle}>
                                <MenuIcon style={{color:'white'}}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={10} container alignItems='center' justify="flex-end">
                            <Typography variant="subtitle2" component="h1">
                                <Link className="text-white" to="/">Motorcyclers Schedule</Link>
                            </Typography>
                        </Grid>
                        <SideBar 
                            open={openBar} 
                            onOpen={handleBarToggle} 
                            onClose={handleBarToggle} 
                            navItems={sideBarItems}
                            logged={logged}
                            onLogout={onClick}
                        />
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    )
}

const SideBar = props => (
    <SwipeableDrawer open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
        <Grid container >
            <Grid item container xs="6" justify="flex-start">
                <IconButton onClick={props.onClose}>
                    <ArrowBackIcon style={{color : 'blue'}}/>
                </IconButton>
            </Grid>
            {props.navItems}
            <Box 
                border={0.5} 
                borderRight={0} 
                borderLeft={0} 
                borderColor="blue" 
                width="100%"
            >
                <Grid item container justify="center" alignItems="center">
                    {props.logged ? (
                        <Button onClick={props.onLogout}>
                            <Typography variant="p">
                                Logout
                            </Typography>
                        </Button>
                    ) : (
                        <Link to='/login'>
                            <Button>
                                <Typography variant="p">
                                    Login
                                </Typography>
                            </Button>
                        </Link>
                    )}
                </Grid>
            </Box>
        </Grid>
    </SwipeableDrawer>
)
export default withWidth()(NavBar)