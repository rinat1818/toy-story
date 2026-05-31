// import { Route, Routes } from 'react-router-dom'

// import { Route, Routes } from 'react-router-dom'
// import { ToyIndex } from './pages/ToyIndex'

// export function App() {
//     return (
//         <div>
//             <h1>Mister Toy</h1>
//             <Routes>
//                 <Route path="/toy" element={<ToyIndex />} />
//                 <Route path="/" element={<ToyIndex />} />
//             </Routes>
//         </div>
//     )
// }


import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

export function App() {
    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<ToyIndex />} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/edit" element={<ToyEdit />} />
                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/about" element={<div>About</div>} />
                </Routes>
            </main>
        </div>
    )
}