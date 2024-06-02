import { get } from 'svelte/store';
import { insEvent, updateEvents } from '../lib/ManageEvents';
import { calendars, configuration, currentDetails, currentEvent, eventsList, selectedCalendars } from '../store';
import { Evento } from "./Evento";

export class Calendar {
    color: string;
    events: Evento[];

    constructor(color: string, events: Evento[] = []) {
        this.color = color;
        this.events = events;
    }

    static fromJSON(json: any): Calendar {
        let calendar = Object.create(Calendar.prototype);
        return Object.assign(calendar, json, {
            events: json.events.map((event: any) => Evento.fromJSON(event))
        });
    }

    addEvent(event: Evento) { // Todo: Can be improved a lot (everything can), but this thing repeats stuff that doesn't need, like the index of currentDetails (also working on binary search)
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

    tempDeleteEvent(event: Evento) {
        const index = this.events.indexOf(event);
        this.events.splice(index, 1);
    }

    deleteEvent(event: Evento) {
        currentDetails.set("allCalendars");
        currentEvent.set({ event: get(eventsList)[0], index: 0 })
        calendars.update((value) => {
            this.tempDeleteEvent(event);
            return value
        })
    }
}