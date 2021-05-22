import { useQuery, gql } from '@apollo/client';
import React from 'react'
import LollyTemplate from '../components/LollyTemplate';

const GetLolly_by_path = gql`
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

export default ({location}) => {

    if (typeof window !== "undefined") {
        var refresh = window.localStorage.getItem('refresh');
        if (refresh === null) {
            window.location.reload();
            window.localStorage.setItem('refresh', "1");
        }
    }
    const path = location.pathname.replace("/viewlolly/", "")

    const { loading, error, data } = useQuery(GetLolly_by_path, {
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
            <LollyTemplate c1={data.getLolly.c1} c2={data.getLolly.c2} c3={data.getLolly.c3} msg={data.getLolly.msg} sender={data.getLolly.sender} receiver={data.getLolly.receiver} lollyPath={data.getLolly.lollyPath} />
        )
    }
}
