import { SET_POINTS } from './actionTypes';
export const setPoints = (data) => {
    return {
        type: SET_POINTS,
        payload: data,
        }
}