import { get } from 'svelte/store';
import { calendars, currentEvent, eventsList } from '../store';

export class Evento {
    title: string;
    date: string;
    description: string;
    calendar: string

    constructor(title: string = "new event", date: Date | string = new Date, description: string = "", calendar: string) {
        this.title = title;
        this.date = new Date(date).toISOString();
        this.description = description;
        this.calendar = calendar;
    }

    static fromJSON(json: any): Evento { // Returns the instance of an event given its JSON data
        let evento = Object.create(Evento.prototype);
        return Object.assign(evento, json);
    }

    changeCalendar(calendar: string) { // Changes the calendar of the event and also updates the calendars
        calendars.update((value) => {
            value[this.calendar].tempDeleteEvent(this);
            value[calendar].addEvent(this);
            return value;
        })
        currentEvent.update((value => {
            value.event.calendar = calendar;
            return value
        }))
        this.calendar = calendar;
    }

    updateCalendar(calendar: string) {
        this.calendar = calendar
    }

    changeDate(date: string) {
        get(calendars)[this.calendar].tempDeleteEvent(this);
        this.date = date;
        get(calendars)[this.calendar].addEvent(this);
    }

    delete() {
        get(calendars)[this.calendar].deleteEvent(this);
        eventsList.update((value) => {
            const index = value.indexOf(this);
            value.splice(index, 1);
            return value;
        })
    }
}