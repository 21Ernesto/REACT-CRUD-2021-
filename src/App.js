import './App.css';
import React from 'react';
import Listar  from "./componentes/Listar";
import Crear  from "./componentes/Crear";
import Editar  from "./componentes/Editar";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>Sistema</Link>
          <Link className="nav-item nav-link" to={"/crear"}>Crear usuario</Link>

        </div>
      </nav>
      <div className="container">
        <br></br>
        <Route exact path="/" component={Listar}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/editar/:id" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default App;
