import { get } from 'svelte/store';
import { calendars, currentDetails, currentEvent, eventsList } from '../store';
import { Evento } from "./Evento";
import { KanbanList } from './KanbanList';

/**
 * Clase que representa un calendario.
*/
export class Calendario {
    name: string;
    color: string;
    kanbanLists: KanbanList[];
    defaultList: KanbanList;
    description: string;
    selected: boolean = true;

    constructor(color: string = "#FF0000", kanbanLists: KanbanList[] = [], name: string, description: string = "") {
        this.color = color;
        this.kanbanLists = kanbanLists;
        this.defaultList = kanbanLists[0];
        this.name = name;
        this.description = description;
    }

    /**
     * Método que devuelve todos los eventos del calendario ordenados por fecha.
     * @returns Un array de eventos ordenados por fecha.
     */
    getDatedEvents(): Evento[] {
        let events: Evento[] = this.kanbanLists.reduce((acc: Evento[], list) =>
            acc.concat(list.events.filter(
                event => event.date
            ))
            , []);
        events.sort((a, b) => {
            const dateA = new Date(a.date!);
            const dateB = new Date(b.date!);
            return dateA.getTime() - dateB.getTime();
        });
        return events;
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
     * Método getter para la propiedad kanbanLists.
     * @returns Las listas kanban en el calendario.
     */
    get getKanbanLists(): KanbanList[] {
        return this.kanbanLists;
    }

    /**
     * Método setter para la propiedad kanbanLists.
     * @param kanbanLists Las nuevas listas kanban para el calendario.
     */
    set setKanbanLists(kanbanLists: KanbanList[]) {
        this.kanbanLists = kanbanLists;
        this.defaultList = kanbanLists[0];
    }

    /**
     * Método getter para la propiedad defaultList.
     * @returns La lista kanban por defecto del calendario.
     */
    get getDefaultList(): KanbanList {
        return this.defaultList;
    }

    /**
     * Método setter para la propiedad defaultList.
     * @param defaultList La nueva lista kanban por defecto para el calendario.
     */
    set setDefaultList(defaultList: KanbanList) {
        this.defaultList = defaultList;
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
     * Método que convierte un objeto JSON en un objeto de la clase Calendario.
     * @param json Objeto JSON que representa un calendario.
     * @returns Objeto de la clase Calendario.
     */
    static fromJSON(json: any): Calendario {
        let calendar = Object.create(Calendario.prototype);
        calendar = Object.assign(calendar, json, {
            kanbanLists: json.kanbanLists.map((list: any) => KanbanList.fromJSON(list, calendar))
        });
        calendar.defaultList = calendar.kanbanLists[0];
        return calendar;
    }

    /**
     * Método que añade un evento al calendario sin actualizar nada.
     * @param event Evento a añadir.
    */
    tempAddEvent(event: Evento) {
        this.defaultList.tempAddEvent(event);
    }

    /** 
     * Método que añade un evento al calendario.
     * @param event Evento a añadir.
    */
    addEvent(event: Evento) {
        this.tempAddEvent(event);
        currentDetails.set("event");
        currentEvent.set(event);
    }

    /**
     * Método que elimina un evento del calendario sin actualizar nada.
     * @param event Evento a eliminar.
    */
    tempDeleteEvent(event: Evento) {
        event.kanbanList.tempDeleteEvent(event);
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