import '../../Styles/Nav.css'

import React, {useEffect} from 'react'

const Nav = () =>{

    useEffect(()=>{
        console.log('mpunted')
    })

    return(
        <div className="nav-container">
            
            <ul>
                <li>RUM AND BEER DRAFT LEAGUE</li>

                <li>First</li>
                <li>Second</li>
                <li>Third</li>
            </ul>
        </div>
    )
}

export default Nav