import { useState, useEffect } from 'react';
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { FaRedditAlien } from "react-icons/fa";
import { PiFinnTheHumanFill } from "react-icons/pi";




export const ListaPersonajes = () => {

    const [characters, setCharacters] = useState([]);
    // const [count, setCount] = useState(20); //estado para el manejo de personajes a mostrar
    const [page, setPage] = useState(1); //carga desde la primera página, cada página contiene 20 personajes y hay 183personajes
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false); //empieza en false ya que en la pagina 1 no hay menos
    const [loading, setLoading] = useState(false);
    const [angle, setAngle] = useState(0); //para que ruede la img del portal
    const [maxPages, setMaxPages] = useState(1); // Almacena el máximo de páginas
    const [cantidadPj, setCantidadPj] = useState(0);

    // const [species, setSpecies] = useState("human");

    const [searchQuery, setSearchQuery] = useState(""); //para el filtro de personajes

    //FETCH
    useEffect(() => {

        const getCharacters = async () => {
            setLoading(true)

            //FETCH DE 20 personajes + name searchQuery para filtrar por nombre
            try {
                console.log("Fetch")
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`);

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
                setMaxPages(data.info.pages)
                setCantidadPj(data.info.count)

            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false);
            }
        };
        getCharacters() //usa la pagina actual

    }, [page, cantidadPj, searchQuery]); // cuando cambia count se actualiza




    //interval para ROTAR IMG
    useEffect(() => {
        const interval = setInterval(() => {
            setAngle((prev) => (prev + 1) % 360) //aumenta en 1 el angulo cada 20 milisegundos + mantener el angulo entre 1 y 360 y que no se acumule hasta muchisimo
        }, 30);
        return () => clearInterval(interval); //limpia el intervalo al desmontarlo
    }, []);




    //BTNS
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

    //BORDE DE IMGS DINAMICOS
    const getBorder = (species) => {
        if (species == "Human") {
            return "human";
        } else if (species === "Alien") {
            return "alien"
        }
        return "";
    };

    //FILTRO BUSQUEDA
    const filteredCharacters = characters;
    // characters.filter(character =>
    //     character.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    // );




    //actualizar la búsqueda
    const handleSearch = (event) => {
        if (event.target.value.length > 3) {
            setSearchQuery(event.target.value); // Guarda el valor del input en searchQuery (el useState)
        } else { setSearchQuery("") }

    };
    const handleSearchSubmit = (event) => {
        event.preventDefault(); //ppara que la pagina no se recargue
    }

    return (
        <div >

            {loading && <p>Cargando...</p>}
            <img src="/img/portal-rick.png"
                style={{ transform: `rotate(${angle}deg)` }} className={`Fixed-image`} />


            <form className='Personaje-form' onSubmit={handleSearchSubmit}>
                {/* input de búsqueda */}
                <input className='Personaje-search' type="text" placeholder="Busca un personaje..." onChange={handleSearch} />
                {/* onInput actualiza el valor de la búsqueda con cada entrada */}
            </form>

            <div className="CharacterGrid">
                {filteredCharacters.length !== 0 ? (
                    filteredCharacters.map((character) => (
                        <CharacterCard key={character.id} character={character} getBorder={getBorder} />
                    ))
                ) : (
                    <>
                        <ul className='Personajes-ul'>
                            {
                                characters.map((character) => (
                                    <CharacterCard key={character.id} character={character} getBorder={getBorder} />
                                ))
                            }
                        </ul>
                    </>
                )}
            </div>

            <div className='Controls'>
                {/* si hasPrevPage o Next es false se deshabilita */}
                <div className='Controls-btn'>
                    <button className={`Btn-prev ${!hasPrevPage ? "disabled" : ""}`} disabled={!hasPrevPage} onClick={handlePrevPage}>Anteriores personajes</button>
                    <button className='Btn-next' disabled={!hasNextPage} onClick={handleNextPage}>Siguientes personajes</button>
                </div>

                <p className='Count'>{page}-{maxPages}</p>
                <p className='CantidadPj'>Total personajes: {cantidadPj}</p>
            </div>

        </div>
    );
}



export const CharacterCard = ({ character, getBorder }) => {
    const { name, species, image, status, gender } = character;

    const [flipped, setFlipped] = useState(false);

    const getSpeciesIcon = (species)=>{
        switch(species){
            case "Human": return <PiFinnTheHumanFill />;
            case "Alien": return <FaRedditAlien />;
            
            default : return "❓"
        }
    }

    const getGenderIcon = (gender)=>{
        switch(gender){
            case"Female": return <BsGenderFemale />;
            case"Male": return <BsGenderMale />
            default: return <VscWorkspaceUnknown />
        }
    }


    return (
        <li className={`Tarjeta ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
            <div className='Tarjeta-container'>
                {/* Parte frontal */}
                {!flipped ? (
                    <div className='Tarjeta-front'>
                        <img className={`Personajes-img  ${getBorder(species)}`} loading='lazy' src={image} alt={`Imagen de ${name}`} />
                        <p className='Personajes-text'>{name}</p>
                    </div>
                ) : (<>
                    {/* atras */}
                    <div className='Tarjeta-back'>
                        <img style={{ opacity: "0" }} />
                        <p>TEXTO ATRÁS IMG</p>

                    </div>
                    {<p className="Tarjeta-name">{name}</p>}
                </>

                )}
                {/* PLAN B, PONER LA INFO CON EL HOVER */}
                <div className="Vineta">
                    <p className='Vineta-title'>Curiosities of {name}:</p>
                    <p className="Vineta-text"> {status}</p>
                    <div>{getGenderIcon(gender)} </div>
                    <div>{getSpeciesIcon(species)}
                    </div>
                </div>

            </div>
        </li>


    );
}

export default CharacterCard;

