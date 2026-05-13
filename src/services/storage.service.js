export const storageService = {
    query,
    get,
    post,
    put,
    remove
}

function query(entityType) {
    const entities = JSON.parse(localStorage.getItem(entityType) || '[]')
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) return Promise.reject('Cannot find entity with id: ' + entityId)
        return entity
    })
}

function post(entityType, newEntity) {
    return query(entityType).then(entities => {
        newEntity._id = _makeId()
        newEntity.createdAt = Date.now()
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        entities[idx] = updatedEntity
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    let id = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}