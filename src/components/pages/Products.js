import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

const Products = () => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [precio, setPrecio] = useState();
    const [claveDepto, setClaveDepto] = useState();  

    const [listaProductos, setListaProductos] = useState([]);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        getListProducts();
    }, []);
    const addProduct = ()=>{
        Axios.post("http://localhost:3000/productos",{
            nombre:nombre,
            Proveedor:proveedor,
            // precio:precio,            
            // claveDepto:claveDepto
        }).then(()=>{
            // alert("Producto agregado");
            getListProducts();
        });
        
        cleanFields();
    }
    
    const editProduct = (val)  => {
        setEditar(true);
        setId(val.Clave);
        setNombre(val.Nombre);
        setProveedor(val.Proveedor);
        // setPrecio(val.precio);
        // setClaveDepto(val.claveDepto);

        // alert("Editar producto");
    }

    const updateProduct = () => {
        Axios.put("http://localhost:3000/productos",{
            Clave:id,
            nombre:nombre,
            Proveedor:proveedor,
            // precio:precio,            
            // claveDepto:claveDepto
        }).then(()=>{
            getListProducts();
            cleanFields();
            // alert("Producto actualizado");
        });
        
        
    }

    const cleanFields = () => {
        setNombre("");
        setProveedor("");
        setPrecio("");
        setClaveDepto("");
        setEditar(false);
    }

    const deleteProduct = (id) => {
        Axios.delete(`http://localhost:3000/productos/${id}`).then(()=>{
            getListProducts();
            cleanFields();
            // alert("Producto eliminado");
        });
    }

    const getListProducts = () =>{
        Axios.get("http://localhost:3000/productos").then((response)=>{
            setListaProductos(response.data);
            console.log(response.data);
        });
    }

    // getListProducts();

    return (
        <div className="container">
            
            <div className="card text-center m-5">
                <div className="card-header">
                    Registrar Productos
                </div>
                <div className="card-body w-50 p-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre</span><br/>
                        <input 
                            type="text" 
                            className="form-control"
                            value={nombre}
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            onChange={(event) =>{
                                setNombre(event.target.value); //Asignar el valor de nombre
                            }}
                        />             
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Proveedor</span><br/>
                        <input 
                            type="text" 
                            className="form-control"
                            value={proveedor}
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            onChange={(event) =>{
                                setProveedor(event.target.value);
                            }}
                        />             
                    </div>
                    {/* <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Precio</span><br/>
                        <input 
                            type="text" 
                            className="form-control"
                            value={precio}
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            onChange={(event) =>{
                                setPrecio(event.target.value);
                            }}
                        />             
                    </div>                   */}
                    {/* <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">claveDepto</span><br/>
                        <input 
                            type="text" 
                            className="form-control"
                            value={claveDepto}
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            onChange={(event) =>{
                                setClaveDepto(event.target.value);
                            }}
                        />             
                    </div> */}
             
                </div>
                <div className="card-footer text-body-secondary">
                    {
                        editar===true?
                        <div>
                            <button  
                                type="button" 
                                className="btn btn-warning m-2"
                                onClick={updateProduct}
                            >Actualizar
                            </button>
                            <button  
                                type="button" 
                                className="btn btn-danger m-2"
                                onClick={cleanFields}
                            >Cancelar
                            </button>
                        </div>
                        :<button  
                            type="button" 
                            className="btn btn-success"
                            onClick={addProduct}
                            >Dar de Alta
                        </button>
                    }   
                    
                </div>
            </div>
            <div className="card text-center m-5" >
                <div className="card-header">
                    Lista de Productos
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Proveedor</th>
                            {/* <th scope="col">Precio</th> */}
                            {/* <th scope="col">claveDepto</th> */}
                            <th scope="col">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {
                            listaProductos.map((val,key)=>{
                                return <tr key={val.Clave}>
                                            <th scope="row">{val.Clave}</th>
                                            <td>{val.Nombre}</td>
                                            <td>{val.Proveedor}</td>
                                            {/* <td>{val.Precio}</td> */}
                                            {/* <td>{val.ClaveDepto}</td> */}
                                            <td>
                                                <button  
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={()=>{
                                                        editProduct(val);
                                                    }}
                                                >Editar
                                                </button>
                                                <button  
                                                    type="button" 
                                                    className="btn btn-danger"
                                                    onClick={()=>{
                                                        deleteProduct(val.Clave);
                                                    }}
                                                >Eliminar
                                                </button>
                                            </td>
                                        </tr>                                 
                            })  
                        }                           
                                                
                    </tbody>
                </table>
            </div>           
        </div>
    );
}

export default Products;