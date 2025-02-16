import { useState, useEffect } from 'react';

const ListaPersonajes = () => {

    const [characters, setCharacters] = useState([]);
    const [count, setCount] = useState(20); //estado para el manejo de personajes a mostrar
    const [page, setPage] = useState(1); //carga desde la primera página, cada página contiene 20 personajes y hay 183personajes

    useEffect(() => {

        const getCharacters = async (count) => { //count como parametro

            try {
                console.log("Fetch")
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
                const data = await response.json();

                if (data.results) {
                    const selectedCharacters = data.results.slice(0, count)
                    console.log("Personajes cargados", selectedCharacters)

                    setCharacters(selectedCharacters);
                }
            } catch (error) {
                console.error('Error:', error)
            }
        };
        getCharacters(count) //usa el estado actual

    }, [count, page]); // cuando cambia count se actualiza

    const handleMorePages = () =>{
        setPage(page + 1); //cargar la siguiente page
    }

    return (
        <div>
            <audio autoPlay loop>
                <source src="./music/Ivan Cornejo - Mirada (Official Lyric Video).mp3" type="audio/mp3" />
            </audio>

            <h2>Personajes</h2>

            <ul>
                {
                    characters.map((character, i) => (
                        <li key={i}>
                            <img src="h" alt="h" />
                            {character.name}
                        </li>
                    ))
                }
            </ul>
            <button onClick={handleMorePages}>Siguiente página</button>

        </div>
    );
}

export default ListaPersonajes;















// const getData = async () => {
//     const rickResults = await getCharacters("Rick", 5);
//     const mortyResults = await getCharacters("Morty", 5);
//     const summerResults = await getCharacters("Summer", 3);
//     const bethResults = await getCharacters("Beth", 3);
//     const jerryResults = await getCharacters("Jerry", 3);
//     setRicks(rickResults);
//     setMortys(mortyResults);
//     setSummers(summerResults);
//     setBeths(bethResults);
//     setJerrys(jerryResults);

//     console.log(rickResults);
// }

// getData();