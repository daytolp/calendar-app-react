import { addHours } from "date-fns";

export const events = [
    {
        id: '1',
        title: 'Cumpleaños de daniel',
        notes: 'Hay que comprar el pastel',
        start: new Date('2024-06-01 13:00:00'),
        end: new Date('2024-06-01 15:00:00'),
    },
    {
        id: '2',
        title: 'Cumpleaños de melissa',
        notes: 'Hay que comprar el pastel',
        start: new Date('2024-06-01 13:00:00'),
        end: new Date('2024-06-01 15:00:00'),
    }
]


export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}