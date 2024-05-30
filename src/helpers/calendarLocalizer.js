import esES from 'date-fns/locale/en-US'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar';


const locales = {
    'en-ES': esES,
  };
  
 export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  