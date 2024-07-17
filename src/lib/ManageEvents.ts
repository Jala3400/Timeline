import { get } from 'svelte/store';
import { Calendario } from '../classes/Calendario';
import type { Evento } from '../classes/Evento';
import { calendars, eventsList, currentCalendar, currentEvent, displayModal, currentDetails } from '../store';
import { parse, stringify } from 'flatted';


const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


/**
 * Convierte una fecha en formato de cadena de texto aceptable por input type="datetime-local".
 * 
 * @param date La fecha a convertir.
 * @returns La fecha en formato de cadena de texto.
 */
export function dateToString(date: Date) {
    return date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        "T" +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);
}

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
    } else if (Math.abs(diff) < 1 / 24) {
        result = Math.round(diff * 24 * 60) + "m";
    } else if (Math.abs(diff) < 1) {
        result = Math.round(diff * 24) + "h";
    }
    return result;
}

/**
 * Actualiza la lista de eventos que se muestran por pantalla
 */
export function loadEvents() {
    let newEventsList: Evento[] = [];
    for (let calendar of get(calendars)) {
        newEventsList = mergeEvents(newEventsList, calendar.getDatedEvents());
    }
    eventsList.set(newEventsList);
}

/** 
 * Combina dos listas de eventos ordenadas por fecha
 */
function mergeEvents(existing: Evento[], newEvents: Evento[]) {
    let arr = [];

    let i = 0;
    let j = 0;

    while (i < existing.length && j < newEvents.length) {
        if (new Date(existing[i].date!) < new Date(newEvents[j].date!)) {
            arr.push(existing[i]);
            i++;
        } else {
            arr.push(newEvents[j]);
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
export function addNewCalendar(calendar: Calendario) {
    calendars.update((calendars) => {
        calendars.push(calendar);
        return calendars;
    });
    currentCalendar.set(calendar);
}
/**
 * Elimina un calendario
 * @param calendar el nombre del calendario
 */
export function deleteCalendar(calendar: Calendario) {
    if (get(calendars).length == 1) {
        return false
    } else {
        calendars.update((calendars) => {
            // Borra el calendario de los calendarios seleccionados
            const index = calendars.indexOf(calendar);
            if (index != -1) {
                calendars.splice(index, 1);
            }
            return calendars
        });
    }

    currentCalendar.set(get(calendars)[0]);
    currentEvent.set(get(currentCalendar).getFirstEvent());
    return true;
}

export function saveCalendars() {
    localStorage.setItem("calendars", stringify(get(calendars)));
}

export function saveTasks(tasks: any) {
    localStorage.setItem("tasks", stringify(tasks));
}

export function loadTasks() {
    return parse(localStorage.getItem("tasks") ?? '[["1","2"],[],[]]');
}

export function save3daysOpt(conf: any) {
    localStorage.setItem("3daysConf", stringify(conf));
}

export function load3daysOpt() {
    return parse(localStorage.getItem("3daysConf") ?? '[{"days":3,"offset":0}]');
}

// Establece el evento actual y cambia la vista a la de detalles del evento.
export function selectEvent(e: MouseEvent, event: Evento) {
    currentEvent.set(event);
    currentCalendar.set(event.getCalendar);
    if (e.ctrlKey || e.shiftKey) {
        currentDetails.set("event");
    } else {
        displayModal.set({ name: "eventDetails", updateNumber: get(displayModal).updateNumber + 1 });
    }
}

export function groupEventsByDay(eventsList: Evento[]) {
    let eventsByDay: Evento[][] = [];
    if (eventsList.length === 0) return eventsByDay;
    let j = 0;
    eventsByDay.push([]);
    let currentDay = new Date(eventsList[0].date!).toDateString();
    for (let i = 0; i < eventsList.length; i++) {
        const event = eventsList[i];
        if (new Date(event.date!).toDateString() === currentDay) {
            eventsByDay[j].push(event);
        } else {
            j++;
            eventsByDay[j] = [event];
            currentDay = new Date(event.date!).toDateString();
        }
    }
    return eventsByDay;
}


/**
 * Devuelve el índice en el que se debe insertar un evento en una lista de eventos ordenada por fecha.
 * @param date la fecha del evento
 * @param events la lista en la que se va a insertar el evento
 */
export function lookDate(date: string | Date, events: Evento[]) {
    let i = 0;
    date = dateToString(new Date(date));
    while (i < events.length) {
        if (date <= dateToString(new Date(events[i].date!))) {
            return i;
        } else { i++ };
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