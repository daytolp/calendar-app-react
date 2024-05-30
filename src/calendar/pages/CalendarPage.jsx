import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../"
import { localizer, getMessagesEs } from "../../helpers"
import { useEffect, useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabDelete } from '../components/FadDelete'
import { useAuthStore } from '../../hooks'


export const CalendarPage = () => {
  const {user} = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents }  = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {
      const isMyEvent = ( user.uid === event.user?._id ) || ( user.uid === event.user?.uid );

      const style = {
        backgroundColor: isMyEvent ? '#347CF7' : '#465660',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
      }
      return {
        style
      }
    }

    const onDoubleClick = (event) => {
      // console.log({doubleClik: event});
      openDateModal();
    }

    const onSelect = (event) => {
      setActiveEvent(event);
      
    }

    const onViewChange = (event) => {
      localStorage.setItem('lastView', event)
      // console.log({viewChange: event});
    }
    
    useEffect(() => {
      startLoadingEvents();    
    }, [])
    


    return(
        <>
          <Navbar/>
          <Calendar
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{event: CalendarEvent}}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
        />
        <CalendarModal/>
        <FabAddNew/>
        <FabDelete/>
        </>        
    )
}