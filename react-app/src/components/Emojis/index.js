import React from 'react';
import Picker from 'emoji-picker-react';
import './emoji.css'

function Emojis({location, setPostValue}) {
    const onEmojiClick = (e, emojiObject) => {
        setPostValue(prev => prev+emojiObject.emoji);
      };

    let option;
    if (location === 'feed-post') {
        option = 'emoji-container1'
    } else if (location === 'profile-post') {
        option = 'emoji-container2'
    } else if (location === 'profile-edit-post') {
        option = 'emoji-container3'
    } else if (location === 'profile-edit-comment') {
        option = 'emoji-container4'
    } else if (location === 'profile-comment') {
        option = 'emoji-container5'
    }
    // disableSearchBar={true}
    return (
        <>
            <div className={option}>
                <Picker groupVisibility={{recently_used: false,}} onEmojiClick={onEmojiClick} />
            </div>
        </>
    )
}

export default Emojis
