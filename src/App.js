import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NuevoPaciente from "./components/NuevoPaciente";
import ListaEspera from "./components/ListaEspera";
import Dropdown from 'react-bootstrap/Dropdown';
import ModificarUsuario from "./components/ModificarUsuario";
import NuevoProducto from './components/NuevoProducto';
import NuevaSede from './components/NuevaSede';
import NuevaBodega from './components/NuevaBodega';
import Login from './components/Login';
import NuevoPermiso from './components/NuevoPermiso';
import RemoverPermiso from './components/RemoverPermiso';
import AgregarRol from './components/AgregarRol';
import Perfil from './components/Perfil';
import RegistrarVenta from './components/RegistrarVenta';
import LogInventario from "./components/LogInventario";
import CambioInventario from "./components/CambioInventario";

function App() {
  return (
    <Router>
      <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
          <div class="container-fluid d-flex flex-column p-0">
            <Link
              class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
              to="#"
            >
              <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-poop"></i>
              </div>
              <div class="sidebar-brand-text mx-3">
                <span>
                  Choco <br /> Panel
                </span>
              </div>
            </Link>

            
            <hr class="sidebar-divider my-0" />
            <ul class="nav navbar-nav text-light" id="accordionSidebar">
              
              <li>
                
                <Dropdown>
                <i class="fas fa-user-circle"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Perfil
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/iniciarSesion">
                  <Dropdown.Item href="#/action-1">Iniciar Sesion</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/miPerfil">
                  <Dropdown.Item href="#/action-2">Mi cuenta</Dropdown.Item>
                </Link>
                  <Dropdown.Item href="#/action-3">Cerrar Sesion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-users"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Usuarios
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/">
                  <Dropdown.Item href="#/action-1">Crear</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/modificarUsuario">
                  <Dropdown.Item href="#/action-2">Modificar</Dropdown.Item>
                </Link>
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                <Link class="nav-link" to="/listaUsuarios">
                  <Dropdown.Item href="#/action-3">Listar</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-box-open"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Productos
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/nuevoProducto">
                  <Dropdown.Item href="#/action-1">Crear</Dropdown.Item>
                </Link>
                  <Dropdown.Item href="#/action-2">Modificar</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              
              <li>
                <Dropdown>
                <i class="fas fa-warehouse"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Bodegas
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/nuevaBodega">
                  <Dropdown.Item href="#/action-1">Crear</Dropdown.Item>
                </Link>
                  <Dropdown.Item href="#/action-2">Modificar</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-store-alt"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Sedes
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/nuevaSede">
                  <Dropdown.Item href="#/action-1">Crear</Dropdown.Item>
                </Link>
                  <Dropdown.Item href="#/action-2">Modificar</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-key"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Permisos
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/nuevoPermiso">
                  <Dropdown.Item href="#/action-1">Crear</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/removerPermiso">
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-user-tag"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Roles
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/agregarRol">
                  <Dropdown.Item href="#/action-1">Asignar</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/removerPermiso">
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-layer-group"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Inventarios
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/logsInventario">
                  <Dropdown.Item href="#/action-1">Logs</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/cambioInventario">
                  <Dropdown.Item href="#/action-3">Registrar Cambio</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              <li>
                
                <Dropdown>
                <i class="fas fa-dollar-sign"  style={{ fontSize: 130 + "%" }}></i>
                <Dropdown.Toggle variant='#2b1214'>
                <span style={{ fontSize: 130 + "%" }}>{" "}
                    Ventas
                </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Link class="nav-link" to="/registrarVenta">
                  <Dropdown.Item href="#/action-1">Registrar</Dropdown.Item>
                </Link>
                <Link class="nav-link" to="/removerPermiso">
                  <Dropdown.Item href="#/action-3">Eliminar</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
              
              
              
            </ul>
            
          </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <Switch>
              <Route path="/logsInventario">
                <LogInventario></LogInventario>
              </Route>
              <Route path="/cambioInventario">
                <CambioInventario></CambioInventario>
              </Route>
              <Route path="/registrarVenta">
                <RegistrarVenta></RegistrarVenta>
              </Route>
              <Route path="/miPerfil">
                <Perfil></Perfil>
              </Route>
              <Route path="/agregarRol">
                <AgregarRol></AgregarRol>
              </Route>
              <Route path="/nuevoPermiso">
                <NuevoPermiso></NuevoPermiso>
              </Route>
              <Route path="/removerPermiso">
                <RemoverPermiso></RemoverPermiso>
              </Route>
              <Route path="/iniciarSesion">
                <Login></Login>
              </Route>
              <Route path="/listaUsuarios">
                <ListaEspera></ListaEspera>
              </Route>
              <Route path="/modificarUsuario">
                <ModificarUsuario></ModificarUsuario>
              </Route>
              <Route path="/nuevoProducto">
                <NuevoProducto></NuevoProducto>
              </Route>
              <Route path="/nuevaSede">
                <NuevaSede></NuevaSede>
              </Route>
              <Route path="/nuevaBodega">
                <NuevaBodega></NuevaBodega>
              </Route>
              <Route path="/">
                <NuevoPaciente></NuevoPaciente>
              </Route>

            </Switch>
          </div>
          <footer class="bg-white sticky-footer">
            <div class="container my-auto">
              <div class="text-center my-auto copyright">
                <span> Aplicación Desarrollada Como Voluntariado.</span>
              </div>
            </div>
          </footer>
        </div>
        <a class="border rounded d-inline scroll-to-top" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>
      </div>
    </Router>
  );
}

export default App;
