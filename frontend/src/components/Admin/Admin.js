import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'
import drfProvider, { fetchJsonWithAuthToken, tokenAuthProvider} from 'ra-data-django-rest-framework'

const apiUrl = 'http://127.0.0.1:8000'

const authProvider = tokenAuthProvider({obtainAuthTokenUrl : apiUrl + '/obtain-token-auth'})

const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthToken)

const AdminApp = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="max-amount" list={ListGuesser} />
        <Resource name="motorcyclers" list={ListGuesser} />
    </Admin>
)

export default AdminApp