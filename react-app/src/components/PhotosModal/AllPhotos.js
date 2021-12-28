import './photosmodal.css'

function AllPhotos({profile_photos}) {
    return (
        <>
            <div className='photos-modal-container'>
                <div className='f-text'>Photos</div>
                <div className='p-container'>
                    {profile_photos.map(photo => (
                            <img className='all-photos-modal' src={photo.photo}></img>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllPhotos
