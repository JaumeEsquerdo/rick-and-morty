import { useState } from 'react'
import ListaPersonajes from './components/ListaPersonajes'
import '@/css/personajes.css'

import {Lugares} from '@/pages/Lugares'
import {Personajes} from '@/pages/Personajes'
import {Episodios} from '@/pages/Episodios'



const NavBar = () => (
  <nav>
    <ul>
      <li><a href="/personajes"></a></li>
      <li><a href="/lugares"></a></li>
      <li><a href="/episodios"></a></li>
    </ul>
  </nav>
);




function App() {

  const pathname = window.location.pathname;
  let Component;

  switch (pathname) {
    case "/personajes":
      Component = Personajes;
      break;
    case "/lugares":
      Component = Lugares;
      break;
    case "/episodios":
      Component = Episodios;
      break;
    default:
      Component = Personajes;
  }

  return (
    <>
      <NavBar />
      <ListaPersonajes />

      <Component />
    </>
  )
}

export default App
