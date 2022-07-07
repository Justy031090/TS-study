import { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const todoAddHandler = (text: string) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Math.random().toString(), text },
        ]);
    };
    const todoDeleteHandlers = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    };
    return (
        <div className="App">
            <NewTodo onAdd={todoAddHandler} />
            <TodoList items={todos} onDelete={todoDeleteHandlers}></TodoList>
        </div>
    );
}

export default App;
