import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiAbacus } from "react-icons/bi";


const Sidebar = () => {
    return (
        <div className='md:w-1/4 xl:w:1/5 bg-gray-800'>
            <div className='p-6'>
                <p className='uppercase my-4 text-white text-5xl tracking-wide text-center font-bold'>Okasaki</p>

                {/* <p className='mt-5 text-center text-gray-300 text-2xl '> Administra el menu en las siguientes opciones: </p> */}

                <nav className='mt-20  text-center'>
                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/"
                    >
                        Ordenes       
                    </NavLink>
                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/menu"
                    >
                        Menú
                    </NavLink>

                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/historial"
                    >
                       
                        Historial
                    </NavLink>

                    <NavLink
                        className="p-2 text-3xl text-gray-200 block hover:bg-yellow-500 hover:text-gray-900"
                        activeClassName="text-yellow-500"
                        exact="true"
                        to="/ventas"
                    >
                        Ventas
                    </NavLink>

                </nav>
            </div>
        </div>
    );
}

export default Sidebar;