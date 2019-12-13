import { UPDATE_POINT } from './actionTypes';
export const updatePoint = (data) => {
    return {
        type: UPDATE_POINT,
        payload: data,
        }
}