<script lang="ts">
    //! Keep the orden of the imports. When Evento is on top of calendars the app breaks
    import { calendars, currentCalendar, eventsList } from "../../store";
    import { Evento } from "../../classes/Evento";
    import Modal from "../templates/Modal/Modal.svelte";
    import CompInput from "../molecules/CompInput.svelte";
    import { Calendario } from "../../classes/Calendario";
    import { lookDate } from "../../lib/ManageEvents";

    export let addEventModal: boolean = false;
    export let calendarColor: string;
    export let addCalendarModal: boolean;

    let calendar = $calendars[0];
    let name = "new event";
    let date = new Date().toISOString().substring(0, 16);
    let description = "";

    // Al cambiar el calendario actual, se actualiza el calendario al que se añade el evento
    currentCalendar.subscribe((value) => {
        calendar = value;
    });

    // Añade un evento al calendario seleccionado
    function addEventCard(calendar: Calendario) {
        const evento = new Evento(
            name,
            new Date(date).toISOString(),
            description,
            calendar
        );
        calendar.addEvent(evento);
        $eventsList.splice(lookDate(evento.date, $eventsList), 0, evento);
    }
</script>

<Modal
    bind:showModal={addEventModal}
    color={addCalendarModal ? calendarColor : calendar.color}
>
    <h2 slot="header">Add Event</h2>
    <div slot="content" id="content">
        <div class="comp-input">
            <label for="calendar">Calendar</label>
            <div id="calendar-input">
                <select id="calendar" bind:value={calendar}>
                    {#each $calendars as calendar}
                        <option value={calendar}>
                            {calendar.name}
                        </option>
                    {/each}
                </select>
                <button
                    type="button"
                    on:click={() => {
                        // Muestra el modal de añadir calendario
                        addCalendarModal = true;
                    }}>+</button
                >
            </div>
        </div>
        <CompInput label="Name" type="text" bind:value={name} />
        <CompInput
            label="Date"
            type="datetime-local"
            bind:value={date}
        />
        <div class="comp-input">
            <label for="description">Description</label>
            <textarea id="description" bind:value={description} />
        </div>
    </div>
    <button on:click={() => addEventCard(calendar)} slot="buttons">Save</button>
</Modal>

<style>
    .comp-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
    #content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    #calendar-input {
        display: flex;
        gap: 5px;
    }
    #calendar {
        width: 100%;
    }
</style>
