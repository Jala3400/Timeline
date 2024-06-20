import { calendars, currentEvent, eventsList } from '../store';
import { Calendario } from './Calendario';
import { lookDate } from '../lib/ManageEvents';
import type { EventoFiltro } from './EventoFilltro';

/**
 * Clase que representa un evento.
 */
export class Evento {
    name: string;
    date: string;
    description: string;
    calendar: Calendario;

    constructor(name: string = "new event", date: Date | string = new Date, description: string = "", calendar: Calendario = new Calendario("#FF0000", [], "default")) {
        this.name = name;
        this.date = new Date(date).toISOString();
        this.description = description;
        this.calendar = calendar;
    }

    /**
     * Método getter para la propiedad name.
     * @returns El título del evento.
     */
    get getName(): string {
        return this.name;
    }

    /**
     * Método setter para la propiedad name.
     * @param name El nuevo título del evento.
     */
    set setName(name: string) {
        this.name = name;
    }

    /**
     * Método getter para la propiedad date.
     * @returns La fecha del evento.
     */
    get getDate(): string {
        return this.date;
    }

    /**
     * Método setter para la propiedad date.
     * @param date La nueva fecha del evento.
     */
    set setDate(date: string) {
        this.date = date;
    }

    /**
     * Método getter para la propiedad description.
     * @returns La descripción del evento.
     */
    get getDescription(): string {
        return this.description;
    }

    /**
     * Método setter para la propiedad description.
     * @param description La nueva descripción del evento.
     */
    set setDescription(description: string) {
        this.description = description;
    }

    /**
     * Método getter para la propiedad calendar.
     * @returns El calendario del evento.
     */
    get getCalendar(): Calendario {
        return this.calendar;
    }

    /**
     * Método setter para la propiedad calendar.
     * @param calendar El nuevo calendario del evento.
     */
    set setCalendar(calendar: Calendario) {
        this.calendar = calendar;
    }

    /**
     * Método que convierte un objeto JSON en un objeto de la clase Evento.
     * @param json Objeto JSON que representa un evento.
     * @returns Objeto de la clase Evento.
     */
    static fromJSON(json: any, calendar: Calendario): Evento {
        let evento = Object.create(Evento.prototype);
        Object.assign(evento, json);
        evento.calendar = calendar;
        return evento;
    }

    /**
     * Método que cambia el calendario de un evento y actualiza los calendarios.
     * @param targCalendar 
     */
    changeCalendar(targCalendar: Calendario) {
        calendars.update((value) => {
            this.calendar.tempDeleteEvent(this);
            targCalendar.tempAddEvent(this);
            return value;
        })
        currentEvent.update((value => {
            value.calendar = targCalendar;
            return value
        }))
        this.calendar = targCalendar;
    }

    /**
     * Método que cambia la fecha de un evento y actualiza los calendarios.
     * @param date 
     */
    changeDate(date: string) {
        this.calendar.tempDeleteEvent(this);
        this.date = date;
        this.calendar.tempAddEvent(this);
        eventsList.update((value) => {
            value.splice(value.indexOf(this), 1);
            value.splice(lookDate(this.date, value), 0, this);
            return value;
        });
    }

    /**
     * Método que elimina este evento.
     */
    delete() {
        this.calendar.deleteEvent(this);
        eventsList.update((value) => value.filter((event) => event !== this));
    }

    pasaFiltro(filtro: EventoFiltro) {
        return (
            (this.name.includes(filtro.name) || filtro.name == "")
            && (!filtro.filtByDate
                || (
                    new Date(this.date) >= new Date(filtro.startDate)
                    && new Date(this.date) <= new Date(filtro.endDate)
                ))
        )
    }
}