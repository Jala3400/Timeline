import { get, readable, writable, type Writable } from 'svelte/store';
import { Calendario } from './classes/Calendario';
import { Evento } from './classes/Evento';
import { saveCalendars, loadEvents } from './lib/ManageEvents';

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
    JSON.stringify({ transparency: { low: "40", main: "60", hover: "90", active: "AA", full: "FF" }, transparencyApp: { none: "00", main: "1C", hover: "2d", active: "36" }, discreteColor: "#FFFFFF" })
)

export const constants = readable(existingConstants);

constants.subscribe((value) => {
    localStorage.setItem("constants", JSON.stringify(value));
})

//* Events list
// Temporary default events
export const eventsList: Writable<Evento[]> = writable([])

//* Existing calendars

const defaultCalendar = new Calendario("#FF0000", [new Evento("Default", new Date().toISOString(), "test")], "default");
const testCalendar = new Calendario("#FF00FF", [new Evento("Test", new Date(0).toISOString(), "asd",)], "test");

let existingCalendars: Calendario[] = JSON.parse(localStorage.getItem("calendars") ?? JSON.stringify([defaultCalendar, testCalendar]));

existingCalendars = existingCalendars.map((calendar) => {
    calendar = Calendario.fromJSON(calendar);
    return calendar;
})

export const calendars: Writable<Calendario[]> = writable([...existingCalendars]);

let timer: NodeJS.Timeout;

calendars.subscribe((value) => {
    // Debounce saving
    clearTimeout(timer);
    timer = setTimeout(() => saveCalendars(), 1000);
})

//* Current details

export const currentDetails: Writable<string> = writable("allCalendars")

export const currentEvent: Writable<Evento> = writable(get(eventsList)[0]);

export const currentCalendar: Writable<Calendario> = writable(get(calendars)[0]);

currentCalendar.subscribe((value) => {
    calendars.update((calendars) => { return calendars });
})