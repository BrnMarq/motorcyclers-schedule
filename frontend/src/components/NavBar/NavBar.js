import React from 'react'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core'
import './NavBar.css'

const NavBar = () => {
    const navItems = [
        {
            title : 'Schedule',
            to : '/schedule'
        },
        {
            title : 'Login',
            to : '/login'
        }
    ]
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4">
                    <Link className="text-white" to="/">Motorcyclers Schedule</Link>
                </Typography>
                    {navItems.map(navItem => (
                        <Link to={navItem.to} className="align-right">
                            <Button>
                                <Typography variant="p" className="text-white">
                                    {navItem.title}
                                </Typography>
                            </Button>
                        </Link>
                    ))}
            </Toolbar>
        </AppBar>
    )
}
export default NavBar