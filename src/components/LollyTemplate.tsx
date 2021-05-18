import React from 'react'
import Header from './Header'
import { Lolly } from './Lolly'

interface PageProps {
    c1: string
    c2: string
    c3: string
    msg: string
    sender: string
    receiver: string
    lollyPath: string
}

const LollyTemplate: React.FC<PageProps> = ({ c1, c2, c3, msg, sender, receiver, lollyPath }) => {

    return (
        <div>
            <Header />
            <div>
                <Lolly LollyTop={c1} LollyMiddle={c2} LollyBottom={c3} />
                <div>
                    <div>{`https://ahm-vlolly.netlify.app/lolly/${lollyPath}`}</div>
                    <div>
                        <h3>{receiver}</h3>
                        <p>{msg}</p>
                        <h3>{sender}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LollyTemplate
