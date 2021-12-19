import { useState } from 'react'
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpModal() {
    const [showModal, setShowModal] = useState(false);

    return (

        <div>
          <button type='button' className='form-font newAccBtn pointer fieldSizing' onClick={() => setShowModal(true)}>Create New Account</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <SignUpForm/>
            </Modal>
          )}
        </div>

      );
}

export default SignUpModal
