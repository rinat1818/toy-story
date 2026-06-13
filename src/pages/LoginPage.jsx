import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'

export function LoginPage({ setLoggedinUser }) {
    const [isLogin, setIsLogin] = useState(true)
    const [credentials, setCredentials] = useState({ 
        fullname: '', 
        username: '', 
        password: '',
        secretCode: ''
    })
    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const user = isLogin 
                ? await userService.login(credentials)
                : await userService.signup(credentials)
            setLoggedinUser(user)
            navigate('/toy')
        } catch (err) {
            console.error('Failed', err)
        }
    }

    return (
        <section className="login-page">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={onSubmit}>
                {!isLogin && <label>
                    <span>Full Name</span>
                    <input type="text" name="fullname" value={credentials.fullname} onChange={handleChange} />
                </label>}
                <label>
                    <span>Username</span>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </label>
                {!isLogin && <label>
                    <span>Secret Code (optional)</span>
                    <input type="password" name="secretCode" value={credentials.secretCode} onChange={handleChange} />
                </label>}
                <button>{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'New user? Sign Up' : 'Already have account? Login'}
            </button>
        </section>
    )
}