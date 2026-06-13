import { httpService } from './http.service'

export const reviewService = {
    query,
    add,
    remove
}

function query(filterBy = {}) {
    return httpService.get('review')
}

function add(review) {
    return httpService.post('review', review)
}

function remove(reviewId) {
    return httpService.delete(`review/${reviewId}`)
}