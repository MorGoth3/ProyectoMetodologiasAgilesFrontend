import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
           <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Tienda de Electronicos</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='/products'>Productos</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='/departments'>Departamentos</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='/assign'>Asignaciones</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
            </nav>
        </div>
    );
}

export default Navbar;