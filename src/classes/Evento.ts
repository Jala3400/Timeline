import { get } from 'svelte/store';
import { calendars, currentEvent, eventsList } from '../store';

/**
 * Clase que representa un evento.
 */
export class Evento {
    title: string;
    date: string;
    description: string;
    calendar: string

    constructor(title: string = "new event", date: Date | string = new Date, description: string = "", calendar: string) {
        this.title = title;
        this.date = new Date(date).toISOString();
        this.description = description;
        this.calendar = calendar;
    }

    /**
     * Método getter para la propiedad title.
     * @returns El título del evento.
     */
    get getTitle(): string {
        return this.title;
    }

    /**
     * Método setter para la propiedad title.
     * @param title El nuevo título del evento.
     */
    set setTitle(title: string) {
        this.title = title;
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
    get getCalendar(): string {
        return this.calendar;
    }

    /**
     * Método setter para la propiedad calendar.
     * @param calendar El nuevo calendario del evento.
     */
    set setCalendar(calendar: string) {
        this.calendar = calendar;
    }

    /**
     * Método que convierte un objeto JSON en un objeto de la clase Evento.
     * @param json Objeto JSON que representa un evento.
     * @returns Objeto de la clase Evento.
     */
    static fromJSON(json: any): Evento {
        let evento = Object.create(Evento.prototype);
        return Object.assign(evento, json);
    }

    /**
     * Método que cambia el calendario de un evento y actualiza los calendarios.
     * @param calendar 
     */
    changeCalendar(calendar: string) {
        calendars.update((value) => {
            value[this.calendar].tempDeleteEvent(this);
            value[calendar].addEvent(this);
            return value;
        })
        currentEvent.update((value => {
            value.event.calendar = calendar;
            return value
        }))
        this.calendar = calendar;
    }

    /**
     * Método que actualiza el calendario de un evento.
     */
    updateCalendar(calendar: string) {
        this.calendar = calendar
    }

    /**
     * Método que cambia la fecha de un evento y actualiza los calendarios.
     * @param date 
     */
    changeDate(date: string) {
        get(calendars)[this.calendar].tempDeleteEvent(this);
        this.date = date;
        get(calendars)[this.calendar].addEvent(this);
    }

    /**
     * Método que elimina este evento.
     */
    delete() {
        get(calendars)[this.calendar].deleteEvent(this);
        eventsList.update((value) => {
            const index = value.indexOf(this);
            value.splice(index, 1);
            return value;
        })
    }
}