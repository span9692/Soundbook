// import { Modal } from "../../context/Modal"
// import { useState } from 'react'

// function IndivFriendModal({photo, index}) {
//     const [showModal, setShowModal] = useState(false)
//     return (
//         <>
//             <img key={index} onClick={() => setShowModal(true)} className={index === 0 ? 'posted-photos image-index-0'
//                 : [index === 2 ? 'posted-photos image-index-2'
//                     : [index === 6 ? 'posted-photos image-index-6'
//                         : [index === 8 ? 'posted-photos image-index-8'
//                             : 'posted-photos']]]} src={photo.photo}></img>
//             {showModal && (
//             <Modal onClose={() => setShowModal(false)}>
//                 <div className='asdf'>
//                     <img className='indiv-photo-modal' src={photo.photo}></img>
//                     fdsa
//                 </div>
//             </Modal>
//             )}
//         </>
//     )
// }

// export default IndivFriendModal
