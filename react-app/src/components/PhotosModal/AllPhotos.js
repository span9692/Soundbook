import { useState } from 'react'
import { Modal } from '../../context/Modal'
import './photosmodal.css'

function AllPhotos({profile_photos}) {
    const [showModal, setShowModal] = useState(false)
    const [indivPhoto, setIndivPhoto] = useState(false)

    return (
        <>
            <div className='photos-modal-container'>
                <div className='f-text'>Photos <span className='photos-counter'>({profile_photos.length})</span></div>
                {profile_photos.length > 0 ?
                <div className='p-container'>
                    {profile_photos.map((photo, index) => (
                        <>
                            <img key={photo.id} onClick={() => {setShowModal(true); setIndivPhoto(index)}} className='all-photos-modal pointer' src={photo.photo}></img>
                            {showModal && indivPhoto === index && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <div className='modal-photo-borders'>
                                        <img onClick={()=>setShowModal(false)} className='indiv-photo-modal' src={photo.photo}></img>
                                    </div>
                                </Modal>
                            )}
                        </>
                    ))}
                </div>
                : <div className='no-photos-in-modal'></div>
                }
            </div>
        </>
    )
}

export default AllPhotos
