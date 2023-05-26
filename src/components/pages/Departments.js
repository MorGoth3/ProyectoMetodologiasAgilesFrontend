import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

const Departments = () => {
   
    const [id, setId] = useState("");
    const [nombreDepto, setNombreDepto] = useState("");

    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [editarDep, setEditarDep] = useState(false);
    useEffect(() => {
        getListDepartments();
    }, []);

    const addDepartments = ()=>{
        Axios.post("http://localhost:3000/departamento",{
            Nombre:nombreDepto
        }).then(()=>{
            // alert("Departamento agregado");
            getListDepartments();
        });
        
        cleanFields();
    }
    
    const editDepartments = (val)  => {
        setEditarDep(true);
        setId(val.Clave);
        setNombreDepto(val.Nombre);

        // alert("Editar departamento");
    }

    const updateDepartments = () => {
        Axios.put("http://localhost:3000/departamento",{
            Clave:id,
            Nombre:nombreDepto
        }).then(()=>{
            getListDepartments()
            cleanFields();
            // alert("Producto actualizado");
        });
        
        
    }

    const cleanFields = () => {
        setNombreDepto("");
        setEditarDep(false);
    }

    const deleteDepartments = (id) => {
        console.log(id);
        Axios.delete(`http://localhost:3000/departamento/${id}`).then(()=>{
            getListDepartments()
            cleanFields();
            // alert("Departamento eliminado");
        });
    }

    const getListDepartments = () =>{
        Axios.get("http://localhost:3000/departamentos").then((response)=>{
            setListaDepartamentos(response.data);
            // console.log(response.data);
        });
    }

    // getListDepartments();

    return(
        <div className="container">
            
            <div className="card text-center m-5">
                <div className="card-header">
                    Registrar Departamentos
                </div>
                <div className="card-body w-50 p-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre</span><br/>
                        <input 
                            type="text" 
                            className="form-control"
                            value={nombreDepto}
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            onChange={(event) =>{
                                setNombreDepto(event.target.value); //Asignar el valor de nombre
                            }}
                        />             
                    </div>
                    
                                 
                </div>
                <div className="card-footer text-body-secondary">
                    {
                        editarDep===true?
                        <div>
                            <button  
                                type="button" 
                                className="btn btn-warning m-2"
                                onClick={updateDepartments}
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
                            onClick={addDepartments}
                            >Dar de Alta
                        </button>
                    }   
                    
                </div>
            </div>
            <div className="card text-center m-5" >
                <div className="card-header">
                    Lista de departamentos
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {
                            listaDepartamentos.map((val,key)=>{
                                return <tr key={val.Clave}>
                                            <th scope="row">{val.Clave}</th>
                                            <td>{val.Nombre}</td>
                                            <td>
                                                <button  
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={()=>{
                                                        editDepartments(val);
                                                    }}
                                                >Editar
                                                </button>
                                                <button  
                                                    type="button" 
                                                    className="btn btn-danger"
                                                    onClick={()=>{
                                                        deleteDepartments(val.Clave);
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

export default Departments;