import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="header-container">
                <h1>Toy Story</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy/edit">Add Toy</NavLink>
                </nav>
            </section>
        </header>
    )
}