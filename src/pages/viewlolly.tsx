import { useQuery, gql } from '@apollo/client';
import { Router } from '@reach/router';
import React from 'react'
import LollyTemplate from '../components/LollyTemplate';

const GetLolly = gql`
    query getLolly($path: String!) {
        getLolly(path: $path) {
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
    console.log(props);
    const path = location.pathname.replace("/viewlolly/", "")

    const { loading, error, data } = useQuery(GetLolly, {
        variables: {
            path
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
                <Router basepath="/viewlolly">
                    <LollyTemplate path={`/${data.getLolly.lollyPath}`} c1={data.getLolly.c1} c2={data.getLolly.c2} c3={data.getLolly.c3} msg={data.getLolly.msg} sender={data.getLolly.sender} receiver={data.getLolly.receiver} lollyPath={data.getLolly.lollyPath} />
                </Router>
            </div>
        )
    }
}
