import { useState } from 'react'
import '../style/noteFormStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useTodoContext } from '../context/useTodoContext'


const NoteForm = () => {
    const {dispatch} = useTodoContext()


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const todos = { title, body }

        const response = await fetch("/api/list", {
            method: 'POST',
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok) {
            alert("posted!")
            setTitle('')
            setBody('')
            setError('')
            dispatch({type: 'CREATE_TODO', payload: json})
        }
        if (!response.ok)
        {
            setError(json.err)
        }
    }

    return (
        <form className="NoteForm" onSubmit={handleSubmit}>
            <h3>New Task ToDo!</h3>
            <div className='NoteTitle'>
            <input
                type="text"
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
            </div>
            <div className='NoteBody'>
            <input
                type="text"
                placeholder='Add Task!'
                onChange={(e) => setBody(e.target.value)}
                value={body}
            />
            </div>
            <button type="submit"><FontAwesomeIcon icon={faPlus} size='2x' /></button> {/* Change this line */}
            {error && <div className='error'>{error}</div>}
        </form>

    )
}

export default NoteForm
