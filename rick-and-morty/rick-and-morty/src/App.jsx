import { useState } from 'react'
import {ListaPersonajes} from './components/ListaPersonajes'
import '@/css/personajes.css'

import {Lugares} from '@/pages/Lugares'
import {Personajes} from '@/pages/Personajes'
import {Episodios} from '@/pages/Episodios'



const NavBar = () => (
  <>
  <div>
    <img src="/img/rick-logo.png" alt="" />
  </div>
  <nav className='Navegacion'>
    <ul className='Navegacion-ul'>
      <li><a className='Navegacion-a' href="/personajes">Personajes</a></li>
      <li><a className='Navegacion-a' href="/lugares">Lugares</a></li>
      <li><a className='Navegacion-a' href="/episodios">Episodios</a></li>
    </ul>
  </nav>
  
  </>
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

      <Component />
    </>
  )
}

export default App
