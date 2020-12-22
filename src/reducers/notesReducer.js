/*
{
    notes: [],
    active: null,
    active: {
        id: 'ADAGADGAD232424KJK',
        title: '',
        body: '',
        imageUrl: '';
        date: 1212121212;
    }
}
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.note.id
                        ? action.payload.note
                        : note
                )
            }

        default:
            return state;
    }
}