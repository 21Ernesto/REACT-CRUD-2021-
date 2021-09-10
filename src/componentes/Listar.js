import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/Api"

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            usuarios:[]
        }
    }

    borrarRegistros = (id) =>{
        fetch(Api+"?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.cargarDatos()
        })
        .catch(console.log)
    }

    cargarDatos(){
        fetch(Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, usuarios:datosRespuesta})
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() { 

        const{datosCargados, usuarios}=this.state

        if(!datosCargados){
            return (<div>Cargando...</div>)
        }else{

            return ( 

                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <div className="App">
                            <h3>Lista de usuario</h3>
                        </div>                   
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Cédula</th>
                                    <th>Teléfono</th>
                                    <th>E-mail</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(
                                    (usuario)=>(
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.cedula}</td>
                                            <td>{usuario.telefono}</td>
                                            <td>{usuario.mail}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning" to={"/editar/"+usuario.id}>Editar</Link>
                                                    <button type="button" className="btn btn-danger" onClick={()=>this.borrarRegistros(usuario.id)}>
                                                        Borrar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                                
                            </tbody>
                        </table> 
                    </div>
                </div>
            );
            
        }
    }
}

export default Listar;