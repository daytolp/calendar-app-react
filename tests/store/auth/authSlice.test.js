
// import {  } from '../../../src/store/auth/authSlice';
import { auhtSlice, onClearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';


describe('Pruebas en authSlice', () => {
    
    test('debe de regresar el estado inicial', () => {
        expect( auhtSlice.getInitialState() ).toEqual( initialState );
    });

    test('debe de realizar un login', () => {
        
        const state = auhtSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout', () => {
        const state = auhtSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout', () => {
        const errorMessage = 'Credenciales no válidas'
        const state = auhtSlice.reducer( notAuthenticatedState, onLogout(errorMessage) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('debe de limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no válidas'
        const state = auhtSlice.reducer( authenticatedState, onLogout(errorMessage) );
        const newState = auhtSlice.reducer( state, onClearErrorMessage() )

        expect( newState.errorMessage ).toBe( undefined );
        
    });

});