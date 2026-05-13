// import { Route, Routes } from 'react-router-dom'

import { Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex'

export function App() {
    return (
        <div>
            <h1>Mister Toy</h1>
            <Routes>
                <Route path="/toy" element={<ToyIndex />} />
                <Route path="/" element={<ToyIndex />} />
            </Routes>
        </div>
    )
}