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
    }

    return (
        <>
            <div className={option}>
                <Picker groupVisibility={{recently_used: false,}} disableSearchBar={true} onEmojiClick={onEmojiClick} />
            </div>
        </>
    )
}

export default Emojis
