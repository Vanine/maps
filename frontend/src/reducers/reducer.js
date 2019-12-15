import { ADD_POINT, SET_POINTS } from '../actions/actionTypes';

let initialState = {
    points: [],
};
export default function pointsList(state = initialState, action) {
    if (action.type === ADD_POINT) {
         return {
             ...state,
             points: [...state.points, action.payload],
         }
    }
    else if (action.type === SET_POINTS) {
    return {
        ...state,
        points: [...state.points, ...action.payload.points],
    }
 }
     return state;
} 