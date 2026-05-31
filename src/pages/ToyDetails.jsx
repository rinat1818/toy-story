import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { loadToys } from '../store/actions/toy.actions'

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const toy = useSelector(state => 
        state.toyModule.toys.find(t => t._id === toyId)
    )

    useEffect(() => {
        loadToys()
    }, [])

    if (!toy) return <p>Loading...</p>

    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <img src={`https://robohash.org/${toy.name}?set=set2`} alt={toy.name} />
            <p>Price: ${toy.price}</p>
            <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <p>Created: {new Date(toy.createdAt).toLocaleDateString()}</p>
            <ul className="labels">
                {toy.labels.map(label => (
                    <li key={label}>{label}</li>
                ))}
            </ul>
            <button onClick={() => navigate('/toy')}>Back</button>
        </section>
    )
}