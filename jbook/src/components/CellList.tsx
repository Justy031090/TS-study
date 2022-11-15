import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <AddCell nextCellId={cell.id} />
            <CellListItem cell={cell} />
        </Fragment>
    ));

    return (
        <div>
            {renderedCells}
            <AddCell nextCellId={null} forceVisible={cells.length === 0} />
        </div>
    );
};

export default CellList;
