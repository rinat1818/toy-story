import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from '../services/toy.service'
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const toyLabels = toyService.getLabels()
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
    }, [])

    function handleChange(ev) {
        const { type, name } = ev.target
        let value = ev.target.value
        if (type === 'select-multiple') value = Array.from(ev.target.selectedOptions, option => option.value)
        if (type === 'number') value = +ev.target.value
        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()
        const inStock = (toyToEdit.inStock === 'true') ? true : false
        const newToy = { ...toyToEdit, inStock }
        saveToy(newToy)
            .then(() => navigate('/toy'))
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <form onSubmit={onSave}>
            <label>
                <span>Name</span>
                <input value={toyToEdit.name} onChange={handleChange} type="text" name="name" />
            </label>
            <label>
                <span>Price</span>
                <input value={toyToEdit.price} onChange={handleChange} type="number" name="price" />
            </label>
            <select multiple onChange={handleChange} name="labels" value={toyToEdit.labels}>
                {toyLabels.map(label => <option key={label}>{label}</option>)}
            </select>
            <select value={toyToEdit.inStock} onChange={handleChange} name="inStock">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <button>Save</button>
        </form>
    )
}