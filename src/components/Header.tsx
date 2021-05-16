import { navigate } from 'gatsby'
import React from 'react'

const Header = () => {
    return (
        <div>
            <h1 onClick={() => navigate('/')}>Virtual Lolly</h1>
            <p className="headerP">Enjoy your virtual Lolly with friends</p>
        </div>
    )
}

export default Header
