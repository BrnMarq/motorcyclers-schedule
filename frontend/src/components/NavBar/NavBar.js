import React from 'react'
import { 
    Link,
} from 'react-router-dom'

const styles = {
    backgroundColor : '#114',
    color : 'white',
    margin : 'auto',
    padding : '10px',
    position : 'fix'
}

const NavBar = () => {
    const navItems = [
        {
            title : 'Home',
            to : '/'
        },
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
        <div style={styles}>
            <h1>Motorcyclers Schedule</h1>
            <ul>
                {navItems.map(navItem => (
                    <li>
                        <Link to={navItem.to}>{navItem.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavBar