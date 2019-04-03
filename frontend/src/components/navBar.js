import React from 'react'

import NavBarItem from './navBarItem'

export default props => (
    <nav className="side-navbar">
        <div className="sidebar-header d-flex align-items-center">
            <div className="avatar"><img src="https://placeimg.com/100/100/people" alt="..." className="img-fluid rounded-circle" /></div>
            <div className="title">
                <h1 className="h4">{props.userName}</h1>
                <p>Administrador</p>
            </div>
        </div>
        <span className="heading">Principal</span>
        <ul className="list-unstyled">
            <NavBarItem path="reseller" icon="icon-padnote" label="Revendedoras"/>
            <NavBarItem path="listProducts" icon="icon-padnote" label="Produtos"/>
        </ul>
        {/*<span className="heading">Extras</span>
        <ul className="list-unstyled">
            <li> <a href="#"> <i className="icon-flask"></i>Demo </a></li>
            <li> <a href="#"> <i className="icon-screen"></i>Demo </a></li>
            <li> <a href="#"> <i className="icon-mail"></i>Demo </a></li>
            <li> <a href="#"> <i className="icon-picture"></i>Demo </a></li>
        </ul>*/}
    </nav>
)