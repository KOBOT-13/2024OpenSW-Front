import axios from "axios";
import CharProfile from "../components/CharProfile/CharProfile";
import styles from './ChatCharChoose.module.css';
import React, { useState, useEffect } from 'react';

function CharCharChoose() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const get_characters_url = process.env.REACT_APP_API_GET_CHARACTERS_URL;

    useEffect(() => {
        const fetchCharacters = async () => {
            const characters_response = await axios.get(get_characters_url);
            setCharacters(characters_response.data)
        };
        fetchCharacters();
    }, [get_characters_url]);

    const handleCharacter = (character) => {
        setSelectedCharacter(character);
    };

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