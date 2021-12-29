import './photos.css'

function Photos({profile_photos}) {
    return (
        <>
            <div className='photo-box'>
                <span className='photo-text'>Photos <span className='photos-counter'>({profile_photos.length})</span></span>
                {profile_photos.length > 0 ?
                <div className='all-photo-box'>
                    {profile_photos.map(photo => (
                        <img key={photo.id} className='all-photos' src={photo.photo}></img>
                    ))}
                </div>
                : <div className='no-pictures-padding'></div>
                }
            </div>
        </>
    )
}

export default Photos
