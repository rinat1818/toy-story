import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function signup(credentials) {
    const user = await httpService.post('auth/signup', credentials)
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.removeItem('loggedinUser')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}