import { tokenAuthProvider } from 'ra-data-django-rest-framework'
import apiUrl from './apiUrl'

const authProvider = tokenAuthProvider({obtainAuthTokenUrl : apiUrl + '/api-token-auth/'})

export const modifiedAuthProvider = {
    ...authProvider,
    login : async ({ username, password }) => {
        const request = new Request(apiUrl + '/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('token', data.token);
            localStorage.setItem('is_staff', data.is_staff);
            return;
        }
        if (response.headers.get('content-type') !== 'application/json') {
            throw new Error(response.statusText);
        }
        const json = await response.json();
        const error = json.non_field_errors;
        throw new Error(error || response.statusText);
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_staff');
        return Promise.resolve();
    },
    checkAuth: () => {
        const token = localStorage.getItem('token')
        const isStaff = localStorage.getItem('is_staff')
        const isStaffValidation = isStaff && isStaff !== "false" ? true : false
        console.log(token)
        console.log(isStaffValidation)
        if (token) {
            if (isStaffValidation) {
                return Promise.resolve()
            }
            window.location.href = "http://localhost:3000"
            return Promise.resolve()
        }
        return Promise.reject()
    }
}

export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'))
}

export const useGetAuthToken = () => {
    return localStorage.getItem('token') ? localStorage.getItem('token') : false
}