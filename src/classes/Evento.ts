import { calendars, currentCalendar, currentEvent, eventsList } from '../store';
import { Calendario } from './Calendario';
import { dateToString, lookDate } from '../lib/ManageEvents';
import type { EventoFiltro } from './EventoFilltro';
import type { ListaKanban } from './ListaKanban';

/**
 * Clase que representa un evento.
 */
export class Evento {
    name: string;
    date?: string;
    description: string;
    kanbanList: ListaKanban;

    constructor(name: string = "new event", description: string = "", kanbanList: ListaKanban, date?: Date | string) {
        this.name = name;
        if (date) {
            this.date = dateToString(new Date(date));
        } this.description = description;
        this.kanbanList = kanbanList;
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
    get getDate(): string | undefined {
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
     * Método getter para la propiedad kanbanList.
     * @returns La lista kanban del evento.
     */
    get getKanbanList(): ListaKanban {
        return this.kanbanList;
    }

    /**
     * Método setter para la propiedad kanbanList.
     * @param kanbanList La nueva lista kanban del evento.
     */
    set setKanbanList(kanbanList: ListaKanban) {
        this.kanbanList = kanbanList;
    }

    get getCalendar(): Calendario {
        return this.kanbanList.calendar;
    }

    /**
     * Método que convierte un objeto JSON en un objeto de la clase Evento.
     * @param json Objeto JSON que representa un evento.
     * @returns Objeto de la clase Evento.
     */
    static fromJSON(json: any, kanbanList: ListaKanban): Evento {
        let evento = Object.create(Evento.prototype);
        Object.assign(evento, json);
        evento.kanbanList = kanbanList;
        return evento;
    }

    /**
     * Método que cambia el calendario de un evento y actualiza los calendarios.
     * @param targList 
     */
    changeKanbanist(targList: ListaKanban) {
        currentCalendar.update((value) => {
            this.kanbanList.tempDeleteEvent(this);
            targList.tempAddEvent(this);
            return value;
        })
        currentEvent.update((value => {
            value.kanbanList = targList;
            return value
        }))
        this.kanbanList = targList;
    }

    /**
     * Método que cambia el calendario de un evento y actualiza los calendarios.
     * @param calendar 
     */
    changeCalendar(calendar: Calendario) {
        const index = calendar.kanbanLists.findIndex((list) => list.name === this.kanbanList.name);
        if (index !== -1) {
            this.kanbanList = calendar.kanbanLists[index];
        } else {
            this.kanbanList = calendar.defaultList;
        }
        calendars.update((value) => {
            return value;
        });
        currentEvent.update((value) => {
            return value;
        });
    }

    /**
     * Método que cambia la fecha de un evento y actualiza los calendarios.
     * @param date 
     */
    changeDate(date: string) {
        this.date = date;
        eventsList.update((value) => {
            value.splice(value.indexOf(this), 1);
            value.splice(lookDate(date, value), 0, this);
            return value;
        });
        currentEvent.update((value) => {
            return value;
        });
        currentCalendar.update((value) => {
            return value;
        });
    }

    /**
     * Método que elimina este evento.
     */
    delete() {
        this.kanbanList.tempDeleteEvent(this);
        currentEvent.update((value) => { return this.kanbanList.events[0] });
        eventsList.update((value) => value.filter((event) => event !== this));
        currentCalendar.update((value) => { return value });
    }

    pasaFiltro(filtro: EventoFiltro) {
        return (
            this.pasaFiltroSuave(filtro)
            && (!filtro.filtByDate
                || (
                    this.date && new Date(this.date) >= new Date(filtro.startDate)
                    && this.date && new Date(this.date) <= new Date(filtro.endDate)
                ))
        )
    }
    pasaFiltroSuave(filtro: EventoFiltro) {
        return this.getCalendar.selected && (this.name.includes(filtro.name) || filtro.name == "")
    }
}