import type { Calendario } from "./Calendario";
import { Evento } from "./Evento";

/* 
    Clase que representa una lista de un diagrama kanban 
*/
export class KanbanList {
    name: string;
    events: Evento[];
    calendar: Calendario;
    collapsed: boolean = false;

    constructor(events: Evento[] = [], name: string, calendar: Calendario) {
        this.events = events;
        this.name = name;
        this.calendar = calendar;
    }

    tempAddEvent(event: Evento) {
        this.events.push(event);
    }

    tempDeleteEvent(event: Evento) {
        this.events = this.events.filter(e => e !== event);
    }

    /**
     * Método que convierte un objeto JSON en un objeto de la clase KanbanList.
     * @param json Objeto JSON que representa una KanbanList.
     * @returns Objeto de la clase KanbanList.
     */
    static fromJSON(json: any, calendar: Calendario): KanbanList {
        let kanbanList = Object.create(KanbanList.prototype);
        kanbanList = Object.assign(kanbanList, json, {
            events: json.events.map((event: any) => Evento.fromJSON(event, kanbanList))
        });
        kanbanList.calendar = calendar;
        return kanbanList;
    }

}