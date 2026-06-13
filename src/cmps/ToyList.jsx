import { ToyPreview } from './ToyPreview'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { removeToy } from '../store/actions/toy.actions'

export function ToyList({ toys }) {
    const loggedinUser = userService.getLoggedinUser()

    function onRemove(toyId) {
        removeToy(toyId)
    }

    return <section className="toy-list">
        <ul className="fluid-grid">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="actions">
                        <Link to={`/toy/${toy._id}`}>
                            <button>Details</button>
                        </Link>
                        {loggedinUser && loggedinUser.isAdmin && <>
                            <Link to={`/toy/edit/${toy._id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => onRemove(toy._id)}>Delete</button>
                        </>}
                    </div>
                </li>
            ))}
        </ul>
    </section>
}