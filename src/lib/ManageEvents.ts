import { get } from 'svelte/store';
import { Calendario } from '../classes/Calendario';
import type { Evento } from '../classes/Evento';
import { calendars, eventsList, selectedCalendars, currentCalendar, currentDetails } from '../store';


const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

/** 
 *  Calcula la diferencia de días entre dos fechas
 * @param date1 la primera fecha
 * @param date2 la segunda fecha
 */
export function dateDifference(date1: Date, date2 = new Date()) {
    const diff = (date1.getTime() - date2.getTime()) / oneDay;
    let result = Math.round(diff) + "d";
    if (Math.abs(diff) > 365) {
        result = Math.round(diff / 365) + "y";
    } else if (Math.abs(diff) < 1) {
        result = Math.round(diff * 24) + "h";
    }
    return result;
}


/**
 * Actualiza la lista de eventos que se muestran por pantalla
 */
export function updateEvents() {
    let newEventsList: Evento[] = [];
    for (let calendar of get(selectedCalendars)) {
        newEventsList = mergeEvents(newEventsList, calendar);
    }
    eventsList.set(newEventsList);
}

/** 
 * Combina dos listas de eventos ordenadas por fecha
 */
function mergeEvents(existing: Evento[], calendar: string) {
    let arr = [];
    let newEvents = get(calendars)[calendar].events;

    let i = 0;
    let j = 0;

    while (i < existing.length && j < newEvents.length) {
        if (new Date(existing[i].date) > new Date(newEvents[j].date)) {
            arr.push(existing[i]);
            i++;
        } else {
            let event = newEvents[j];
            event.setCalendar = calendar;
            arr.push(event);
            j++;
        }
    }
    while (i < existing.length) {
        arr.push(existing[i]);
        i++;
    }
    while (j < newEvents.length) {
        arr.push(newEvents[j]);
        j++;
    }
    return arr;
}

/**
 * Añade un nuevo calendario 
 * @param name el nombre del calendario
 * @param color el color del calendario
 */
export function addNewCalendar(name: string, color: string) {
    let newCalendars = get(calendars);
    let newCal = new Calendario(color, [], name);
    newCalendars[name] = newCal;
    calendars.set(newCalendars);
    currentCalendar.set(newCal);
}

/**
 * Elimina un calendario
 * @param calendar el nombre del calendario
 */
export function deleteCalendar(calendar: string): boolean {
    if (Object.keys(get(calendars)).length == 1) {
        return false;
    }
    // Borra el calendario de los calendarios seleccionados
    let newSelectedCalendars = get(selectedCalendars);
    const index = newSelectedCalendars.indexOf(calendar);
    if (index != -1) {
        newSelectedCalendars.splice(index, 1);
        selectedCalendars.set(newSelectedCalendars);
    }

    // Cambia el calendario actual
    currentCalendar.set(Object.values(get(calendars))[0]);

    // Cambia los detalles actuales
    currentDetails.set("allCalendars")

    // Borra el calendario de los calendarios
    let newCalendars = get(calendars);
    delete newCalendars[calendar];
    calendars.set(newCalendars);
    return true;
}

/**
 * Devuelve el índice en el que se debe insertar un evento en una lista de eventos ordenada por fecha.
 * @param date la fecha del evento
 * @param events la lista en la que se va a insertar el evento
 */
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

// Todo: Ins event con binary search
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