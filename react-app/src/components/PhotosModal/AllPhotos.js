import './photosmodal.css'

function AllPhotos({profile_photos}) {
    return (
        <>
            <div className='photos-modal-container'>
                <div className='f-text'>Photos <span className='photos-counter'>({profile_photos.length})</span></div>
                {profile_photos.length > 0 ?
                <div className='p-container'>
                    {profile_photos.map(photo => (
                        <img key={photo.id} className='all-photos-modal' src={photo.photo}></img>
                    ))}
                </div>
                : <div className='no-photos-in-modal'></div>
                }
            </div>
        </>
    )
}

export default AllPhotos
