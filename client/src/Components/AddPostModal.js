import React from 'react'
import '../Style/addpostmodal.css'
import post from '../assests/post.png'
const AddPostModal = ({ closeModal }) => {
    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container') {
                closeModal()
            }
        }}>
            <div className="modal">
                <form >
                    <div className="partition">
                        <div className="left">

                            <input type="file" name="avatar" id="avatar"  className='file-input'/>



                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <label htmlFor="username">
                                        <span className="label">
                                            caption<span className="required-star">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="caption"
                                        required
                                    />
                                </li>
                                <li>
                                    <label htmlFor="username">
                                        <span className="label">
                                            hashtags<span className="required-star">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="hashtags"
                                        required
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default AddPostModal