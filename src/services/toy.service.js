import { httpService } from './http.service.js'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getLabels,
    getEmptyToy,
    addMsg
}

function query() {
    return httpService.get('toy')
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function addMsg(toyId, txt) {
    return httpService.post(`toy/${toyId}/msg`, { txt })
}

function getLabels() {
    return [...labels]
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true,
    }
}


// import { storageService } from './storage.service.js'

// const STORAGE_KEY = 'toys'

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

// _createToys()

// export const toyService = {
//     query,
//     getById,
//     save,
//     remove,
//     getLabels,
//     getEmptyToy
// }

// function query() {
//     return storageService.query(STORAGE_KEY)
// }

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }

// function remove(toyId) {
//     return storageService.remove(STORAGE_KEY, toyId)
// }

// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

// function getLabels() {
//     return [...labels]
// }

// function getEmptyToy() {
//     return {
//         name: '',
//         price: 0,
//         labels: [],
//         inStock: true,
//     }
// }

// function _createToys() {
//     let toys = JSON.parse(localStorage.getItem(STORAGE_KEY))
//     if (toys && toys.length > 0) return

//     toys = [
//         {
//             _id: 't101',
//             name: 'Talking Doll',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 123,
//             labels: ['Doll', 'Battery Powered', 'Baby'],
//             createdAt: 1631031801011,
//             inStock: true,
//         },
//         {
//             _id: 't102',
//             name: 'Toy Car',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 50,
//             labels: ['On wheels'],
//             createdAt: 1631031801011,
//             inStock: true,
//         },
//         {
//             _id: 't103',
//             name: 'Puzzle 100',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 30,
//             labels: ['Puzzle'],
//             createdAt: 1631031801011,
//             inStock: false,
//         }
//     ]
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
// }