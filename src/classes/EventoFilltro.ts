import type { Evento } from "./Evento";

export class EventoFiltro {
    name: string;
    filtByDate: boolean;
    startDate: string;
    endDate: string;

    constructor(name: string, filtByDate: boolean, startDate: Date | string, endDate: Date | string) {
        this.name = name;
        this.filtByDate = filtByDate;
        this.startDate = new Date(startDate).toISOString();
        this.endDate = new Date(endDate).toISOString();
    }
}