import { useState, useEffect } from 'react'
import { reviewService } from '../services/review.service'
import { userService } from '../services/user.service'
import { Link } from 'react-router-dom'

export function ReviewIndex() {
    const [reviews, setReviews] = useState([])
    const [filterTxt, setFilterTxt] = useState('')
    const loggedinUser = userService.getLoggedinUser()

    useEffect(() => {
        reviewService.query().then(setReviews)
    }, [])

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
           setReviews(prev => prev.filter(r => r._id?.toString() !== reviewId?.toString()))
        } catch (err) {
            console.error('Failed to remove review', err)
        }
    }

    const filteredReviews = reviews.filter(review =>
        review.txt?.toLowerCase().includes(filterTxt.toLowerCase()) ||
        review.toy?.name?.toLowerCase().includes(filterTxt.toLowerCase()) ||
        review.user?.fullname?.toLowerCase().includes(filterTxt.toLowerCase())
    )

    return (
        <section className="review-index">
            <h2>All Reviews</h2>
            <input
                type="text"
                placeholder="Filter reviews..."
                value={filterTxt}
                onChange={ev => setFilterTxt(ev.target.value)}
            />
            <div className="reviews-container">
                {filteredReviews.map(review => (
                    <div key={review._id} className="review-card">
                        <p>{review.txt}</p>
                        <Link to={`/toy/${review.toy?._id}`}>
                            <small>On: {review.toy?.name}</small>
                        </Link>
                        <small>By: {review.user?.fullname}</small>
                        {loggedinUser && (loggedinUser.isAdmin || loggedinUser._id?.toString() === review.user?._id?.toString()) &&
                            <button onClick={() => onRemoveReview(review._id)}>Delete</button>}
                    </div>
                ))}
            </div>
        </section>
    )
}