import { ADD_POINT } from './actionTypes';
export const addPoint = (data) => {
    return {
        type: ADD_POINT,
        payload: data
    }
}