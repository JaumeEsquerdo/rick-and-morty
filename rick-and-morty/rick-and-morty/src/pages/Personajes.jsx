import { useState, useEffect } from "react";
import { ListaPersonajes } from '@/components/ListaPersonajes'

export const Personajes = () => {
    return (<div>
        <audio autoPlay loop>
            <source src="/music/Chaos-chaos.mp3" type="audio/mp3" />
        </audio>

        <h2 className="Personajes-title">Personajes</h2>
        <ListaPersonajes />

    </div>);
}

