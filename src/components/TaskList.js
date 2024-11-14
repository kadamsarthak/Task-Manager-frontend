import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task); 
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <TaskForm reloadTasks={loadTasks} />
      <ul className="list-group mt-3">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => handleTaskClick(task)} style={{ cursor: 'pointer' }}>
              {task.title}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

     
      {selectedTask && (
        <div className="mt-3">
          <h4>Description:</h4>
          <h5>{selectedTask.title}</h5>
          <p>{selectedTask.description}</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
