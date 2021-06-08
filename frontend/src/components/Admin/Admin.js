import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'
import drfProvider, { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework'
import { modifiedAuthProvider as authProvider } from './Providers/TokenAuthProvider'
import apiUrl from './Providers/apiUrl'
import { Redirect } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()

const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthToken)

const AdminApp = () => {
    return (
        <Admin history={history} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="max-amount" list={ListGuesser} />
            <Resource name="motorcyclers" list={ListGuesser} />
        </Admin>
            
    )
}

export default AdminApp