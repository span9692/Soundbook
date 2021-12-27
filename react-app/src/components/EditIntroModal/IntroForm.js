import { useState } from 'react'
import { updateInfo } from '../../store/session'
import { useDispatch } from 'react-redux'
import './intro.css'
import { updatePerson } from '../../store/user'

function IntroForm({loggedUser, setShowModal}) {
    const dispatch = useDispatch()

    let cleanBday = loggedUser.birthday.replace(',', "").split(' ')
    let array = cleanBday[1].split('')
    if(array[0] == 0) {
        cleanBday[1] = array[1]
    }

    const userId = loggedUser.id;

    const [education, setEducation] = useState(loggedUser.education)
    const [work, setWork] = useState(loggedUser.work)
    const [location, setLocation] = useState(loggedUser.location)
    const [month, setMonth] = useState(cleanBday[0]);
    const [day, setDay] = useState(cleanBday[1]);
    const [year, setYear] = useState(cleanBday[2]);
    const [gender, setGender] = useState(loggedUser.gender);

    const daysArr = []
    for (let i = 1; i <= 31; i++) {
        daysArr.push(i)
    }

    const yearsArr = [];
    const currentYear = 2022;
    for (let i = currentYear; i >= currentYear - 100; i--) {
        yearsArr.push(i)
    }

    const confirmEdit = async(e) => {
        e.preventDefault();
        dispatch(updateInfo({userId, education, work, location, birthday:`${year}-${month}-${day}`, gender}));
        dispatch(updatePerson({userId, education, work, location, birthday:`${year}-${month}-${day}`, gender}));
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={confirmEdit} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Intro</span>
                <hr style={{marginTop: 1+'rem', marginBottom: 1+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    <label className='edit-field-name'>Education</label>
                    <input
                    type='text'
                    className='signup-field field-size signup-font'
                    name='education'
                    placeholder='Education'
                    onChange={(e) => setEducation(e.target.value)}
                    value={education}
                    ></input>
                </div>
                <div className='email-field'>
                    <label className='edit-field-name'>Work</label>
                    <input
                    type='text'
                    className='signup-field field-size signup-font'
                    name='work'
                    placeholder='Work'
                    onChange={(e) => setWork(e.target.value)}
                    value={work}
                    ></input>
                </div>
                <div className='email-field'>
                    <label className='edit-field-name'>Location</label>
                    <input
                    type='text'
                    className='signup-field field-size signup-font'
                    name='location'
                    placeholder='Location'
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    ></input>
                </div>
                <label className='edit-field-name'>Birthday</label>
                <div className='signup-birthday-field'>
                    <div className='month-field'>
                        <select
                            name='month'
                            className='signup-field birthday-field'
                            onChange={(e) => setMonth(e.target.value)}
                            value = {month}
                            required={true}
                        >
                            <option value='' disabled>Month</option>
                            <option value='Jan'>Jan</option>
                            <option value='Feb'>Feb</option>
                            <option value='Mar'>Mar</option>
                            <option value='Apr'>Apr</option>
                            <option value='May'>May</option>
                            <option value='Jun'>Jun</option>
                            <option value='Jul'>Jul</option>
                            <option value='Aug'>Aug</option>
                            <option value='Sep'>Sep</option>
                            <option value='Oct'>Oct</option>
                            <option value='Nov'>Nov</option>
                            <option value='Dec'>Dec</option>
                        </select>
                    </div>
                    <div className='day-field'>
                        <select
                            name='day'
                            className='signup-field birthday-field'
                            onChange={(e) => setDay(e.target.value)}
                            value = {day}
                            required={true}
                        >
                            <option value='' disabled>Day</option>
                            {daysArr.map(day => (
                            <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div className='year-field'>
                        <select
                            name='year'
                            className='signup-field birthday-field'
                            onChange={(e) => setYear(e.target.value)}
                            value = {year}
                            required={true}
                            >
                            <option value='' disabled>Year</option>
                            {yearsArr.map(year => (
                            <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <label className='edit-field-name'>Gender</label>
                <div className='gender-container'>
                    <div className='signup-field gender-field gender-male'>
                        <label for='male'>Male</label>
                    <div className='radio-buttons'>
                        <input onChange={(e) => setGender(e.target.value)} type='radio' id='male' name='gender' value='Male' checked={gender==='Male'}></input>
                    </div>
                    </div>
                    <div className='signup-field gender-field gender-female'>
                        <label for='female'>Female</label>
                    <div className='radio-buttons'>

                        <input onChange={(e) => setGender(e.target.value)} type='radio' id='female' name='gender' value='Female' checked={gender==='Female'}></input>
                    </div>
                    </div>
                    <div className='signup-field gender-field gender-other'>
                        <label for='other'>Other</label>
                    <div className='radio-buttons'>
                        <input onChange={(e) => setGender(e.target.value)} type='radio' id='other' name='gender' value='Other' checked={gender==='Other'}></input>
                    </div>
                    </div>
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

export default IntroForm
