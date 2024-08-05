import styles from './CharProfile.module.css';
import Modal from '../Modal/CharIntroModal';
import React, { useState, useEffect } from 'react';

function CharProfile({character, mode}){
    const [isClk, setIsClk] = useState(false);

    const onClickBtn = () => {
        setIsClk(true);
    };

    const onRequestClose = () => {
        setIsClk(false);
    };

    return (
        <div className={styles.profileDiv}>
            <button className={styles.profileBtn} onClick={onClickBtn} >
                <img className={styles.profileImg} src={character.character_image} alt={character.name}/>
            </button>
            <p className={styles.name}>{character.name}</p>
            <Modal isOpen={isClk} onRequestClose={onRequestClose} name={character.name} description={character.description} src={character.character_image} mode={mode} content={`${character.description}`} characterid={character.id}/>
        </div>
    )
};

export default CharProfile;