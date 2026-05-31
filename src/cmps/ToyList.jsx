import { ToyPreview } from './ToyPreview'
import { Link } from 'react-router-dom'



export function ToyList({ toys }) {
    return <section className="toy-list">
        <ul className="fluid-grid">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div className="actions">
                        <Link to={`/toy/${toy._id}`}>
                            <button>Details</button>
                        </Link>
                          <Link to={`/toy/edit/${toy._id}`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    </section >
}