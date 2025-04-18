import React from 'react'
import { NavLink } from 'react-router-dom'

function Index() {

    return (
        <div>
            <ul>
                <NavLink to='/product'>
                    <li>Products</li>
                </NavLink>

                <NavLink to='/contact'>
                    <li>Contact</li>
                </NavLink>

                <NavLink to='/profile'>
                    <li>Profile</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default Index