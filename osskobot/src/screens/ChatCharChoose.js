import axios from "axios";
import CharProfile from "../components/CharProfile/CharProfile";
import styles from './ChatCharChoose.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { publicAxios, privateAxios } from '../services/axiosConfig';

function CharCharChoose() {
    const [characters, setCharacters] = useState([]);
    const { id, characterid } = useParams();

    useEffect(() => {
        const getCharacters = async () => {
            const characters_response = await publicAxios.get(`books/${id}/characters/`);
            setCharacters(characters_response.data)
        };
        getCharacters();
    }, [id]);


    return (
        <div className={styles.charProfileDiv}>
            {characters.map(character => (
                <CharProfile
                    key={character.id}
                    character={character}
                    mode={2}/>
            ))}
            {/* <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/> */}
        </div>
    );
}

export default CharCharChoose;