import { render, screen, fireEvent } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FadDelete"
import { Provider } from "react-redux"
import { store } from "../../../src/store"
import { useCalendarStore } from "../../../src/hooks";

jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en el componente <FabDetele/>', () => {
    const mockStartDeletingEvent = jest.fn();

    beforeEach( ()=> jest.clearAllMocks() );

    test('Debe de mostar correctamente el componente', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });

    test('debe de mostrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect( btn.style.display ).toBe('');
        
    });

    test('debe de llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalledWith();
        
        
    });
})