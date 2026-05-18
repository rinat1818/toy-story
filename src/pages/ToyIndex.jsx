// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { loadToys } from '../store/actions/toy.actions'

// export function ToyIndex() {
//     const toys = useSelector(state => state.toyModule.toys)

//     useEffect(() => {
//         loadToys()
//     }, [])

//     return (
//         <div>
//             <h2>Toy List</h2>
//             {!toys.length && <p>Loading...</p>}
//             <ul>
//                 {toys.map(toy => (

//                     <li key={toy._id}>
//                         <h3>{toy.name}</h3>
//                           <img src={`https://robohash.org/${toy.name}?set=set2`} alt="" />

//                         <p>Price: {toy.price}</p>
//                         <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'
import { ToyList } from '../cmps/ToyList'

export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    if (!toys.length) return <p>Loading...</p>

    return (
        <div>
            <h2>Toy List</h2>
            <ToyList toys={toys} />
        </div>
    )
}