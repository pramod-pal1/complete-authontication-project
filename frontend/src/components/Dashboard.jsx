import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'pending' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch(e) {}

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleLogout();
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/tasks/${editId}`, taskForm);
                setMessage({ type: 'success', text: 'Task updated successfully!' });
            } else {
                await api.post('/tasks', taskForm);
                setMessage({ type: 'success', text: 'Task created successfully!' });
            }
            fetchTasks();
            closeModal();
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Error saving task' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleEdit = (task) => {
        setTaskForm({ title: task.title, description: task.description, status: task.status });
        setEditId(task._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setMessage({ type: 'success', text: 'Task deleted successfully!' });
            fetchTasks();
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to delete task' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const openModal = () => {
        setTaskForm({ title: '', description: '', status: 'pending' });
        setEditId(null);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="dashboard-container">
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            
            <header className="dashboard-header">
                <div>
                    <h2>Welcome, {user?.name} {user?.role === 'admin' && '(Admin)'}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn" style={{ margin: 0 }} onClick={openModal}>+ New Task</button>
                    <button className="btn btn-secondary" style={{ margin: 0 }} onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <div className="tasks-grid">
                {tasks.length === 0 ? (
                    <div style={{ color: '#ccc' }}>No tasks found. Create one to get started!</div>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} className="task-card">
                            <span className={`badge status-${task.status}`}>{task.status.replace('-', ' ')}</span>
                            <h3>{task.title}</h3>
                            <p style={{ margin: '1rem 0', color: '#ddd' }}>{task.description}</p>
                            
                            {user?.role === 'admin' && task.user && task.user.name && (
                                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Created by: {task.user.name}</p>
                            )}

                            <div className="task-actions">
                                <button className="btn btn-secondary" onClick={() => handleEdit(task)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="glass-card" onClick={e => e.stopPropagation()} style={{ margin: '1rem' }}>
                        <h2 className="title">{editId ? 'Edit Task' : 'Create Task'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    value={taskForm.title}
                                    onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={taskForm.description}
                                    onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select 
                                    value={taskForm.status} 
                                    onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
