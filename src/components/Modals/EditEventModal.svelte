<script lang="ts">
    import { dateToString } from "../../lib/ManageEvents";
    import { calendars, currentCalendar, currentEvent } from "../../store";
    import CompInput from "../molecules/CompInput.svelte";
    import Modal from "../templates/Modal/Modal.svelte";

    export let editEventModal = false;

    let name = $currentEvent.name;
    let date = dateToString(new Date($currentEvent.date!));
    let calendar = $currentEvent.getCalendar;
    let kanbanList = $currentEvent.kanbanList;
    let description = $currentEvent.description;
    let nameInput: HTMLInputElement;

    let changeEvent = true;

    function saveEvent() {
        changeEvent = false;
        $currentEvent.changeDate(date);
        $currentEvent.changeKanbanlist(kanbanList);
        $currentEvent.name = nameInput.value;
        $currentEvent.description = description;
        editEventModal = false;
        changeEvent = true;
    }

    function changeDate(date: string) {
        // Al cambiar la fecha del evento, no se debe actualizar el currentEvent, porque entonces se forma un búcle
        $currentEvent.changeDate(date);
    }

    currentEvent.subscribe((value) => {
        if (changeEvent) {
            name = value.name;
            date = dateToString(new Date(value.date!));
            calendar = value.getCalendar;
            kanbanList = value.kanbanList;
            description = value.description;
        }
    });
</script>

<Modal
    bind:showModal={editEventModal}
    on:submit={saveEvent}
    color={calendar.color}
>
    <div id="header">
        <input
            id="event-name"
            type="text"
            bind:this={nameInput}
            bind:value={name}
            on:keydown={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    nameInput.blur();
                }
            }}
        />
    </div>
    <div id="event-data">
        <div class="comp-input">
            <label for="calendar">Calendar</label>
            <select
                id="calendar"
                bind:value={calendar}
                on:change={() => {
                    $currentEvent.changeCalendar(calendar);
                    $currentCalendar = calendar;
                }}
            >
                {#each $calendars as calendar}
                    <option value={calendar}>
                        {calendar.name}
                    </option>
                {/each}
            </select>
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
        <div class="two-span">
            <CompInput
                label="Date"
                type="datetime-local"
                bind:value={date}
                change={() => {
                    changeDate(date);
                }}
            />
        </div>

        <div class="comp-input two-span">
            <div>Description</div>
            <textarea
                rows="8"
                name="description"
                id="description"
                bind:value={description}
            />
        </div>
    </div>

    <div id="buttons" class="two-span">
        <button
            on:click={() => {
                saveEvent();
            }}>Save</button
        >
        <button
            on:click={() => {
                $currentEvent.delete();
                editEventModal = false;
            }}>Delete</button
        >
    </div>
</Modal>

<style>
    #event-name {
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 1.5em;
        font-weight: bold;
        background-color: transparent;
    }
    #event-name:focus {
        background-color: var(--bg-input);
    }
    #event-data {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        width: 32em;
        border-bottom: 1px solid var(--main-color-full);
        padding: 0 10px;
        padding-bottom: 20px;
    }
    #buttons {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }
    .comp-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
    .two-span {
        grid-column: span 2;
    }
    #header {
        border-bottom: 1px solid var(--main-color-full);
        padding: 0 10px;
    }
</style>
