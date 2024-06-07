import { get, readable, writable, type Writable } from 'svelte/store';
import { Calendario } from './classes/Calendario';
import { Evento } from './classes/Evento';
import { updateEvents } from './lib/ManageEvents';

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
const defaultEvent = new Evento("Default", new Date().toISOString(), "test", "default");
const testEvent = new Evento("Test", new Date(0).toISOString(), "asd", "test")

export const eventsList: Writable<Evento[]> = writable([])

//* Existing calendars
const existingCalendars = JSON.parse(localStorage.getItem("calendars") ?? JSON.stringify({ default: new Calendario("#FF0000", [defaultEvent], "default"), test: new Calendario("#FF00FF", [testEvent], "test") }));

export const calendars: Writable<{ [key: string]: Calendario }> = writable(
    // Goes from JSON to Calendar for every calendar (and Evento for its events)
    Object.entries(existingCalendars).reduce((acc, [key, value]) => {
        acc[key] = Calendario.fromJSON(value);
        return acc;
    }, {} as { [key: string]: Calendario })
);

calendars.subscribe((value) => {
    localStorage.setItem("calendars", JSON.stringify(value));
})

//* Selected calendars
const existingSelectedCalendars = JSON.parse(localStorage.getItem("selectedCalendars") ?? JSON.stringify(["default"]));

export const selectedCalendars = writable(existingSelectedCalendars)

selectedCalendars.subscribe((value) => {
    updateEvents();
    localStorage.setItem("selectedCalendars", JSON.stringify(value));
})

//* Current details

export const currentDetails: Writable<string> = writable("allCalendars")

export const currentEvent: Writable<{ event: Evento, index: number }> = writable({ event: get(eventsList)[0], index: 0 });

const calName = Object.keys(get(calendars))[0];
export const currentCalendar: Writable<Calendario> = writable(get(calendars)[calName]);