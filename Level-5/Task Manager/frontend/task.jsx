import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Task.module.css";


const API_URL = "http://localhost:5000/tasks";

function Task() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Work");
    const [dueDate, setDueDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState({ name: "", category: "", dueDate: "" });

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    function addTask() {
        if (name.trim() !== "" && dueDate !== "") {
            const newTask = { name, category, dueDate };
            axios.post(API_URL, newTask)
                .then(res => setTasks(prev => [...prev, res.data]))
                .catch(err => console.error(err));

            setName("");
            setDueDate("");
            setCategory("Work");
        }
    }

    function Delete(id) {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTasks(prev => prev.filter(task => task._id !== id)))
            .catch(err => console.error(err));
    }

    function startEdit(index, task) {
        setEditIndex(index);
        setEditTask(task);
    }

    function Update(id) {
        if (editTask.name.trim() !== "" && editTask.dueDate !== "") {
            axios.put(`${API_URL}/${id}`, editTask)
                .then(res => {
                    setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
                    setEditIndex(null);
                    setEditTask({ name: "", category: "", dueDate: "" });
                })
                .catch(err => console.error(err));
        }
    }

    const filteredTasks = tasks.filter(t =>
        t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.taskManager}>
            <h1>Task Manager</h1>

            <input
                type="text"
                className={styles.searchBox}
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className={styles.taskInput}>
                <input
                    type="text"
                    className={styles.taskName}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter a Task..."
                />
                <select className={styles.taskCategory} onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Others">Others</option>
                </select>
                <input type="date" className={styles.taskDate} onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                <button className={styles.addBtn} onClick={addTask}>Add</button>
            </div>

            <ul className={styles.taskList}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((t, index) => (
                        <li key={t._id} className={styles.taskItem}>
                            {editIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        className={styles.editName}
                                        value={editTask.name}
                                        onChange={(e) =>
                                            setEditTask({ ...editTask, name: e.target.value })
                                        }
                                    />
                                    <select
                                        className={styles.editCategory}
                                        value={editTask.category}
                                        onChange={(e) =>
                                            setEditTask({ ...editTask, category: e.target.value })
                                        }
                                    >
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <input
                                        type="date"
                                        className={styles.editDate}
                                        value={editTask.dueDate}
                                        onChange={(e) =>
                                            setEditTask({ ...editTask, dueDate: e.target.value })
                                        }
                                    />
                                    <button className={styles.saveBtn} onClick={() => Update(t._id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className={styles.taskDetails}>{t.name} - {t.category} (Due: {t.dueDate})</span>
                                    <button className={styles.deleteBtn} onClick={() => Delete(t._id)}>Delete</button>
                                    <button className={styles.editBtn} onClick={() => startEdit(index, t)}>Edit</button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p className={styles.noTasks}>No tasks found</p>
                )}
            </ul>
        </div>
    );
}

export default Task;
