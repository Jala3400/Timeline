<script lang="ts">
    import { dateToString } from "../../../../lib/ManageEvents";
    import {
        calendars,
        currentDetails,
        currentEvent,
        constants,
        eventsList,
        currentCalendar,
    } from "../../../../store";
    import CompInput from "../../../molecules/CompInput.svelte";

    $: colorId = calendar.id;
    const transparency = $constants.transparency;

    let calendar = $currentEvent.getCalendar;
    let kanbanList = $currentEvent.kanbanList;
    let date = dateToString(new Date($currentEvent.date!));
    let changeEvent = true;

    /// Cambia la fecha del evento actual.
    function changeDate(date: string) {
        // Al cambiar la fecha del evento, no se debe actualizar el currentEvent, porque entonces se forma un búcle
        changeEvent = false;
        $currentEvent.changeDate(date);
        changeEvent = true;
    }

    // Al cambiar el evento actua, se actualiza el evento.
    currentEvent.subscribe((value) => {
        if ($currentDetails == "event" && changeEvent) {
            $eventsList = $eventsList;
            $currentCalendar = value.getCalendar;
            date = dateToString(new Date(value.date!));
            calendar = value.getCalendar;
            kanbanList = value.kanbanList;
        }
    });
</script>

<div
    id="event-details"
    style="--main-color-pure: var(--{colorId}-color-pure);
    --main-color: var(--{colorId}-color);
    --main-color-hover: var(--{colorId}-color-hover);
    --main-color-active: var(--{colorId}-color-active);"
>
    <input id="event-name" type="text" bind:value={$currentEvent.name} />
    <div id="event-data">
        <div class="comp-input">
            <label for="calendar">Calendar</label>
            <select
                id="calendar"
                bind:value={calendar}
                on:change={() => {
                    $currentEvent.changeCalendar(calendar);
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
                <select
                    id="kanban-list"
                    bind:value={kanbanList}
                    on:change={() => {
                        $currentEvent.changeKanbanlist(kanbanList);
                    }}
                >
                    {#each $currentCalendar.kanbanLists as list}
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
                name="description"
                id="description"
                bind:value={$currentEvent.description}
            />
        </div>

        <div id="buttons" class="two-span">
            <button
                on:click={() => {
                    $currentEvent.delete();
                }}>Delete</button
            >
        </div>
    </div>
</div>

<style>
    #event-details {
        padding: 1em;
        border-radius: 12px;
        background-color: var(--main-color);
        text-align: unset;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    #event-name {
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
    }
    #event-name:focus {
        background-color: var(--bg-input);
    }
    #event-data {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    #buttons {
        display: flex;
        justify-content: flex-end;
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
    @media (max-width: 1200px) {
        #event-name {
            font-size: 1.75em;
        }
        #event-data {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: flex-end;
        }
    }
</style>
