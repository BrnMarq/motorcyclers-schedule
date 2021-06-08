import React from 'react';
import axios from 'axios'
import apiUrl from '../Admin/Providers/apiUrl'
import {useGetAuthToken} from '../Admin/Providers/TokenAuthProvider'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const Schedule = () => {
    const userToken = useGetAuthToken()
    return (
        <table style={{margin : 'auto'}}>
            <tr>
                <td>
                    <TableItem pk={1} userToken={userToken}/>
                </td>
            </tr>
        </table>
    )
}

class TableItem extends React.Component {
    state = {
        motorcyclers : {},
        selected : false
    }

    componentDidMount() {
        axios.get(apiUrl + `/motorcyclers/${this.props.pk}/get/`)
        .then(response => {
            const motorcyclers = response.data
            this.setState({
                motorcyclers : {
                    id : motorcyclers.id,
                    max_amount : motorcyclers.max_amount,
                    actual_amount : motorcyclers.actual_amount,
                    users : motorcyclers.users,
                }
            })
            if (this.props.userToken) {
                const tokens = JSON.parse(this.state.motorcyclers.users)
                if (tokens && tokens.includes(this.props.userToken)) {
                    this.setState({
                        selected : true
                    })
                }
            }
        })
    }

    addUser() {
        const tokens = JSON.parse(this.state.motorcyclers.users)
        const userToken = this.props.userToken
        return tokens ? [...tokens, userToken] : [userToken]
    }

    removeUser() {
        const tokens = JSON.parse(this.state.motorcyclers.users)
        const userToken = this.props.userToken
        const users = tokens.filter((user) => user !== userToken)
        return users
    }

    updateMotorcyclersAmount(amount) {
        const users = this.state.selected ? this.removeUser() : this.addUser()
        const encodedUsers = JSON.stringify(users)
        axios.patch(apiUrl + `/motorcyclers/1/`, {
            actual_amount : amount,
            users : encodedUsers
        })
        return encodedUsers
    }

    onClick() {
        if (!this.props.userToken) {
            alertify.error('Please login before using the schedule', 2)
            return
        }
        // Check if there's any motorcycler left to select
        if (!this.state.selected && this.state.motorcyclers.actual_amount < 1) {
            alertify.error('No motorcyclers left')
            return
        }

        const motorcyclers = {...this.state.motorcyclers}
        if (this.state.selected) {
            motorcyclers.actual_amount++
        }
        else {
            motorcyclers.actual_amount--
        }
        const users = this.updateMotorcyclersAmount(motorcyclers.actual_amount)
        motorcyclers.users = users
        this.setState({
            motorcyclers : motorcyclers,
            selected : !this.state.selected,
        })
    }

    render() {
        const decideBackgroundColor = () => {
            if (this.state.selected) {
                return colors.selected
            } 
            else if (this.state.motorcyclers.actual_amount <= 0) {
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
            backgroundColor : decideBackgroundColor()
        }
        return (
            <div style={styles} onClick={() => this.onClick()}>
                {this.state.motorcyclers.actual_amount}
            </div>
        )
    }
}

const colors = {
    selected : '#00ff00',
    notSelected : 'blue',
    outOfMotorcyclers : 'red',
}

export default Schedule