import React from 'react'
import { Link } from 'react-router'

export default props => (
    <li>
        <Link to={props.path}>
            <i class={props.icon}></i>{props.label}
        </Link>
    </li>
)