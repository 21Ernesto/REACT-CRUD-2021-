import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/Api"

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            usuario:[],
            errores:[]
        }
    }

    cambioValor=(e)=>{
        const state=this.state.usuario;
        state[e.target.name]=e.target.value;
        this.setState({emplusuarioeado:state, errores:[]});
    }
    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1
    }
    enviarDatos=(e)=>{
        e.preventDefault();
        const {id, nombre, cedula, telefono ,mail}=this.state.usuario
        var datosEnviar = {id:id, nombre:nombre, cedula:cedula, telefono:telefono, mail:mail}

        var errores=[]
        if(!nombre)errores.push("error_nombre")
        if(!cedula)errores.push("error_cedula")
        if(!telefono)errores.push("error_telefono")
        if(!mail)errores.push("error_correo")

        this.setState({errores:errores})
        if(errores.length >0)return false

        fetch(Api+"?actualizar=1",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.props.history.push("/");
        })
        .catch()
    }

    componentDidMount(){
        fetch(Api+"?consultar="+this.props.match.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.setState({
                    datosCargados:true, 
                    usuario:datosRespuesta[0]
                })
            })
            .catch()
    }


    render() {
        const{datosCargados, usuario}=this.state
        if(!datosCargados){
            return (<div>Cargando...</div>)
        }else{
            return ( 
                <div className="card">
                    <div className="card-header">
                        <div className="App">
                            <h4 className="card-title">Editar empleador</h4>
                        </div>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                            <label htmlFor="">Identificador:</label>
                            <input type="text" readOnly value={usuario.id} className="form-control" onChange={this.cambioValor} name="id" id="id" aria-describedby="helpId" placeholder=""/>
                            <small id="helpId" className="form-text text-muted">Help text</small>
                        </div>
                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={usuario.nombre} className={((this.verificarError("error_nombre"))?"is-invalid":"")+" form-control"} placeholder="Nombre" aria-describedby="helpId"/>
                                <small id="helpId" className="text-muted">Escribe el nombre del usuario</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Cédula:</label>
                                <input type="text" name="cedula" id="cedula" value={usuario.cedula} onChange={this.cambioValor} className={((this.verificarError("error_cedula"))?"is-invalid":"")+" form-control"} placeholder="Cédula" aria-describedby="helpId"/>
                                <small id="helpId" className="text-muted">Escribe el cédula del usuario</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Teléfono:</label>
                                <input type="text" name="telefono" id="telefono" onChange={this.cambioValor} value={usuario.telefono} className={((this.verificarError("error_telefono"))?"is-invalid":"")+" form-control"} placeholder="Teléfono" aria-describedby="helpId"/>
                                <small id="helpId" className="text-muted">Escribe el teléfono del usuario</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email:</label>
                                <input type="text" name="mail" id="mail" value={usuario.mail} onChange={this.cambioValor} className={((this.verificarError("error_correo"))?"is-invalid":"")+" form-control"} placeholder="Email" aria-describedby="helpId"/>
                                <small id="helpId" className="text-muted">Escribe el correo del usuario</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar</button>
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
}

export default Editar;