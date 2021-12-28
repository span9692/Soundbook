import './video.css'

function Video() {
    return (
        <>
            <div className='video-modal-container'>
                <div className='video-inner-container'>
                    <div className='v-text'>Welcome to Soundbook</div>
                    <p className='video-bio-text paragraph'>
                        Hi, I'm Sean, part-time artist/content creator and full-time software engineer. Thanks for visiting my site!
                    </p>
                    <p className='paragraph'>
                        Check out my performance of Yiruma's River Flows In You!
                    </p>
                    <div className='v-container'>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/n2TgyJziLT8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen;"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video
