import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { userService } from '../services/user.service'
import { reviewService } from '../services/review.service'

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [msgTxt, setMsgTxt] = useState('')
    const [reviewTxt, setReviewTxt] = useState('')
    const [toy, setToy] = useState(null)
    const [reviews, setReviews] = useState([])
    const loggedinUser = userService.getLoggedinUser()

    useEffect(() => {
        toyService.getById(toyId).then(setToy)
        reviewService.query().then(allReviews => {
            const toyReviews = allReviews.filter(r => r.toy?._id === toyId)
            setReviews(toyReviews)
        })
    }, [toyId])

    async function onAddMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addMsg(toyId, msgTxt)
            setToy(prev => ({ ...prev, msgs: [...(prev.msgs || []), savedMsg] }))
            setMsgTxt('')
        } catch (err) {
            console.error('Failed to add msg', err)
        }
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        try {
            const review = {
                txt: reviewTxt,
                toyId: toyId,
                userId: loggedinUser._id
            }
            const savedReview = await reviewService.add(review)
            const reviewWithUser = {
                ...savedReview,
                user: { _id: loggedinUser._id, fullname: loggedinUser.fullname },
                toy: { _id: toyId, name: toy.name }
            }
            setReviews(prev => [...prev, reviewWithUser])
            setReviewTxt('')
        } catch (err) {
            console.error('Failed to add review', err)
        }
    }

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

            <section className="toy-msgs">
                <h3>Messages</h3>
                {toy.msgs && toy.msgs.length > 0 ?
                    <div className="msgs-container">
                        {toy.msgs.map(msg => (
                            <div key={msg.id} className="msg-card">
                                <strong>{msg.by?.fullname}</strong>
                                <p>{msg.txt}</p>
                            </div>
                        ))}
                    </div>
                    : <p>No messages yet</p>
                }
                {loggedinUser &&
                    <form onSubmit={onAddMsg}>
                        <input
                            type="text"
                            value={msgTxt}
                            onChange={ev => setMsgTxt(ev.target.value)}
                            placeholder="Write a message..."
                        />
                        <button>Send</button>
                    </form>
                }
                {!loggedinUser && <p>Login to add a message</p>}
            </section>

            <section className="toy-reviews">
                <h3>Reviews</h3>
                {reviews.length > 0 ?
                    <div className="reviews-container">
                        {reviews.map(review => (
                            <div key={review._id} className="review-card">
                                <p>{review.txt}</p>
                                <small>By: {review.user?.fullname}</small>
                            </div>
                        ))}
                    </div>
                    : <p>No reviews yet</p>
                }
                {loggedinUser &&
                    <form onSubmit={onAddReview}>
                        <input
                            type="text"
                            value={reviewTxt}
                            onChange={ev => setReviewTxt(ev.target.value)}
                            placeholder="Write a review..."
                        />
                        <button>Add Review</button>
                    </form>
                }
                {!loggedinUser && <p>Login to add a review</p>}
            </section>

            <button onClick={() => navigate('/toy')}>Back</button>
        </section>
    )
}