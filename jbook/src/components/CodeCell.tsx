import { useState } from 'react';
import { bundler } from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundler(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor
                initialValue="console.log('Hello World!')"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
