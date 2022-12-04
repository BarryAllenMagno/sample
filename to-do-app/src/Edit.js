import React from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Edit() {
    const [task, setTask] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');

    const handleTaskNameChange = (e) => {
        setTask(e.target.value);
    }

    return (
        <div className="p-3">
            <div className="card text-center">
                <div className="card-header bg-info">
                    <h3>Edit To Do</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Enter your task here</label>
                        <input value={task} onChange={handleTaskNameChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Due Date</label>
                        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)}  className="form-control" />
                    </div>
                    <Button className="me-2">Update</Button>
                    <Button className="btn btn-secondary">Cancel</Button>
                </div>
            </div>
        </div>
    );
}