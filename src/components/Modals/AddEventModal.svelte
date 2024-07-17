<script lang="ts">
    //! Keep the orden of the imports. When Evento is on top of calendars the app breaks
    import { calendars, currentCalendar, eventsList } from "../../store";
    import { Evento } from "../../classes/Evento";
    import Modal from "../templates/Modal/Modal.svelte";
    import CompInput from "../molecules/CompInput.svelte";
    import { Calendario } from "../../classes/Calendario";
    import { dateToString, lookDate } from "../../lib/ManageEvents";

    export let addEventModal: boolean = false;
    export let calendarColor: string;
    export let addCalendarModal: boolean;
    export let date = dateToString(new Date());
    export let calendar = $calendars[0];
    export let kanbanList = calendar.defaultList;
    let name = "new event";
    let description = "";

    $: if (addEventModal) {
        name = "new event";
        description = "";
    }

    // Al cambiar el calendario actual, se actualiza el calendario al que se añade el evento
    currentCalendar.subscribe((value) => {
        calendar = value;
        kanbanList = value.defaultList;
    });

    // Añade un evento al calendario seleccionado
    function addEventCard(calendar: Calendario) {
        let evento: Evento;
        if (date !== "") {
            evento = new Evento(
                name,
                description,
                kanbanList,
                dateToString(new Date(date))
            );
            $eventsList.splice(lookDate(evento.date!, $eventsList), 0, evento);
            $eventsList = $eventsList;
        } else {
            evento = new Evento(name, description, kanbanList);
        }
        calendar.addEvent(evento);
    }

    function updateKanbanList(calendar: Calendario) {
        kanbanList = calendar.defaultList;
    }
</script>

<Modal
    bind:showModal={addEventModal}
    color={addCalendarModal ? calendarColor : calendar.color}
>
    <div id="header"><h2>Add Event</h2></div>
    <div id="content">
        <CompInput label="Name" type="text" bind:value={name} />
        <CompInput label="Date" type="datetime-local" bind:value={date} />
        <div class="comp-input">
            <label for="calendar">Calendar</label>
            <div id="calendar-input">
                <select
                    id="calendar"
                    bind:value={calendar}
                    on:change={() => {
                        updateKanbanList(calendar);
                    }}
                >
                    {#each $calendars as calendar}
                        <option value={calendar}>
                            {calendar.name}
                        </option>
                    {/each}
                </select>
                <button
                    type="button"
                    on:mousedown={() => {
                        // Muestra el modal de añadir calendario
                        addCalendarModal = true;
                    }}>+</button
                >
            </div>
        </div>
        <div class="comp-input">
            <label for="kanban-list">Kanban List</label>
            <div id="kanban-list-input">
                <select id="kanban-list" bind:value={kanbanList}>
                    {#each calendar.kanbanLists as list}
                        <option value={list}>
                            {list.name}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="comp-input two-span">
            <label for="description">Description</label>
            <textarea id="description" bind:value={description} />
        </div>
    </div>
    <div id="buttons">
        <button on:click={() => addEventCard(calendar)}>Save</button>
    </div>
</Modal>

<style>
    .comp-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
    #calendar-input {
        display: flex;
        gap: 5px;
    }
    #calendar {
        width: 100%;
    }
    .two-span {
        grid-column: span 2;
    }
    #header,
    #content {
        border-bottom: 1px solid var(--main-color-full);
        padding: 0 10px;
    }

    #content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width: 25em;
        padding-bottom: 20px;
    }

    #buttons {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }
</style>
