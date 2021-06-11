import React, { useEffect, useState } from 'react';
import axios from 'axios'
import apiUrl from '../Admin/Providers/apiUrl'
import {useGetAuthToken} from '../Admin/Providers/TokenAuthProvider'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
} from '@material-ui/core';
import moment from 'moment'


const Schedule = () => {
    const userToken = useGetAuthToken()
    const numbers = Array.from(Array(24).keys())
    console.log(numbers)
    const hours = moment("8:00", "H:mm")
    const styles = {
        width:'70%',
        margin: 'auto', 
        border : '1px solid rgba(224, 224, 224, 1)',
        marginTop: '3%',
        marginBottom : '3%',
    }
    return (
        <TableContainer component={Paper}>
            <Table style={styles} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Hora</TableCell>
                        <TableCell align="center">Motociclistas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {numbers.map(number => {
                        
                    return (
                        <TableRow>
                            <TableCell align="center">
                                {hours.format("H:mm")} - {hours.add(30, 'm').format("H:mm")}
                            </TableCell>
                            <TableCell align="center">
                                <TableItem pk={number + 1} userToken={userToken} />
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const TableItem = props => {
    const [motorcyclers, setMotorcyclers] = useState({})
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        axios.get(apiUrl + `/motorcyclers/${props.pk}/get/`)
        .then(response => {
            const data = response.data
            setMotorcyclers({
                id : data.id,
                max_amount : data.max_amount,
                actual_amount : data.actual_amount,
                users : data.users,
            })
            if (props.userToken) {
                const tokens = JSON.parse(data.users)
                if (tokens && tokens.includes(props.userToken)) {
                    setSelected(true)
                }
            }
        })
    }, [props.pk, props.userToken])

    const addUser = () => {
        const tokens = JSON.parse(motorcyclers.users)
        const userToken = props.userToken
        return tokens ? [...tokens, userToken] : [userToken]
    }

    const removeUser = () => {
        const tokens = JSON.parse(motorcyclers.users)
        const userToken = props.userToken
        const users = tokens.filter((user) => user !== userToken)
        return users
    }

    const updateMotorcyclersAmount = amount => {
        const users = selected ? removeUser() : addUser()
        const encodedUsers = JSON.stringify(users)
        axios.patch(apiUrl + `/motorcyclers/${props.pk}/`, {
            actual_amount : amount,
            users : encodedUsers
        })
        return encodedUsers
    }

    const onClick = () => {
        if (!props.userToken) {
            alertify.error('Please login before using the schedule', 2)
            return
        }
        // Check if there's any motorcycler left to select
        if (!selected && motorcyclers.actual_amount < 1) {
            alertify.error('No motorcyclers left')
            return
        }

        const newMotorcyclers = {...motorcyclers}
        if (selected) {
            newMotorcyclers.actual_amount++
        }
        else {
            newMotorcyclers.actual_amount--
        }
        const users = updateMotorcyclersAmount(newMotorcyclers.actual_amount)
        newMotorcyclers.users = users
        setMotorcyclers(newMotorcyclers)
        setSelected(!selected)
    }

    const decideBackgroundColor = () => {
        if (selected) {
            return colors.selected
        } 
        else if (motorcyclers.actual_amount <= 0) {
            return colors.outOfMotorcyclers
        } 
        else {
            return colors.notSelected
        }
    }

    const styles = {
        width : '100px',
        height : '100px',
        textAlign : 'center',
        margin : 'auto',
        color : 'white',
        fontWeight : 'bold',
        backgroundColor : decideBackgroundColor(),
    }

    return (
        <Paper elevation={3} style={styles} onClick={() => onClick()}>
            <Grid container justify="center" alignItems="center" style={{width:"100%", height:"100%"}}>
                <Grid item>
                {motorcyclers.actual_amount}
                </Grid>
            </Grid>
        </Paper>
    )
} 

const colors = {
    selected : '#00ff00',
    notSelected : 'blue',
    outOfMotorcyclers : 'red',
}

export default Schedule