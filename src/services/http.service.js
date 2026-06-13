const BASE_URL = 'http://localhost:3030/api'

export const httpService = {
    get(endpoint) {
        return fetch(`${BASE_URL}/${endpoint}`).then(res => res.json())
    },
   
    put(endpoint, data) {
        return fetch(`${BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(res => res.json())
    },
    post(endpoint, data) {
    return fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    }).then(res => {
        if (res.headers.get('content-type')?.includes('application/json')) {
            return res.json()
        }
        return res.text()
    })
},
   delete(endpoint) {
    return fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => {
        if (res.headers.get('content-type')?.includes('application/json')) {
            return res.json()
        }
        return res.text()
    })
}
}