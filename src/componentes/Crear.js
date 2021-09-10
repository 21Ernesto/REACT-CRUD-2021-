import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/Api"

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombre:"",
            cedula:"",
            telefono:"",
            mail:"",
            errores:[]
        }
    }
    cambioValor=(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({state, errores:[]});
    }
    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1
    }
    enviarDatos=(e)=>{
        e.preventDefault();
        const{nombre,cedula, telefono, mail}=this.state;

        var datosEnviar = {nombre:nombre, cedula:cedula, telefono:telefono, mail:mail}

        var errores=[]
        if(!nombre)errores.push("error_nombre")
        if(!cedula)errores.push("error_cedula")
        if(!telefono)errores.push("error_telefono")
        if(!mail)errores.push("error_correo")

        this.setState({errores:errores})
        if(errores.length >0)return false

        fetch(Api+"?insertar=1",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.props.history.push("/");
        })
        .catch()
    }
    render() { 

        const{nombre, cedula, telefono, mail}=this.state;

        return ( 
            <div className="card">
                <div className="card-header">
                    <div className="App">
                        <h4 className="card-title">Registro de usuarios</h4>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                            <label htmlFor="">Nombre:</label>
                            <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={nombre} className={((this.verificarError("error_nombre"))?"is-invalid":"")+" form-control"} placeholder="Nombre" aria-describedby="helpId"/>
                            <small id="helpId" className="invalid-feedback">Escribe el nombre del empleado</small>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="">Cédula:</label>
                            <input type="text" name="cedula" id="cedula" value={cedula} onChange={this.cambioValor} className={((this.verificarError("error_cedula"))?"is-invalid":"")+" form-control"} placeholder="Cédula" aria-describedby="helpId"/>
                            <small id="helpId" className="invalid-feedback">Escribe el cédula del empleado</small>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="">Teléfono:</label>
                            <input type="text" name="telefono" id="telefono" onChange={this.cambioValor} value={telefono} className={((this.verificarError("error_telefono"))?"is-invalid":"")+" form-control"} placeholder="Teléfono" aria-describedby="helpId"/>
                            <small id="helpId" className="invalid-feedback">Escribe el teléfono del empleado</small>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="">Email:</label>
                            <input type="text" name="mail" id="mail" value={mail} onChange={this.cambioValor} className={((this.verificarError("error_correo"))?"is-invalid":"")+" form-control"} placeholder="Email" aria-describedby="helpId"/>
                            <small id="helpId" className="invalid-feedback">Escribe el correo del empleado</small>
                        </div>
                        <br/>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar</button>
                            <Link to={'/'} className="btn btn-primary">Cancelar</Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        );
    }
}

export default Crear;