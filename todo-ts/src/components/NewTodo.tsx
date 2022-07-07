import React, { useRef } from 'react';

type NewTodoProps = {
    onAdd: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAdd(enteredText);
    };
    return (
        <form onSubmit={todoSubmitHandler}>
            <div>
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInputRef} />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default NewTodo;
