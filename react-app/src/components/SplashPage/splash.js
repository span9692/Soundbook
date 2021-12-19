import LoginForm from "../auth/LoginForm"
import './splash.css'

function Splash() {
    return (
        <>
            <div className='splash-page-container'>
                <div className='splash-left'>
                    <div className='splash-text'>
                        soundbook
                    </div>
                    <div className='splash-subtitle'>
                        Connect with artists and the world around you on Soundbook.
                    </div>
                </div>
                <div className='splash-right'>
                    <LoginForm />
                </div>
            </div>
            <footer id='footer'>
                footer
            </footer>
        </>
    )
}

export default Splash
