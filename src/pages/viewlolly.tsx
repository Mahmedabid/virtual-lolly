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
            lollyPath
        }
    }
`

export default (props: any) => {

    const { loading, error, data } = useQuery(GetLolly, {
        variables: {
            lollyPath: props.location.search.slice(1)
        }
    });

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error Try again</h1>
    }

    if (data) {

        return (
            <div>
                <LollyTemplate c1={data.getLolly.c1} c2={data.getLolly.c2} c3={data.getLolly.c3} msg={data.getLolly.msg} sender={data.getLolly.sender} receiver={data.getLolly.receiver} lollyPath={data.getLolly.lollyPath} />
            </div>
        )
    }
}
