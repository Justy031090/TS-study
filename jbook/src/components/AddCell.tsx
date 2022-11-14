import './add-cell.css';
import '../hooks/useActions';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
    nextCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
    const { insertCellBefore } = useActions();
    return (
        <div>
            <button onClick={() => insertCellBefore(nextCellId, 'code')}>
                Code
            </button>
            <button onClick={() => insertCellBefore(nextCellId, 'text')}>
                Text
            </button>
        </div>
    );
};

export default AddCell;
