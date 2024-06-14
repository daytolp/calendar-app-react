import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice'
import { calendarWithActiveEventState, initialState } from '../../fixtures/CalendarStates';
import { calendarWithEventsState, events } from '../../fixtures/CalendarStates';

describe('Pruebas en calendar slice', () => {
    test('Debe regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });
    test('OnSetActiveEvent debe activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe agregar el evento', () => {
        const newEvent = {
                id: '3',
                title: 'Cumpleaños de daniel',
                notes: 'Hay que comprar el pastel',
                start: new Date('2024-06-05 13:00:00'),
                end: new Date('2024-06-05 15:00:00'),
        }

        const state = calendarSlice.reducer(initialState, onAddNewEvent(newEvent));
        expect(state.events[0]).toEqual(newEvent);

    });

    test('onUpdateEvent debe actualizar el evento', () => {
        const updateEvent = {
                id: '1',
                title: 'Cumpleaños de mi primo',
                notes: 'Hay que comprar el pastel y las piñatas',
                start: new Date('2024-06-05 13:00:00'),
                end: new Date('2024-06-05 15:00:00'),
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updateEvent));
        expect(state.events).toContain(updateEvent);

    });

    test('onDeleteEvent debe eliminar el evento', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.events.length).toBe(1);
        expect(state.activeEvent).toBeNull();

    });

    test('onLoadEvents debe establecer eventos', () => {     
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);
    });

    test('onLogoutCalendar debe limpiar el estado', () => {     
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    });
});