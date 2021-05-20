import React from "react"
import { navigate } from "@reach/router"
import Header from "../components/Header"
import { CircularProgress } from "@material-ui/core"

const NotFoundPage = ({ location }) => {

    if (location.pathname !== "/") {
        console.log("Site Origin :", location.origin)

        navigate(`/viewlolly${location.pathname}`)
    }

    if (typeof window !== "undefined") {
        window.location.reload()
    }

    return (
        <div>
            <Header />
            <h4 style={{color: 'white'}}>We are getting your lolly....</h4>
            <div className="loading">
                <CircularProgress />
            </div>
        </div>
    )
}
export default NotFoundPage