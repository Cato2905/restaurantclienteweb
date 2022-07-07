import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';


const Ordenes = () => {

    // definir el state para los platillos
    const [promo, setPromo] = useState([]);


    const { firebase } = useContext(FirebaseContext);


    const consoleLog = () => {
        console.log(promo)


    }





    // consultar la base de datos al cargar
    useEffect(() => {

        firebase.db.collection('ordenes').onSnapshot((docSnapshot) => {

            const dataArray = []

            docSnapshot.docs.map((doc, indexDoc) => {

                dataArray.push({ ...doc.data(), indexDoc })

                // console.log(doc.data().nombre)
            })

            setPromo(dataArray)

        });
    }, [])// eslint-disable-line react-hooks/exhaustive-deps





    return (
        <div>
            {
                promo.map((item, index) => [

                    <div className="w-full px-3 mb-4">
                        <div className="p-5 shadow-md bg-white">
                            <div className="lg:flex-auto ">
                                <div className="lg:w-5/12 xl:w-3/12 ">
                                    <div className="sm:flex sm:-mx-2 pl-2 ">
                                        <label className="block mt-5 sm:w-2/4">
                                            <p className="block text-gray-800 mb-2 text-2xl font-bold text-center" >Pedido</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-4">
                                    <div className="p-5 shadow-md bg-white">
                                        <div className="lg:w-7/12 xl:w-9/12 pl-5 ">
                                            <p className="font-bold text-2xl text-yellow-600 mb-4">Cliente:
                                                <span className="text-gray-900 font-bold"> {item.nombre}  {item.apellido} </span>
                                            </p>

                                            <p className="text-gray-600 mb-4">Hora del pedido: {item.horaPedido} </p>

                                            <p className="text-gray-600 mb-4">Direccion: {''}
                                                <span className="text-gray-700 font-bold">{item.direccion}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {item.pedido.map((itemPedido) => [

                                    <div className="w-full px-3 mb-4">
                                        <div className="p-5 shadow-md bg-white">
                                            <div className="lg:w-7/12 xl:w-9/12 pl-5 ">

                                                <p className="font-bold text-2xl text-yellow-600 mb-4">Nombre promocion:
                                                    <span className="text-gray-900 font-bold"> {itemPedido.nombre}</span>
                                                </p>

                                                <p className="text-gray-600 mb-4">descripcion {itemPedido.descripcion} </p>

                                                <p className="text-gray-600 mb-4">Cantidad:
                                                    <span className="text-gray-700 font-bold"> {itemPedido.cantidadPromo}</span>
                                                </p>

                                            </div>
                                        </div>
                                    </div>

                                ])}

                                <label className="block mt-5 sm:w-2/4">
                                    <p className="block text-gray-800 mb-2 text-2xl font-bold" >Total pedido: {item.TotalPedido}</p>
                                </label>













                                <button
                                    onClick={() => consoleLog()}
                                    className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-3 mb-4"

                                >consoleLog</button>


                            </div>
                        </div>
                    </div>
                ])
            }
        </div>

    );
}

export default Ordenes;