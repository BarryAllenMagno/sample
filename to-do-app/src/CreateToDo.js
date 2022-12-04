import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateToDo() {
    const [task, setTask] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [errShow, setErrShow] = React.useState(false);
    const [cancelShow, setCancelShow] = React.useState(false);

    const handleTaskNameChange = (e) => {
        setTask(e.target.value);
    }

    function handleCancelClose() {
        setCancelShow(false);
    }

    function handleCancelShow(){
        setCancelShow(true);
    }

    function handleErrClose() {
        setErrShow(false);
    }

    function handleErrShow() {
        setErrShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleShowSaveConfirm() {
        if (task === "" || startDate === "" || dueDate === "") {
            handleErrShow();
            setShow(false);
        }
        else {
            setShow(true);
        }
    }

    async function saveData () {
            var inputData = {
                task: task,
                startDate: startDate.toDateString(),
                dueDate: dueDate.toDateString()
            };
            var newTask = await axios.post("http://localhost:3001", inputData);
            clearData();
            setShow(false);
            toast.success("Task Added Successfully");
            console.log(newTask);  
    }

    const cancelChanges = () => {
        handleCancelShow();
    };

    const clearData = () => {
        setTask('');
        setStartDate('');
        setDueDate('');
    }

    return (
        <>
            <div className="p-3">
                <Link to={"/"}>
                    <button className='btn btn-primary mb-3'>
                        View All
                    </button>
                </Link>
                <div className="card text-center">
                    <div className="card-header bg-success">
                        <h3 style={{color: 'white'}}>Create To Do</h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Enter your task here</label>
                            <input value={task} onChange={handleTaskNameChange} type="text" className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            {/* <input value={date} onChange={handleStartDateChange} type="date" className="form-control" required/> */}
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Due Date</label>
                            {/* <input value={dueDate} onChange={handleDueDateChange} type="date" className="form-control" required/> */}
                            <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)}  className="form-control" />
                        </div>
                        <Button onClick={handleShowSaveConfirm} className="me-2">Save</Button>
                        <Button onClick={cancelChanges} className="btn btn-secondary">Cancel</Button>
                        <br/>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to add this task?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={saveData}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={errShow} onHide={handleErrClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please fill in all fields!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleErrClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={cancelShow} onHide={handleCancelClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Cancel progress?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelClose}>
                            No
                        </Button>
                        <Link to={"/"}>
                            <Button variant="primary">
                                Yes
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
        </>
    );
}