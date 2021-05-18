import { useQuery, gql } from '@apollo/client';
import React from 'react'
import LollyTemplate from '../components/LollyTemplate';

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

export default (props: any) => {
    console.log(props);
    
    // const {loading, error, data} = useQuery(GetLolly, {
    //     variables: {
    //         lollyPath: props.lollyPath
    //     }
    // });

    // if (loading) {
    //    return <h1>Loading...</h1>
    // }

    // if (error) {
    //     return <h1>Error Try again</h1>
    // }

    // if (data) {
    //     console.log(data);
        
    return (
        <div>
            {/* <LollyTemplate <LollyTemplate c1={c1} c2={c2} c3={c3} msg={msg} sender={sender} receiver={receiver} lollyPath={id}/>     */}
        </div>
    )
    // }
}
