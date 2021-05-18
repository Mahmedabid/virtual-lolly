import React from 'react'
import Header from './Header'
import { Lolly } from './Lolly'
import { gql, useQuery } from "@apollo/client";

const GetLolly = gql`
    query getLolly($lollyPath: String!) {
        getLolly(lollyPath: $lollyPath) {
            c1
            c2
            c3
            msg
            sender
            receiver
        }
    }
`

interface PageProps {
    lollyPath: string
}

const LollyPage: React.FC<PageProps> = ({lollyPath}) => {

    const {loading, error, data} = useQuery(GetLolly, {
        variables: {
            lollyPath
        }
    });

    if (loading) {
       return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error Try again</h1>
    }

    if (data) {
        console.log(data);
        
    return (
        <div>
            <Header />
            <div>
                {/* <Lolly LollyTop={c1} LollyMiddle={c2} LollyBottom={c3} />
                <div>
                    <div>{`https://ahm-vlolly.netlify.app/lolly/${lollyPath}`}</div>
                    <div>
                        <h3>{receiver}</h3>
                        <p>{msg}</p>
                        <h3>{sender}</h3>
                    </div>
                </div> */}
            </div>
        </div>
    )
    }
}

export default LollyPage
