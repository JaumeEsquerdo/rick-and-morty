import { useState } from 'react'
import { ListaPersonajes } from './components/ListaPersonajes'
import '@/css/personajes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom';


import { Lugares } from '@/pages/Lugares'
import { Personajes } from '@/pages/Personajes'
import { Episodios } from '@/pages/Episodios'



const NavBar = () => (
  <>
    <div>
      <img src="/img/rick-logo.png" alt="" />
    </div>
    <nav className='Navegacion'>
      <ul className='Navegacion-ul'>
        <li><NavLink className='Navegacion-a' to="/personajes">Personajes</NavLink></li>
        <li><NavLink className='Navegacion-a' to="/lugares">Lugares</NavLink></li>
        <li><NavLink className='Navegacion-a' to="/episodios">Episodios</NavLink></li>
      </ul>
    </nav>

  </>
);




function App() {

  // const pathname = window.location.pathname;
  // let Component;

  // switch (pathname) {
  //   case "/personajes":
  //     Component = Personajes;
  //     break;
  //   case "/lugares":
  //     Component = Lugares;
  //     break;
  //   case "/episodios":
  //     Component = Episodios;
  //     break;
  //   default:
  //     Component = Personajes;
  // }

  return (
    <>
      <BrowserRouter>

        <NavBar />
        <Routes>
          <Route path='/' element={<Personajes />} />

          <Route path='/personajes' element={<Personajes />} />
          <Route path='/lugares' element={<Lugares />} />
          <Route path='/episodios' element={<Episodios />} />
        </Routes>

      </BrowserRouter>


      {/* <Component /> */}
    </>
  )
}

export default App
