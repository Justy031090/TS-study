import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, []);

    if (editing) {
        return (
            <div ref={ref} className="text-editor">
                <MDEditor />
            </div>
        );
    }
    return (
        <div onClick={() => setEditing(true)} className="text-editor">
            <MDEditor.Markdown source={'# header'} />
        </div>
    );
};

export default TextEditor;
