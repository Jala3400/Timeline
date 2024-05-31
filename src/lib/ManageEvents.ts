import { get } from 'svelte/store';
import { Calendar } from '../classes/Calendar';
import type { Evento } from '../classes/Evento';
import { calendars, eventsList, selectedCalendars } from '../store';

export function updateEvents() {
    let newEventsList: Evento[] = [];
    for (let calendar of get(selectedCalendars)) {
        newEventsList = mergeEvents(newEventsList, calendar);
    }
    eventsList.set(newEventsList);
}

function mergeEvents(existing: Evento[], calendar: string) {
    let arr = [];
    let right = get(calendars)[calendar].events;

    let i = 0;
    let j = 0;

    while (i < existing.length && j < right.length) {
        if (new Date(existing[i].date) > new Date(right[j].date)) {
            arr.push(existing[i]);
            i++;
        } else {
            let event = right[j];
            event.calendar = calendar;
            arr.push(event);
            j++;
        }
    }
    while (i < existing.length) {
        arr.push(existing[i]);
        i++;
    }
    while (j < right.length) {
        let event = right[j];
        event.calendar = calendar;
        arr.push(event);
        j++;
    }
    return arr;
}

export function addNewCalendar(name: string, color: string) {
    let newCalendars = get(calendars);
    newCalendars[name] = new Calendar(color);
    calendars.set(newCalendars);
}

export function insEvent(date: string | Date, events: Evento[]) {
    let i = 0;
    let found = false;
    date = new Date(date);
    while (i < events.length && !found) {
        if (date > new Date(events[i].date)) {
            found = true;
            i--;
        }
        i++;
    }
    return i;
}

// Todo: Ins event with binary search
// function insEvent(date, events) {
//     let start = 0;
//     let end = events.length - 1;
//     let middle;

//     while (start <= end) {
//         middle = Math.floor((start + end) / 2);
//         let middleDate = new Date(events[middle].date)

//         if (middleDate == date) {
//             // found the key
//             return middle;
//         } else if (middleDate < date) {
//             // continue searching to the right
//             start = middle + 1;
//         } else {
//             // search searching to the left
//             end = middle - 1;
//         }
//     }
//     // key wasn't found
//     if (end <= start) {
//         return (date > new Date(events[start].date)) ? (start + 1) : start;
//     }
//     return middle;
// }
// function insEvent(date, events, low = 0, high = events.length - 1) {
//     console.log(events)


//     let mid = Math.floor((low + high) / 2);

//     console.log(events);
//     let currentDate = new Date(events[mid].date);

//     if (date == currentDate) {
//         return mid + 1;
//     }

//     if (date > currentDate) {
//         return insEvent(events, date, mid + 1, high);
//     }

//     return insEvent(events, date, low, mid - 1);
// }