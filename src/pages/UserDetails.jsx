import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { reviewService } from '../services/review.service'

export function UserDetails() {
    const [reviews, setReviews] = useState([])
    const loggedinUser = userService.getLoggedinUser()

    useEffect(() => {
        reviewService.query().then(allReviews => {
            const userReviews = allReviews.filter(r => r.user?._id === loggedinUser._id)
            setReviews(userReviews)
        })
    }, [])

    if (!loggedinUser) return <p>Please login</p>

    return (
        <section className="user-details">
            <h2>{loggedinUser.fullname}</h2>
            <p>Username: {loggedinUser.username}</p>
            <h3>My Reviews</h3>
            {reviews.length > 0 ?
                <div className="reviews-container">
                    {reviews.map(review => (
                        <div key={review._id} className="review-card">
                            <p>{review.txt}</p>
                            <small>On: {review.toy?.name}</small>
                        </div>
                    ))}
                </div>
                : <p>No reviews yet</p>
            }
        </section>
    )
}