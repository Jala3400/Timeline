<script lang="ts">
    import {
        calendars,
        currentDetails,
        eventsList,
        currentEvent,
        constants,
    } from "../../../../store";
    import CompInput from "../../../molecules/CompInput.svelte";

    $: color = $calendars[$currentEvent.calendar].color;
    const transparency = $constants.transparency;

    let calendar = $currentEvent.calendar;
    let date = new Date($currentEvent.date).toISOString().split("T")[0];
    let changeEvent = true;

    /// Cambia la fecha del evento actual.
    function changeDate(date: string) {
        // Al cambiar la fecha del evento, no se debe actualizar el currentEvent, porque entonces se forma un búcle
        changeEvent = false;
        $currentEvent.changeDate(date);
        $calendars = $calendars; // Actualiza el store para que se actualice la vista indivual de calendarios (CalendarsList).
        changeEvent = true;
    }

    // Al cambiar el evento actua, se actualiza el evento.
    currentEvent.subscribe((value) => {
        if ($currentDetails == "event" && changeEvent) {
            $eventsList = $eventsList;
            $calendars = $calendars;
            const event = value;
            date = new Date(event.date).toISOString().split("T")[0];
            calendar = event.calendar;
        }
    });
</script>

<div
    id="event-details"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
>
    <input
        id="event-title"
        type="text"
        bind:value={$currentEvent.title}
    />
    <div id="event-data">
        <div class="comp-input">
            <label for="calendar">Calendar:</label>
            <select
                id="calendar"
                bind:value={calendar}
                on:change={() => {
                    $currentEvent.changeCalendar(calendar);
                }}
            >
                {#each Object.keys($calendars) as calendar}
                    <option value={calendar}>
                        {calendar}
                    </option>
                {/each}
            </select>
        </div>
        <CompInput
            label="Date"
            type="date"
            bind:value={date}
            handleChange={() => {
                changeDate(date);
            }}
        />

        <div class="comp-input" style="grid-area:Description">
            <div>Description</div>
            <textarea
                name="description"
                id="description"
                bind:value={$currentEvent.description}
            />
        </div>

        <div id="buttons" style="grid-area: Buttons;">
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
    #event-title {
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
    }
    #event-title:focus {
        background-color: var(--bg-input);
    }
    #event-data {
        display: grid;
        grid-template-areas:
            "Calendar Date"
            "Description Description"
            "Footer Buttons";
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
    @media (max-width: 1200px) {
        #event-title {
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
