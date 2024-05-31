<script lang="ts">
    import {
        calendars,
        currentDetails,
        eventsList,
        currentEvent,
        constants,
    } from "../../../../store";
    import CompInput from "../../../molecules/CompInput/CompInput.svelte";

    $: color = $currentDetails.color;
    const transparency = $constants.transparency;

    let calendar = $currentEvent.event.calendar;
    let date = new Date($currentEvent.event.date).toISOString().split("T")[0];
    let changeEvent = true;

    function changeDate(date: string) {
        changeEvent = false;
        $currentEvent.event.changeDate(date);
        changeEvent = true;
    }

    currentEvent.subscribe((value) => {
        if ($currentDetails.type == "event" && changeEvent) {
            const event = value.event;
            $eventsList[value.index] = event;
            let calIndex = $calendars[event.calendar].events.indexOf(event);
            $calendars[event.calendar].events[calIndex] = event;
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
        bind:value={$currentEvent.event.title}
    />
    <div id="event-data">
        <div class="comp-input">
            <label for="calendar">Calendar:</label>
            <select
                id="calendar"
                bind:value={calendar}
                on:change={() => {
                    $currentEvent.event.changeCalendar(calendar);
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
                bind:value={$currentEvent.event.description}
            />
        </div>

        <div id="buttons" style="grid-area: Buttons;">
            <button
                on:click={() => {
                    $currentEvent.event.delete();
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
        margin: 15px 0;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
    }
    #event-title:focus {
        background-color: var(--input-background);
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
