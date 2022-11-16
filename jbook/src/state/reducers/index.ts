import cellsReducer from './cellsReducer';
import bundlesReudcer from './bundlesReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReudcer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
