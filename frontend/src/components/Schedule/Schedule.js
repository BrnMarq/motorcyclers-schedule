import React from 'react';

const Schedule = props => {
    return (
        <table style={{margin : 'auto'}}>
            <tr>
                <td>
                    <TableItem />
                </td>
            </tr>
        </table>
    )
}

const TableItem = props => {
    const [motorcyclers, setMotorcyclers] = React.useState(8);
    const styles = {
        width : '100px',
        height : '100px',
        backgroundColor : 'blue',
        textAlign : 'center'
    }
    const onClick = () => {
        if (motorcyclers > 0) {
            setMotorcyclers(motorcyclers - 1)
        }
    }
    return (
        <div style={styles} onClick={() => onClick()}>
            {motorcyclers}
        </div>
    )
}

export default Schedule