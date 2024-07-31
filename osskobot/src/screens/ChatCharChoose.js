import axios from "axios";
import CharProfile from "../components/CharProfile/CharProfile";
import styles from './ChatCharChoose.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cookies from 'js-cookie';

function CharCharChoose() {
    const [characters, setCharacters] = useState([]);
    const { id, characterid } = useParams();
    const navigate = useNavigate();

    const post_con_url = process.env.REACT_APP_API_POST_CON

    useEffect(() => {
        const getCharacters = async () => {
            const characters_response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}books/${id}/characters/`);
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