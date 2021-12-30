import { useState } from 'react'
import { Modal } from '../../context/Modal'
import './photos.css'

function Photos({profile_photos}) {
    const [showModal, setShowModal] = useState(false)
    const [indivPhoto, setIndivPhoto] = useState(false)

    return (
        <>
            <div className='photo-box'>
                <span className='photo-text'>Photos <span className='photos-counter'>({profile_photos.length})</span></span>
                {profile_photos.length > 0 ?
                <div className='all-photo-box'>
                    {profile_photos.map((photo, index) => (
                        <>
                            <img key={photo.id} onClick={() => {setShowModal(true); setIndivPhoto(index)}} className='all-photos pointer' src={photo.photo}></img>
                            {showModal && indivPhoto === index && (
                                <Modal onClose={() => setShowModal(false)}>
                                        <img onClick={()=>setShowModal(false)} className='indiv-photo-modal' src={photo.photo}></img>
                                </Modal>
                            )}
                        </>
                    ))}
                </div>
                : <div className='no-pictures-padding'></div>
                }
            </div>
        </>
    )
}

export default Photos
