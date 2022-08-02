import { clearUserData, getUserData, setUserData } from "../util.js"

let hostname = 'http://localhost:3030'

async function reqest(url, options) {
    try {
        let response = await fetch(hostname + url, options)
        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }
        if (response.status == 204) {
            return response
        } else {
            return response.json()
        }
    } catch (err) {
        alert(err.message)
        throw err
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    let userDate = getUserData()
    if (userDate) {
        options.headers['X-Authorization'] = userDate.token
    }
    return options
}

export async function get(url) {
    return reqest(url, createOptions())
}

export async function post(url, data) {
    return reqest(url, createOptions('post', data))
}
export async function put(url, data) {
    return reqest(url, createOptions('put', data))
}
export async function del(url) {
    return reqest(url, createOptions('delete'))
}

export async function register(email, password) {
    let result = await post('/users/register', { email, password })

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result
}
export async function login(email, password) {
    let result = await post('/users/login', { email, password })

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result
}
export async function logoutB(email, password) {
    get('/users/logout')
    clearUserData()

}























