import React, { useState } from "react";
import Header from "./Header";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Table } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import '../styles/dashboard.css'
import ListDetails from "./ListDetails";
import { Nav, Tab } from 'react-bootstrap';
import AddTicket from "./AddTicket";
import List from "./List";




const Dashboard = () => {





    return (
        <Container fluid style={{ backgroundColor: "#d2d1d6" }}>

            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row >
                <Col className="dashboard-items">
                    <div>  <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Search here..." />
                    </Form.Group></div>

                    <div className="filter-items">
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Control type="Date" placeholder="Search here..." />
                            </Form.Group>
                        </div>
                        <div>  <Form.Select name="Filter" className="filter" aria-label="Default select example">
                            <option>Filter</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select></div>

                        <AddTicket />
                    </div></Col>


            </Row>



        </Container>

    );
};

export default Dashboard;

