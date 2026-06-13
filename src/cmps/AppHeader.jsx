import { NavLink, useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'

export function AppHeader({ loggedinUser, setLoggedinUser }) {
    const navigate = useNavigate()

    async function onLogout() {
        await userService.logout()
        setLoggedinUser(null)
        navigate('/toy')
    }

    return (
        <header className="app-header">
            <section className="header-container">
                <h1>Toy Story</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/review">Reviews</NavLink>
                    {loggedinUser && loggedinUser.isAdmin &&
                        <NavLink to="/toy/edit">Add Toy</NavLink>}
                    {loggedinUser ?
                        <span>
                           <NavLink to="/user">{loggedinUser.fullname}</NavLink>
                            <button onClick={onLogout}>Logout</button>
                        </span> :
                        <NavLink to="/login">Login</NavLink>}
                </nav>
            </section>
        </header>
    )
}