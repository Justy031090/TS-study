import { useState, useEffect } from 'react';
import { bundler } from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(input);
            setCode(output);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="console.log('Hello World!')"
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
