import { useState, useEffect } from 'react';

export const ListaPersonajes = () => {

    const [characters, setCharacters] = useState([]);
    // const [count, setCount] = useState(20); //estado para el manejo de personajes a mostrar
    const [page, setPage] = useState(1); //carga desde la primera página, cada página contiene 20 personajes y hay 183personajes
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false); //empieza en false ya que en la pagina 1 no hay menos
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const getCharacters = async () => {
            setLoading(true)
            try {
                console.log("Fetch")
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

                //saber si la respuesta no tuvo exito
                if (!response.ok) {
                    throw new Error("Error de respuesta de servidor")
                }

                const data = await response.json();

                if (data.results) {
                    setCharacters(data.results);

                    console.log("Personajes cargados", data.results)

                }

                setHasNextPage(data.info.next !== null); //verifica y pone true si no es null el valor
                setHasPrevPage(data.info.prev !== null);

            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false);
            }
        };
        getCharacters() //usa la pagina actual

    }, [page]); // cuando cambia count se actualiza

    const handleNextPage = () => {
        if (hasNextPage) {//si es true hasnextpage
            setPage(page + 1); //cargar la siguiente page
        }
    };

    const handlePrevPage = () => {
        if (hasPrevPage) {//si es true hasnextpage
            setPage(page - 1); //cargar la siguiente page
        }
    };


    return (
        <div>

            {loading && <p>Cargando...</p>}
            <ul className='Personajes-ul'>
                {
                    characters.map((character, i) => (
                        <li key={i}>
                            <img loading='lazy' src={character.image} alt={`Imagen de ${character.name}`} />
                            <p>{character.name}</p>
                        </li>
                    ))
                }
            </ul>
            {/* si hasPrevPage o Next es false se deshabilita */}
            <button disabled={!hasPrevPage} onClick={handlePrevPage}>Anteriores personajes</button>
            <button disabled={!hasNextPage} onClick={handleNextPage}>Siguientes personajes</button>
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