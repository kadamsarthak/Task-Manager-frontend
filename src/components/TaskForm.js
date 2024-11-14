import React, { useState } from 'react';
import { addTask } from '../services/taskService';

const TaskForm = ({ reloadTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ title, description });
    setTitle('');
    setDescription('');
    reloadTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Add Task</button>
    </form>
  );
};

export default TaskForm;
