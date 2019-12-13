import { ADD_POINT, SET_POINTS, UPDATE_POINT } from '../actions/actionTypes';

let initialState = {
    points: [],
};
export default function pointsList(state = initialState, action) {
    if (action.type === ADD_POINT) {
        action.payload.frequency = 1;
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
   else if (action.type === UPDATE_POINT) {
    [...state.points].find(point => {
        if(point.latitude === action.payload.latitude && point.longitude === action.payload.longitude) {
          point.frequency++;
        }
  });
  return {
      ...state,
      points: [...state.points]
  };
   }
     return state;
} 