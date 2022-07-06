import TodoList from './components/TodoList';
function App() {
    const todos = [
        { id: 't1', text: 'Learn TypeScript' },
        { id: 't2', text: 'Combine React + TypeScript' },
    ];
    return (
        <div className="App">
            <TodoList items={todos}></TodoList>
        </div>
    );
}

export default App;
