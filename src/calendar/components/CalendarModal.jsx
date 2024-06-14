import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import './calendarModal.css';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { getEnvVariables } from '../../helpers';

  registerLocale('es', es)
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  if (getEnvVariables().VITE_MODE !== 'test')
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('#root');
export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [isFormSutmitted, setIsFormSutmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'Fidel',
        notes: 'López',
        start: new Date(),
        end: addHours(new Date(), 2)
    });
    
    const titleClass = useMemo(() => {
        if (!isFormSutmitted) return '';
        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
    }, [formValues.title, isFormSutmitted]);

    const { activeEvent, startSavingEvent } = useCalendarStore();


    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

    }

    const onCloseModal = () => {
        console.log("Cerrando!")
        closeDateModal();
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setIsFormSutmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }
        if (formValues.title.length <= 0) {
            Swal.fire('Título incorrecto', 'Revisar el título ingresado', 'error');
            return;
        }

        await startSavingEvent(formValues);
        closeDateModal();
        setIsFormSutmitted(false);
    }

    useEffect(() => {
        if (activeEvent !== null) {
            const { title, start, end, notes } = activeEvent;
            setFormValues({ title, start, end, notes });
        }
           
    }, [activeEvent])


    return (
        <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">
                <div className="form-group col-12 mb-2">
                    <div className="row">
                       <label className="control-label">Fecha y hora inicio</label>
                    </div>
                    {/* <div className="row"> */}
                        <DatePicker className="form-control" selected={formValues.start} onChange={(date) => onDateChanged(date,'start')} dateFormat='Pp' showTimeSelect
                        locale='es'  timeCaption='Hora'/>
                    {/* </div> */}
                </div>

                <div className="form-group col-12 mb-2">
                    <div className="row">
                         <label className="control-label">Fecha y hora fin</label>
                    </div>                    
                    <DatePicker className="form-control" minDate={formValues.start} selected={formValues.end} onChange={(date) => onDateChanged(date, 'end')} dateFormat='Pp'
                    showTimeSelect locale='es' timeCaption='Hora'/>
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button onClick={ onSubmit }
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}