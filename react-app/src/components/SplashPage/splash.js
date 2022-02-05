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
                <div className='empty-footer'>

                </div>
                <div className='footer-container'>
                    <span className='languages footer-text'>English (US)</span><span className='languages footer-text'>Español</span>
                    <span className='languages footer-text'>Français (France)</span><span className='languages footer-text'>中文(简体)</span>
                    <span className='languages footer-text'>العربية</span><span className='languages footer-text'>Português (Brasil)</span>
                    <span className='languages footer-text'>Italiano</span><span className='languages footer-text'>한국어</span>
                    <span className='languages footer-text'>Deutsch</span><span className='languages footer-text'>हिन्दी</span>
                    <span className='languages footer-text'>日本語</span>
                    <hr style={{marginTop: .7+'rem', marginBottom: .7+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                    <div className='footer-last-line'>
                        <div className="footer-text">
                           Soundbook <span className='asdf'><span className='at-text'>©</span></span> 2022
                        </div>
                        <div className="footer-text">
                            Developer: Sean Pan <span><a className='splash-logo' href="https://github.com/span9692" target="_blank"><i class="fab fa-github-square"></i></a> <a className='splash-logo' href="https://www.linkedin.com/in/sean-pan-395a4593/" target="_blank"><i class="fab fa-linkedin"></i></a></span>
                        </div>
                    </div>
                </div>
                <div className='empty-footer'>

                </div>
            </footer>
        </>
    )
}

export default Splash
