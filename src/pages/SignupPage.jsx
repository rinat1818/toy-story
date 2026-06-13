import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'

export function SignupPage({ setLoggedinUser }) {
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

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            const user = await userService.signup(credentials)
            setLoggedinUser(user)
            navigate('/toy')
        } catch (err) {
            console.error('Failed to signup', err)
        }
    }

    return (
        <section className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={onSignup}>
                <label>
                    <span>Full Name</span>
                    <input type="text" name="fullname" value={credentials.fullname} onChange={handleChange} />
                </label>
                <label>
                    <span>Username</span>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </label>
                <label>
                    <span>Secret Admin Code (optional)</span>
                    <input type="password" name="secretCode" value={credentials.secretCode} onChange={handleChange} />
                </label>
                <button>Sign Up</button>
            </form>
        </section>
    )
}