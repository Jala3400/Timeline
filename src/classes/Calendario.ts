import { get } from 'svelte/store';
import { lookDate } from '../lib/ManageEvents';
import { calendars, currentDetails, currentEvent, eventsList } from '../store';
import { Evento } from "./Evento";

/**
 * Clase que representa un calendario.
*/
export class Calendario {
    name: string;
    color: string;
    events: Evento[];
    description: string;
    selected: boolean = true;

    constructor(color: string = "#FF0000", events: Evento[] = [], name: string, description: string = "") {
        this.color = color;
        this.events = events;
        this.name = name;
        this.description = description;
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
     * Método getter para la propiedad name.
     * @returns El nombre del calendario.
     */
    get getName(): string {
        return this.name;
    }

    /**
     * Método setter para la propiedad name.
     * @param name El nuevo nombre para el calendario.
     */
    set setName(name: string) {
        this.name = name;
    }
    /**
     * Método getter para la propiedad description.
     * @returns La descripción del calendario.
     */
    get getDescription(): string {
        return this.description;
    }

    /**
     * Método setter para la propiedad description.
     * @param description La nueva descripción para el calendario.
     */
    set setDescription(description: string) {
        this.description = description;
    }

    /**
     * Método getter para la propiedad selected.
     * @returns El valor de la propiedad selected.
     */
    get isSelected(): boolean {
        return this.selected;
    }

    /**
     * Método setter para la propiedad selected.
     * @param selected El nuevo valor para la propiedad selected.
     */
    set setSelected(selected: boolean) {
        this.selected = selected;
    }

    /**
     * Método que convierte un objeto JSON en un objeto de la clase Calendar.
     * @param json Objeto JSON que representa un calendario.
     * @returns Objeto de la clase Calendar.
     */
    static fromJSON(json: any): Calendario {
        let calendar = Object.create(Calendario.prototype);
        return Object.assign(calendar, json, {
            events: json.events.map((event: any) => Evento.fromJSON(event, calendar))
        });
    }

    /** 
     * Método que añade un evento al calendario.
     * @param event Evento a añadir.
    */
    addEvent(event: Evento) {
        this.events.splice(
            lookDate(event.date, this.events),
            0,
            event
        );
        currentDetails.set("event");
        currentEvent.set(event);
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
        currentEvent.set(get(eventsList)[0]);
        calendars.update((value) => {
            this.tempDeleteEvent(event);
            return value
        })
    }
}