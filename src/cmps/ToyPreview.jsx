export function ToyPreview({ toy }) {
    return (
        <div>
            <h3>{toy.name}</h3>
            <img src={`https://robohash.org/${toy.name}?set=set2`} alt={toy.name} />
            <p>Price: {toy.price}</p>
            <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
        </div>
    )
}