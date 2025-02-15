import { useState, useEffect } from 'react';

const ListaPersonajes = () => {

    const [ricks, setRicks] = useState([]);
    const [mortys, setMortys] = useState([]);

    useEffect(() => {

        const getCharacters = async (name, count) => { // name y count como parametros

            let page = 1;
            let characters = [];

            while (characters.length < count) {
                try {
                    const response = await fetch('https://rickandmortyapi.com/api/character');
                    const data = await response.json();

                    if (data.results) {
                        const filtered = data.results.filter(character => character.name.includes(name));
                        characters = characters.concat(filtered);
                    }

                    console.log(characters);

                    if (!data.info?.next) break;
                    page++;


                } catch (error) {
                    console.error('Error:', error)
                    break;
                }
            }
            return characters.slice(0, count); //asegura que solo devuelva la cantidad pedida
        };

        const getData = async () => {
            const rickResults = await getCharacters("Rick", 5);
            const mortyResults = await getCharacters("Morty", 5);
            setRicks(rickResults);
            setMortys(mortyResults);

            console.log(rickResults);

        }
        getData();


    }, []);


    return (
        <div>
            <h2>Ricks</h2>
            <ul>
                {
                    ricks.map((rick, i) => (
                        <li key={i}>{rick.name}</li>
                    ))
                }
            </ul>
            <h2>Mortys</h2>
            <ul>
                {
                    mortys.map((morty, i) => (
                        <li key={i}>{morty.name}</li>
                    ))
                }
            </ul>

        </div>
    );
}

export default ListaPersonajes;