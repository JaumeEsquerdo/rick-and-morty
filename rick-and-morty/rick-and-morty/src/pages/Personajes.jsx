import { useState, useEffect } from "react";
import { ListaPersonajes } from '@/components/ListaPersonajes'

export const Personajes = () => {
    return (<div>
        <audio autoPlay loop>
            <source src="./music/Ivan Cornejo - Mirada (Official Lyric Video).mp3" type="audio/mp3" />
        </audio>

        <h2 className="Personajes-title">Personajes</h2>
        <ListaPersonajes />

    </div>);
}

