import './add-cell.css';
import '../hooks/useActions';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({ forceVisible, nextCellId }) => {
    const { insertCellBefore } = useActions();
    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button
                    onClick={() => insertCellBefore(nextCellId, 'code')}
                    className="button is-rounded is-primary is-small"
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button
                    onClick={() => insertCellBefore(nextCellId, 'text')}
                    className="button is-rounded is-primary is-small"
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
