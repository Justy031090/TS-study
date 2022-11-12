import { useTypedSelector } from '../hooks/useTypedSelector';

const CellList: React.FC = () => {
    useTypedSelector((state) => state);
    return <div>CellList</div>;
};

export default CellList;
