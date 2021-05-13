import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'
import drfProvider from 'ra-data-django-rest-framework'

const dataProvider = drfProvider('http://127.0.0.1:8000')

const AdminApp = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="max-amount" list={ListGuesser} />
        <Resource name="motorcyclers" list={ListGuesser} />
    </Admin>
)

export default AdminApp