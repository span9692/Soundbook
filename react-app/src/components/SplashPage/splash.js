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


// #page-container {
//     position: relative;
//     min-height: 100vh;
//   }

//   #content-wrap {
//     padding-bottom: 2.5rem;    /* Footer height */
//   }

//   #footer {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     height: 2.5rem;            /* Footer height */

{/* <html>
 <head>
   <link rel="stylesheet" type="text/css" href="main.css" />
 </head>

<body>
 <div id="page-container">
   <div id="content-wrap">
     <!-- all other page content -->
   </div>
   <footer id="footer"></footer>
 </div>
</body>

</html> */}
