import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchCharacter = ({ setSelectedUrl, setSelectedLocation }) => {
    const [characterName, setCharacterName] = useState("");
    const [character, setCharacter] = useState([]);


    useEffect(() => {
        if (characterName === "") {
            setCharacter([]);
            return;
        }
        const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;
        axios.get(url)
            .then(res => setCharacter(res.data))
            .catch(err => console.log(err))
    }, [characterName])

    const handleClick = (result) => {
        setCharacterName(result.name);
        setCharacter([]);
        setSelectedUrl(result.url);
        setSelectedLocation(result.location.url);
    };


    return (
        <div>
            <input
                className="card__input"
                type="text"
                placeholder="Enter character name"
                value={characterName}
                onChange={e => setCharacterName(e.target.value)}
            />
            {character && character.results && (
                <ul>
                    {character?.results.map(char => (
                        <li className="card__Srch-list"
                            key={char.id}
                            onClick={() => handleClick(char)}
                        >
                            {char.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCharacter;
