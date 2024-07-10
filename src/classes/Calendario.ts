import { get } from 'svelte/store';
import { calendars, currentCalendar, currentDetails, currentEvent, eventsList } from '../store';
import { Evento } from "./Evento";
import { ListaKanban } from './ListaKanban';

/**
 * Clase que representa un calendario.
*/
export class Calendario {
    name: string;
    color: string;
    kanbanLists: ListaKanban[];
    defaultList: ListaKanban;
    description: string;
    selected: boolean = true;

    constructor(color: string = "#FF0000", kanbanLists: ListaKanban[] = [], name: string, description: string = "") {
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
    get getKanbanLists(): ListaKanban[] {
        return this.kanbanLists;
    }

    /**
     * Método setter para la propiedad kanbanLists.
     * @param kanbanLists Las nuevas listas kanban para el calendario.
     */
    set setKanbanLists(kanbanLists: ListaKanban[]) {
        this.kanbanLists = kanbanLists;
        this.defaultList = kanbanLists[0];
    }

    /**
     * Método getter para la propiedad defaultList.
     * @returns La lista kanban por defecto del calendario.
     */
    get getDefaultList(): ListaKanban {
        return this.defaultList;
    }

    /**
     * Método setter para la propiedad defaultList.
     * @param defaultList La nueva lista kanban por defecto para el calendario.
     */
    set setDefaultList(defaultList: ListaKanban) {
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
            kanbanLists: json.kanbanLists.map((list: any) => ListaKanban.fromJSON(list, calendar))
        });
        calendar.defaultList = calendar.kanbanLists.find((list: any) => list.name === json.defaultList.name);
        return calendar;
    }

    /**
     * Método que añade un evento al calendario sin actualizar nada.
     * @param event Evento a añadir.
    */
    tempAddEvent(event: Evento) {
        event.kanbanList.tempAddEvent(event);
    }

    /** 
     * Método que añade un evento al calendario.
     * @param event Evento a añadir.
    */
    addEvent(event: Evento) {
        this.tempAddEvent(event);
        currentDetails.set("event");
        currentEvent.set(event);
        currentCalendar.set(this);
    }

    /**
     * Método que elimina un evento del calendario sin actualizar nada.
     * @param event Evento a eliminar.
    */
    tempDeleteEvent(event: Evento) {
        event.kanbanList.tempDeleteEvent(event);
    }

    /**
 * Método que añade una lista kanban al calendario sin actualizar nada.
 * @param kanbanList Lista kanban a añadir.
 */
    tempAddKanbanList(kanbanList: ListaKanban) {
        this.kanbanLists.push(kanbanList);
    }

    /**
     * Método que añade una lista kanban al calendario.
     * @param kanbanList Lista kanban a añadir.
     */
    addKanbanList(kanbanList: ListaKanban) {
        this.tempAddKanbanList(kanbanList);
        currentCalendar.update((value) => { return value });
    }

    /**
 * Método que elimina una lista kanban del calendario sin actualizar nada.
 * @param kanbanList Lista kanban a eliminar.
 */
    tempDeleteKanbanList(kanbanList: ListaKanban) {
        const index = this.kanbanLists.indexOf(kanbanList);
        if (index !== -1) {
            this.kanbanLists.splice(index, 1);
        }
        this.defaultList = this.kanbanLists[0];
    }

    /**
     * Método que elimina una lista kanban del calendario y actualiza los eventos.
     * @param kanbanList Lista kanban a eliminar.
     */
    deleteKanbanList(kanbanList: ListaKanban) {
        if (this.kanbanLists.length == 1) {
            return false;
        }
        this.tempDeleteKanbanList(kanbanList);
        currentCalendar.set(this);
        return true;
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

    /**
     * Método que devuelve el primer evento del calendario, tenga o no fecha.
     * @returns El primer evento del calendario.
     */
    getFirstEvent(): Evento {
        const events = this.kanbanLists.reduce((acc: Evento[], list) =>
            acc.concat(list.events), []);
        return events[0] ?? new Evento("new event", "", this.defaultList);
    }
}