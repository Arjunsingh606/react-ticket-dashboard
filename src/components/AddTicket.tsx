import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "../styles/form.css";
import { log } from "console";

interface TicketValues {
    title: string,
    description: string,
    name: string,
    tags: string,
    priority: string,
    date?:string;
}

interface FormValues {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    id: string;
}


const AddTicketSchema = Yup.object().shape({
    UserName: Yup.string().required("Please select user name"),
    title: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Title is required"),
    description: Yup.string()
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Description is required"),
    tags: Yup.string().required("Please select tags"),
    priority: Yup.string().required("Please select priority"),
});

const AddTicket = () => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = (): void => setShow(false);
    const [selectOption, setSelectOption] = useState<FormValues[]>([])
    const [currentDate, setCurrentDate] = useState("");
    const handleShow = (): void => setShow(true);

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }
      let date= getDate()
    
      console.log(currentDate, "date today");
      

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response:Response = await fetch("http://localhost:3001/users");
                const user:FormValues[] = await response.json()
                console.log(user, "users from api")
                setSelectOption(user)
            } catch (error) {
                console.log(error, "error to fecth data");
            }
        }
        getUsers()
    }, [])
    console.log(selectOption, "api data store in state");



    
    const HandleAddTicket = (Values: TicketValues) => {

        const PostTicketData = async () => {
            const data = await fetch("http://localhost:3001/ticket", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Values)
            });
            const formData = data.json();
            console.log(formData, "user data posting on api ");
        }
        PostTicketData();
        setCurrentDate(date);
        console.log("dekhyte hai kya ho raha");
        

    };
    const initialValues: TicketValues = {
        title: "",
        description: "",
        name: "",
        tags: "",
        priority: "",
        date:currentDate
        
    };


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Ticket
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={AddTicketSchema}
                        onSubmit={HandleAddTicket}
                    >
                        {({ errors, touched }) => (

                            // <Form className="signup-form">
                            //     <div className="form-field">
                            //         <label htmlFor="title">Title</label>
                            //         <Field id="title" name="title" placeholder="" />
                            //         {errors.title && touched.title ? (<div className="error-text">{errors.title}</div>) : null}
                            //     </div>

                            //     <div className="form-field">
                            //         <label htmlFor="email">Description</label>
                            //         <Field name="description" id="description" placeholder="" />
                            //         {errors.description && touched.description ? (<div className="error-text">{errors.description}</div>) : null}
                            //     </div>

                            //     <div className="form-field" >
                            //         <label htmlFor="user-name">User Name</label>
                            //         <Field name="user-name" as="select">
                            //             <option value="">Select tags</option>
                            //             <option value="Replace">Replace</option>
                            //         </Field>
                            //         {errors.name && touched.name ? (<div className="error-text">{errors.name}</div>) : null}
                            //     </div>


                            //     <div className="form-field">
                            //         <label htmlFor="tags">Tags</label>
                            //         <Field name="tags" as="select">
                            //             <option value="">Select tags</option>
                            //             <option value="Replace">Replace</option>
                            //             <option value="New">New</option>
                            //             <option value="Issue">Issue</option>
                            //             <option value="Repair">Repair</option>
                            //         </Field>
                            //         {errors.tags && touched.tags ? (<div className="error-text">{errors.tags}</div>) : null}
                            //     </div>
                            //     <div className="form-field">
                            //         <label htmlFor="priority">Priority</label>
                            //         <Field name="priority" as="select">
                            //             <option value="">Select role</option>
                            //             <option value="Admin">Admin</option>
                            //             <option value="User">User</option>
                            //         </Field>
                            //         {errors.priority && touched.priority ? (<div className="error-text">{errors.priority}</div>) : null}
                            //     </div>

                            //     <div className="d-flex">
                            //         <button type="button" onClick={handleClose} className="btn btn-dark">Close</button>
                            //         <button type="submit" className="btn btn-primary">Submit</button>
                            //     </div>

                            // </Form>

                            <Form>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder=""
                                    />
                                    {errors.title && touched.title ? (<div className="error-text">{errors.title}</div>) : null}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formTextarea"
                                >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={2} />
                                    {errors.description && touched.description ? (<div className="error-text">{errors.description}</div>) : null}
                                </Form.Group>
                                <Form.Group className="mb-3"
                                    controlId="formUsername">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Select name="userName" aria-label="formUsername">
                                        <option>Select Name</option>
                                        {
                                            selectOption && selectOption.map((user: FormValues) => {
                                                return <option value={`${user.firstName} ${user.lastName}`} key={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                                            })
                                        }
                                        {errors.name && touched.name ? (<div className="error-text">{errors.name}</div>) : null}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3"
                                    controlId="formTags">
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Select name="tags" aria-label="formTags">
                                        <option>Select Tags</option>
                                        <option value="Replace">Replace</option>
                                        <option value="New">New</option>
                                        <option value="Issue">Issue</option>
                                        <option value="Issue">Repair</option>
                                        {errors.tags && touched.tags ? (<div className="error-text">{errors.tags}</div>) : null}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3"
                                    controlId="formPriority">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Select name="priority" aria-label="formPriority">
                                        <option>Select Priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        {errors.priority && touched.priority ? (<div className="error-text">{errors.priority}</div>) : null}
                                    </Form.Select>
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" onClick={handleShow} >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        )}

                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddTicket;





// <Form className="signup-form">
//     <div className="form-field">
//         <label htmlFor="title">Title</label>
//         <Field id="title" name="title" placeholder="" />
//         {errors.title && touched.title ? (<div className="error-text">{errors.title}</div>) : null}
//     </div>

//     <div className="form-field">
//         <label htmlFor="email">Description</label>
//         <Field name="description" id="description" placeholder="" />
//         {errors.description && touched.description ? (<div className="error-text">{errors.description}</div>) : null}
//     </div>

//     <div className="form-field" >
//         <label htmlFor="user-name">User Name</label>
//         <Field name="user-name" as="select">
//             <option value="">Select tags</option>
//             <option value="Replace">Replace</option>
//         </Field>
//         {errors.name && touched.name ? (<div className="error-text">{errors.name}</div>) : null}
//     </div>


//     <div className="form-field">
//         <label htmlFor="tags">Tags</label>
//         <Field name="tags" as="select">
//             <option value="">Select tags</option>
//             <option value="Replace">Replace</option>
//             <option value="New">New</option>
//             <option value="Issue">Issue</option>
//             <option value="Repair">Repair</option>
//         </Field>
//         {errors.tags && touched.tags ? (<div className="error-text">{errors.tags}</div>) : null}
//     </div>
//     <div className="form-field">
//         <label htmlFor="priority">Priority</label>
//         <Field name="priority" as="select">
//             <option value="">Select role</option>
//             <option value="Admin">Admin</option>
//             <option value="User">User</option>
//         </Field>
//         {errors.priority && touched.priority ? (<div className="error-text">{errors.priority}</div>) : null}
//     </div>

//     <div className="d-flex">
//         <button type="button" onClick={handleClose} className="btn btn-dark">Close</button>
//         <button type="button" className="btn btn-primary">Submit</button>
//     </div>

// </Form>

