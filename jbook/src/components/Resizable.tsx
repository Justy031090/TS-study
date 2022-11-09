import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            resizeHandles: ['e'],
            height: Infinity,
            width: window.innerWidth * 0.75,
            maxConstraints: [window.innerWidth * 0.75, Infinity],
            minConstraints: [window.innerWidth * 0.2, Infinity],
        };
    } else {
        resizableProps = {
            resizeHandles: ['s'],
            height: 300,
            width: Infinity,
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            minConstraints: [Infinity, 24],
        };
    }
    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
