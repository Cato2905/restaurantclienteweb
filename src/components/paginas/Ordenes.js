import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Ordenes = () => {

    // definir el state para los platillos
    const [promo, setPromo] = useState([]);
    const [tiempoEntrega, setTiempoEntrega] = useState(0);
    const { firebase } = useContext(FirebaseContext);


    const consoleLog = () => {
        console.log(tiempoEntrega)


    }



    const definirTiempo = (id) => {

        firebase.db.collection('ordenes').doc(id).update({ tiempoEntrega: tiempoEntrega }).then(() => {
            setTiempoEntrega(0)
        });
        // console.log(id)
    }

    const completarOrden = (id) => {
        firebase.db.collection('ordenes').doc(id).update({ completado: true })
    }

    const terminarOrden = (id) => {
        firebase.db.collection('ordenes').doc(id).delete()

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




                                {item.tiempoEntrega === 0 ? (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Tiempo de Entrega
                                        </label>

                                        <input
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                                            min="1"
                                            placeholder="20"
                                            onChange={e => setTiempoEntrega(parseInt(e.target.value))}
                                        />

                                        <button
                                            onClick={() => definirTiempo(item.id)}
                                            type="submit"
                                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                        >
                                            Definir Tiempo
                                        </button>
                                    </div>
                                ) : (

                                    <div>
                                        <p className="text-gray-700">Tiempo de Entrega:
                                            <span className="font-bold"> {item.tiempoEntrega} Minutos</span>
                                        </p>
                                        <button
                                            onClick={() => completarOrden(item.id)}
                                            className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-3 mb-4"
                                        >
                                            completado
                                        </button>
                                        {item.completado === true && (
                                            <div>
                                                <button
                                                    onClick={()=> terminarOrden(item.id)}
                                                    className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-3 mb-4"
                                                >
                                                    Orden entregada
                                                </button>
                                            </div>
                                        )}


                                    </div>
                                )}




                            </div>
                        </div>
                    </div>
                ])
            }
        </div>

    );
}

export default Ordenes;