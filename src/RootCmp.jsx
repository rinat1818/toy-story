import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { LoginPage } from './pages/LoginPage'
import { useState } from 'react'
import { userService } from './services/user.service'
import { SignupPage } from './pages/SignupPage'
import { ReviewIndex } from './pages/ReviewIndex'
import { UserDetails } from './pages/UserDetails'

export function App() {
    const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

    return (
        <div>
            <AppHeader loggedinUser={loggedinUser} setLoggedinUser={setLoggedinUser} />
            <main>
                <Routes>
                    <Route path="/signup" element={<SignupPage setLoggedinUser={setLoggedinUser} />} />
                    <Route path="/review" element={<ReviewIndex />} />
                    <Route path="/user" element={<UserDetails />} />
                    <Route path="/" element={<ToyIndex />} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/edit" element={<ToyEdit />} />
                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/about" element={<div>About</div>} />
                    <Route path="/login" element={<LoginPage setLoggedinUser={setLoggedinUser} />} />
                </Routes>
            </main>
        </div>
    )
}