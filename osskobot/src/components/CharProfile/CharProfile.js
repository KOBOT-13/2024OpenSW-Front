import profile from '../../assets/profile.png';
import styles from './CharProfile.module.css';
import Modal from '../Modal/CharIntroModal';
import React, { useState, useEffect } from 'react';

function CharProfile({img, character, mode}){
    const [isClk, setIsClk] = useState(false);

    // useEffect(() => {
    //     setModalOpen(true);
    // }, []);

    const onClickBtn = () => {
        setIsClk(true);
    }

    if (!character) {
        return null;
    }

    return (
        <div className={styles.profileDiv}>
            <button className={styles.profileBtn} onClick={onClickBtn} >
                <img className={styles.profileImg} src={profile}/>
            </button>
            <p className={styles.name}>{character}</p>
            <Modal isOpen={isClk} onRequestClose={setIsClk} name={character.name} description={character.description} src={profile} mode={mode} content={`${character} ${character.description}`}/>
        </div>
    )
};

export default CharProfile;