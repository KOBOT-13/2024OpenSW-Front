import profile from '../../assets/profile.png';
import styles from './CharProfile.module.css';
import Modal from '../Modal/CharIntroModal';
import React, { useState, useEffect } from 'react';

function CharProfile({img, character, mode}){
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
                <img className={styles.profileImg} src={profile} alt={character.name}/>
            </button>
            <p className={styles.name}>{character.name}</p>
            <Modal isOpen={isClk} onRequestClose={onRequestClose} name={character.name} description={character.description} src={profile} mode={mode} content={`${character.description}`} characterid={character.id}/>
        </div>
    )
};

export default CharProfile;