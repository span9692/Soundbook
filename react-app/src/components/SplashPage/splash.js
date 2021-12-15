import LoginForm from "../auth/LoginForm"
import './splash.css'

function Splash() {
    return (
        <>
            <div className='splash-page-container'>
                <div>
                    <div>
                        facebook
                    </div>
                    <div>
                        connect with artists around the world
                    </div>
                </div>
                <div className='splash-page-content'>
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
