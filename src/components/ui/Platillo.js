import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2'




const Platillo = ({ platillo }) => {



    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(platillo.existencia);

    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)

    const { id, nombre, imagen, existencia, precio, descripcion } = platillo;


    // modificar el estado del platillo en firebase
    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value === "true");

        try {
            firebase.db.collection('productos').doc(id).update({ existencia });
        } catch (error) {
            console.log(error);
        }
    }

    const storage = getStorage();
    const desertRef = ref(storage, imagen);


    const eliminarPlatillo = () => {
        //alert('imagen');
        try {
            firebase.db.collection('productos').doc(id).delete();
            //firebase.storage.child('productos').doc(imagen).delete();
            deleteObject(desertRef)
        } catch (error) {
            console.log(error);
        }
    }


    const mostrarAlerta = () => {

        Swal.fire({
            title: '¿Está seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'Su platillo ha sido eliminado.',
                    'success'

                )
                eliminarPlatillo()
            }
        })

    }


    return (
        <div className="w-full px-3 mb-4 ">
            <div className="p-5 shadow-md bg-white ">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        <img src={imagen} alt=" imagen platillo " />

                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2 " >Existencia</span>

                                <select
                                    className="bg-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  "
                                    value={existencia}
                                    ref={existenciaRef}
                                    onChange={() => actualizarDisponibilidad()}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>

                                <button
                                    onClick={mostrarAlerta}
                                    className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-3 mb-4"

                                >Eliminar</button>


                            </label>
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre} </p>

                        <p className="text-gray-600 mb-4">{descripcion} </p>

                        <p className="text-gray-600 mb-4">Precio: {''}
                            <span className="text-gray-700 font-bold">$ {precio}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Platillo;