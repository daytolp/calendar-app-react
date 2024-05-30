import { createSlice } from '@reduxjs/toolkit';

export const auhtSlice = createSlice({
    name: 'auht',
    initialState: {
        status: 'checking',//not-authenticated, authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state, /* action */ ) => {
            state.status = 'checking';
            state.errorMessage = undefined;
            state.user = {};
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.errorMessage = undefined;
            state.user = payload;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.errorMessage = payload;
            state.user = {};
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onClearErrorMessage } = auhtSlice.actions;