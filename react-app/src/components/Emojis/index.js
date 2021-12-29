import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import './emoji.css'

function Emojis() {
    const [chosenEmoji, setChosenEmoji] = useState('');
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
      };

    //   pickerStyle={{ width: '100%' }}
    return (
        <>
            <div className='emoji-container'>
                <Picker groupVisibility={{recently_used: false,}} disableSearchBar={true} onEmojiClick={onEmojiClick} />
            </div>
        </>
    )
}

export default Emojis
