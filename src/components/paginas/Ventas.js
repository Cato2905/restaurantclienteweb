import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import ReactExport from 'react-export-excel-xlsx-fix'
import Swal from 'sweetalert2'


const Ventas = () => {

    const { firebase } = useContext(FirebaseContext);

    const [promo, setPromo] = useState([]);
    const [suma, setSuma] = useState(0);
    const [todo, setTodo] = useState([])



    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;







    // consultar la base de datos al cargar
    useEffect(() => {
        firebase.db.collection('ventasDiarias').onSnapshot((docSnapshot) => {
            const dataArray = []
            docSnapshot.docs.map((doc, indexDoc) => {
                dataArray.push({ ...doc.data(), indexDoc })
                // console.log(doc.data().nombre)
            })
            setPromo(dataArray)

        });
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        var suma = 0
        promo.forEach(element => {
            // console.log(element.resultado)
            suma = suma + element.TotalPedido
        });
        setSuma(suma)
        // console.log(arrayCarrito)
    }, [promo])

    const borrarCollecion = () => {
        firebase.db.collection("ventasDiarias").get().then(res => {
            res.forEach(element => {
                element.ref.delete();
            });
        })

    }

    const Exportar = () => {

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Las ventas an sido exportadas',
            showConfirmButton: false,
            timer: 1500
        })
        .then(borrarCollecion())

    }


    const event = new Date();
    const date2 = event.toLocaleDateString()
    const sumaExcel = '=SUMA(B:B)'

    return (





        <div>

            <h1 className='text-3xl font-light mb4 mb-5'>Ventas </h1>


            <h1 className='text-2xl mb-5'>  Su total de ventas es:  {suma}</h1>

            {/* <button
                onClick={() => firebase.db.collection("ventasDiarias")
                    .get()
                    .then(res => {
                        res.forEach(element => {
                            element.ref.delete();
                        });
                    })
                }
                className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4 text-2xl"

            >asd</button> */}
            {/* <button
                onClick={() => console.log(promo)}
                className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4 text-2xl"

            >asd</button> */}


            <ExcelFile
                element={
                    <button
                        onClick={() => Exportar()}
                        className="bg-red-600 text-white shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4 text-2xl"
                    >Exportar Excel</button>}
                filename={"Ventas" + " " + date2}>
                <ExcelSheet data={promo} name={["Ventas"]}>
                    <ExcelColumn label="Numero venta" value="indexDoc" />
                    <ExcelColumn label="Total" value="TotalPedido" />
                    <ExcelColumn label="Fecha" value="FechaPedido" />
                    <ExcelColumn label=" " />
                    <ExcelColumn label=" " />
                    <ExcelColumn label="suma"  />
                    <ExcelColumn label={sumaExcel}  />

                </ExcelSheet>

            </ExcelFile>

            {
                promo.map((item, index) => [



                    <div className="w-full px-3 mb-4 " key={index}>
                        <div className="p-5 shadow-md bg-white ">
                            <div className="lg:flex-auto ">
                                <div className="lg:w-5/12 xl:w-3/12 ">
                                    <div className="sm:flex sm:-mx-2 pl-2 ">
                                        <label className="block mt-5 sm:w ">
                                            <p className="block text-gray-800 mb-2 font-bold  " >Venta n°: {item.indexDoc}</p>
                                        </label>
                                    </div>
                                </div>



                                <label className="block mt-5 sm:w-2/4">
                                    <p className="block text-gray-800 mb-2 font-bold" >Total: {item.TotalPedido}</p>
                                </label>



                            </div>
                        </div>
                    </div>
                ])
            }


        </div>
    )
}

export default Ventas