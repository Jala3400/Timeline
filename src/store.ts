import { get, readable, writable, type Writable } from 'svelte/store';
import { Calendario } from './classes/Calendario';
import { Evento } from './classes/Evento';
import { EventoFiltro } from './classes/EventoFilltro';
import { parse, stringify } from 'flatted';
import { dateToString } from './lib/ManageEvents';
import { ListaKanban } from './classes/ListaKanban';

//* Configuration

// Conf - Mutable
const existingConfiguration = JSON.parse(localStorage.getItem("configuration") ?? JSON.stringify({ mainColor: "#00FF80" }))

export const configuration = writable(existingConfiguration);

configuration.subscribe((value) => {
    localStorage.setItem("configuration", JSON.stringify(value));
})

// Conf - Constant

const existingConstants = JSON.parse(
    //Todo: Uncomment bellow
    // localStorage.getItem("constants") ?? 
    JSON.stringify({ transparency: { low: "25%", main: "37.5%", hover: "56.25%", active: "66.4%", full: "100%" }, transparencyApp: { none: "0%", light: "6.25%", main: "11.4%", hover: "17.6%", active: "21.1%" }, discreteColor: "#FFFFFF", dateColors: { good: "#00FF80", close: "#FFFF00", urgent: "#ff00FF", overdue: "#FF0000" } })
    // En hexadecimal
    // JSON.stringify({ transparency: { low: "40", main: "60", hover: "90", active: "AA", full: "FF" }, transparencyApp: { none: "00", light: "0A", main: "1C", hover: "2d", active: "36" }, discreteColor: "#FFFFFF", dateColors: { good: "#00FF80", close: "#FFFF00", urgent: "#ff00FF", overdue: "#FF0000" } })
)

export const constants = readable(existingConstants);

constants.subscribe((value) => {
    localStorage.setItem("constants", JSON.stringify(value));
})

//* Events list
// Temporary default events
export const eventsList: Writable<Evento[]> = writable([])

//* Existing calendars

const defaultCalendar = new Calendario("#FF0000", [], "default");
const testCalendar = new Calendario("#FF00FF", [], "test");

const defaultKanbanList = new ListaKanban([], "default", defaultCalendar);
const testKanbanList = new ListaKanban([], "test", testCalendar);

defaultCalendar.setKanbanLists = [defaultKanbanList];
testCalendar.setKanbanLists = [testKanbanList];

defaultKanbanList.tempAddEvent(new Evento("Default", "def", defaultKanbanList, dateToString(new Date())));
testKanbanList.tempAddEvent(new Evento("Test", "asd", testKanbanList, dateToString(new Date(0))));

let existingCalendars: Calendario[] = parse(localStorage.getItem("calendars") ?? stringify([defaultCalendar, testCalendar]));

existingCalendars = existingCalendars.map((calendar) => {
    calendar = Calendario.fromJSON(calendar);
    return calendar;
})

export const calendars: Writable<Calendario[]> = writable(existingCalendars);

//* Current details

export const currentDetails: Writable<string> = writable("allCalendars")

export const currentEvent: Writable<Evento> = writable();

export const currentCalendar: Writable<Calendario> = writable(get(calendars)[0]);

currentCalendar.subscribe((value) => {
    calendars.update((calendars) => { return calendars });
})

//* Filter

const existingEventFilter = JSON.parse(localStorage.getItem("eventFilter") ?? JSON.stringify(new EventoFiltro("", false, dateToString(new Date(0)), dateToString(new Date()))));

export const eventFilter: Writable<EventoFiltro> = writable(existingEventFilter);

eventFilter.subscribe((value) => {
    localStorage.setItem("eventFilter", JSON.stringify(value));
})