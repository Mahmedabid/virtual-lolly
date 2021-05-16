import React from 'react'
import Header from './Header'
import { Lolly } from './Lolly'

const LollyPage = ( c1: string, c2: string, c3: string, sender: string, msg: string, receiver: string, lollyPath: string) => {
    return (
        <div>
            <Header />
            <div>
                <Lolly LollyTop={c1} LollyMiddle={c2} LollyBottom={c3} />
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default LollyPage
