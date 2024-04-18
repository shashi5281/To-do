import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup, FormControl, ListGroup, Dropdown } from 'react-bootstrap';
import axios from 'axios'
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('daily');

const isFocused = useSelector((state) => state.focus.isFocused);

  const handleAddTodo = () => {
    console.log("hitting handler" , category)
    axios.post('http://localhost:3001/add',{input:input ,category:category})
    .then(result => getTodo())
    .catch(err => console.log(err))
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, Dropdown:category, completed: false }]);
      setInput('');
    }
  };

   function getTodo(){
    axios.get('http://localhost:3001/get')
    .then(result=> setTodos(result.data))
    .catch(err =>console.log(err))
  }
  useEffect(()=>{
    getTodo()
  },[])

  const handleToggleTodo = (id) => {
    axios.put('http://localhost:3001/update/'+id)
    .then(result => {
      getTodo()
    })
    .catch(err => console.log(err))
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleDeleteTodo = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result =>getTodo())
    .catch(err => console.log(err))
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = (category) => todos.filter(todo => todo.category === category);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Todo List</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add a new todo"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isFocused}
        />
        <Dropdown onSelect={setCategory} className="ml-2" disabled={isFocused}>
          <Dropdown.Toggle variant="outline-secondary" id="category-dropdown" disabled={isFocused}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="daily">Daily</Dropdown.Item>
            <Dropdown.Item eventKey="weekly">Weekly</Dropdown.Item>
            <Dropdown.Item eventKey="monthly">Monthly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleAddTodo} disabled={isFocused}>Add Todo</Button>
      </InputGroup>
      
      {['daily', 'weekly', 'monthly'].map((cat) => (
        <div key={cat}>
          <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)} Tasks</h3>
          <ListGroup>
            {console.log("todos>>>>>" ,todos)}
            {filteredTodos(cat).map(todo => (
              <ListGroup.Item 
                key={todo._id} 
                className={`d-flex justify-content-between align-items-center ${todo.completed ? 'text-decoration-line-through' : ''}`}
              >
                {todo.input}
                <div>
                  <Button variant="success" size="sm" onClick={() => handleToggleTodo(todo._id)} className="mr-2">Completed</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteTodo(todo._id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
