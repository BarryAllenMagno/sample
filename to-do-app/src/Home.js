import React from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TodoApp from './api/todoapp-api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';


export default function Home() {
    //create to-do variables and functions
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
            loadData();
            console.log(newTask);  
    }

    const cancelChanges = () => {
        handleCancelShow();
    };

    const clearData = () => {
        setTask('');
        setStartDate('');
        setDueDate('');
        setCancelShow(false);
    }
    

    //list all to-do variables and functions
    const [isLoading, setIsLoading] = React.useState(true);
    const [todoList, setTodoList] = React.useState([]);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [id, setId] = React.useState(0);

    useEffect(() => {
        async function fetchData() {
            loadData();
        }
        fetchData();
      }, []);

    async function loadData() {
        const response = await TodoApp.getAll();
          setTodoList(response.data);
          setIsLoading(false);
      }
    function handleCloseConfirm() {
        setShowConfirm(false);
    }

    function handleShow(id) {
        setId(id);
        setShowConfirm(true);
    }

    async function handleDelete() {
        const deleteResult = await TodoApp.delete(id);
        setShowConfirm(false);
        setId(0);
        setIsLoading(true);
        loadData();
        toast.success("Task deleted successfully!");
        console.log(deleteResult);
    }    

    return (
        <> 
            {/*create to-do UI */}
            <div className='row'>
                <div className="p-3 column">
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
                                <Button variant="primary" onClick={clearData}>
                                    Yes
                                </Button>
                        </Modal.Footer>
                    </Modal>

                {/*list all to-do UI */}
                <div className='p-3 column'>
                    <Table striped bordered hover className='table-center text-center'>
                        <thead className='bg-success'>
                            <tr>
                                <th colSpan='4'>
                                    <h3 style={{color: "white"}}>Your To-Do's</h3>
                                </th>
                            </tr>
                        </thead>
                        <thead className='bg-warning'>
                            <tr>
                                <th>Task</th>
                                <th>Date</th>
                                <th>Due Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList.map((todo, index) => 
                                <tr key={index}>
                                    <td>{ todo.task }</td>
                                    <td>{ todo.startDate }</td>
                                    <td>{todo.dueDate}</td>
                                    <td>
                                        {/* <Link to={"/edit/" + todo._id}>
                                            <button className='btn btn-primary me-2'>Edit</button>
                                        </Link> */}
                                        <button className='btn btn-danger' onClick={() => handleShow(todo._id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> 
                    <Modal show={showConfirm} onHide={handleCloseConfirm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirm}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleDelete}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div> 
        </>
    );
}