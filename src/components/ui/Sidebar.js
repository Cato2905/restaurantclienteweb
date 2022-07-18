import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiAbacus } from "react-icons/bi";
import 'bootstrap-icons/font/bootstrap-icons.css'


const Sidebar = () => {
    return (
        <div className='md:w-1/4 xl:w:1/5 bg-gray-800'>
            <div className='p-6'>
                <img src={require('../paginas/img/image.png')} />
                {/* <p className='uppercase my-4 text-white text-5xl tracking-wide text-center font-bold'>Okasaki</p> */}

                {/* <p className='mt-5 text-center text-gray-300 text-2xl '> Administra el menu en las siguientes opciones: </p> */}

                <nav className='mt-20  text-left'>
                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/"
                    >
                        <i class="bi bi-journal-bookmark-fill"></i> Órdenes
                    </NavLink>
                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/menu"
                    >
                        <i class="bi bi-card-list"></i> Menú
                    </NavLink>

                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/historial"
                    >

                        <i class="bi bi-clock-history"></i> Historial
                    </NavLink>

                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/ventas"
                    >
                        <i class="bi bi-cash-coin"></i> Ventas
                    </NavLink>

                </nav>
            </div>
        </div>
    );
}

export default Sidebar;