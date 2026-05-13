import { store } from '../store.js'
import { toyService } from '../../services/toy.service.js'

export function loadToys() {
    toyService.query()
        .then(toys => {
            store.dispatch({ type: 'SET_TOYS', toys })
        })
}

export function removeToy(toyId) {
    toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: 'REMOVE_TOY', toyId })
        })
}
export function saveToy(toy) {
    toyService.save(toy)
        .then(savedToy => {
            const type = toy._id ? 'UPDATE_TOY' : 'ADD_TOY'
            store.dispatch({ type, toy: savedToy })
        })
}