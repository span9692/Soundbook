import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateName } from '../../store/session'
import { updateNameAlias } from '../../store/user'
import './display.css'

function DisplayForm({loggedUser, setShowModal}) {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(loggedUser.first_name)
    const [lastName, setLastName] = useState(loggedUser.last_name)
    const [alias, setAlias] = useState(loggedUser.alias)
    const userId = loggedUser.id

    const confirmEdit = async(e) => {
        e.preventDefault();
        dispatch(updateName({userId, firstName, lastName, alias}));
        dispatch(updateNameAlias({userId, firstName, lastName, alias}));
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={confirmEdit} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Display</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='signup-name-field2'>
                    <div className='first-last-name-edit'>
                        <label className='edit-field-name'>First Name</label>
                        <div className='first-name-field2'>
                        <input
                            type='text'
                            className='signup-field field-size signup-font'
                            name='firstName'
                            placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required={true}
                        ></input>
                        </div>
                    </div>
                    <div className='first-last-name-edit'>
                        <label className='edit-field-name edit-lastname'>Last Name</label>
                        <div className='last-name-field2'>
                        <input
                            type='text'
                            className='signup-field field-size signup-font'
                            name='lastName'
                            placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required={true}
                        ></input>
                        </div>
                    </div>
                </div>

                <div className='email-field'>
                    <label className='edit-field-name alias-field'>Alias (Optional)</label>
                    <input
                    type='text'
                    className='signup-field field-size signup-font alias-field'
                    name='alias'
                    placeholder='Alias'
                    onChange={(e) => setAlias(e.target.value)}
                    value={alias}
                    ></input>
                </div>
                <div className='save-or-cancel'>
                    <div className='edit-info-btns1'>
                        <button type='submit' className='editBtns1 pointer'>Save</button>
                    </div>
                    <div className='edit-info-btns2'>
                        <button type='button' onClick={()=>setShowModal(false)} className='editBtns2 pointer'>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DisplayForm
