import { get } from 'svelte/store';
import { insEvent, updateEvents } from '../lib/ManageEvents';
import { calendars, currentDetails, currentEvent, eventsList, selectedCalendars } from '../store';
import { Evento } from "./Evento";

/**
 * Clase que representa un calendario.
*/
export class Calendario {
    color: string;
    events: Evento[];

    constructor(color: string = "#FF0000", events: Evento[] = []) {
        this.color = color;
        this.events = events;
    }

    /**
     * Método getter para la propiedad color.
     * @returns El color del calendario.
     */
    get getColor(): string {
        return this.color;
    }

    /**
     * Método setter para la propiedad color.
     * @param color El nuevo color para el calendario.
     */
    set setColor(color: string) {
        this.color = color;
    }

    /**
     * Método getter para la propiedad events.
     * @returns Los eventos en el calendario.
     */
    get getEvents(): Evento[] {
        return this.events;
    }

    /**
     * Método setter para la propiedad events.
     * @param events Los nuevos eventos para el calendario.
     */
    set setEvents(events: Evento[]) {
        this.events = events;
    }
    /**
     * Método que convierte un objeto JSON en un objeto de la clase Calendar.
     * @param json Objeto JSON que representa un calendario.
     * @returns Objeto de la clase Calendar.
     */
    static fromJSON(json: any): Calendario {
        let calendar = Object.create(Calendario.prototype);
        return Object.assign(calendar, json, {
            events: json.events.map((event: any) => Evento.fromJSON(event))
        });
    }

    /** 
     * Método que añade un evento al calendario.
     * @param event Evento a añadir.
    */
    addEvent(event: Evento) {
        this.events.splice(
            insEvent(event.date, this.events),
            0,
            event
        );
        if (get(selectedCalendars).includes(event.calendar)) {
            updateEvents();
        } else {
            selectedCalendars.update((value) => [...value, event.calendar]) // It also updates events
        }
        currentDetails.set("event");
        currentEvent.set({ event: event, index: get(eventsList).indexOf(event) });
    }

    /**
     * Método que elimina un evento del calendario sin actualizar nada.
     * @param event Evento a eliminar.
    */
    tempDeleteEvent(event: Evento) {
        const index = this.events.indexOf(event);
        this.events.splice(index, 1);
    }

    /**
     * Método que elimina un evento del calendario y actualiza los eventos.
     * @param event Evento a eliminar.
    */
    deleteEvent(event: Evento) {
        currentDetails.set("allCalendars");
        currentEvent.set({ event: get(eventsList)[0], index: 0 })
        calendars.update((value) => {
            this.tempDeleteEvent(event);
            return value
        })
    }
}