import React from 'react';
import Header from "../components/Header";
import { Lolly } from "../components/Lolly";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMutation } from "@apollo/client";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { InputBase, TextField } from '@material-ui/core';
import { navigate } from "@reach/router"
import LollyTemplate from '../components/LollyTemplate';
import gql from "graphql-tag";

const addLollyMutation = gql`
    mutation addLolly($receiver: String!, $msg: String!, $sender: String!, $c1: String!, $c2: String!, $c3: String!) {
        addLolly(receiver: $receiver, msg: $msg, sender: $sender, c1: $c1, c2: $c2, c3: $c3) {
            msg
            receiver
            sender
            c1
            c2
            c3
        }
    }
`

const create = () => {

    const [addLolly, { loading }] = useMutation(addLollyMutation)

    const initialValues = {
        c1: '#d323d3',
        c2: "#5823d3",
        c3: "#2384d3",
        receiver: '',
        sender: '',
        msg: ''
    }

    const schema = Yup.object({
        c1: Yup.string(),
        c2: Yup.string(),
        c3: Yup.string(),
        sender: Yup.string()
            .required('Sender name is Required'),
        receiver: Yup.string()
            .required('Reciever name is Required'),
        msg: Yup.string()
            .required('Message is Required'),
    });

    // const lollyPages = (c1: string, c2: string, c3: string, msg: string, sender: string, receiver: string, id: string) => {
    //     return (<LollyTemplate c1={c1} c2={c2} c3={c3} msg={msg} sender={sender} receiver={receiver} lollyPath={id} />)
    // }

    const submitLollyForm = async(c1: string, c2: string, c3: string, msg: string, sender: string, receiver: string) => {
        await addLolly({
            variables: {
                c1, c2, c3, msg, sender, receiver
            }
        }).then((response)=> {
            navigate(`/${response.data.addLolly.lollyPath}`);
            // lollyPages(response.data.addLolly.c1, response.data.addLolly.c2, response.data.addLolly.c3, response.data.addLolly.msg, response.data.addLolly.sender, response.data.addLolly.receiver, response.data.addLolly.lollyPath);
        });
    }

    const Load = () => {
        return (
            <div className="loading">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {loading ?
                <Load />
                :
                null}
            <Header />
            <Formik
                initialValues={
                    initialValues
                }
                validationSchema={
                    schema
                }
                onSubmit={
                    (values, { resetForm }) => {
                        resetForm({
                            values: initialValues
                        });
                        submitLollyForm(values.c1, values.c2, values.c3, values.msg, values.sender, values.receiver);
                    }
                }
            >
                {(formik) => (
                    <Form>
                        <div className="CreateLolly">
                            <div>
                                <Lolly LollyTop={formik.values.c1} LollyMiddle={formik.values.c2} LollyBottom={formik.values.c3} />
                            </div>
                            <div className="inputColor">
                                <Field as={InputBase} className="colorPick" type="color" name="c1" label="flavour Top" />
                                <Field as={InputBase} className="colorPick" type="color" name="c2" label="flavour Middle" />
                                <Field as={InputBase} className="colorPick" type="color" name="c3" label="flavour Bottom" />
                            </div>
                            <div className="lollyForm">
                                <Field className="inputs" helperText={formik.touched.receiver ? formik.errors.receiver : ""} error={formik.touched.receiver && Boolean(formik.errors.receiver)} name="receiver" type="text" as={TextField} label="To" variant="outlined" />
                                <br />
                                <Field className="inputs" multiline={true} rows={4} helperText={formik.touched.msg ? formik.errors.msg : ""} error={formik.touched.msg && Boolean(formik.errors.msg)} name="msg" type="text" as={TextField} label="Say Something..." variant="outlined" />
                                <br />
                                <Field className="inputs" helperText={formik.touched.sender ? formik.errors.sender : ""} error={formik.touched.sender && Boolean(formik.errors.sender)} name="sender" type="text" as={TextField} label="From" variant="outlined" />
                                <br />
                                <input type="submit" name="Create" className="button" />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default create;