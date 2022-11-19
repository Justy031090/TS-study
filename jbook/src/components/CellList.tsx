import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import './cell-list.css';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div className='cell-list'>
            <AddCell prevCellId={null} forceVisible={cells.length === 0} />
            {renderedCells}
        </div>
    );
};

export default CellList;
