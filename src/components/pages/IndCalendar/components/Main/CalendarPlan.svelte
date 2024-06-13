<script lang="ts">
    import { deleteCalendar } from "../../../../../lib/ManageEvents";
    import {
        calendars,
        constants,
        currentCalendar,
    } from "../../../../../store";
    import CompInput from "../../../../molecules/CompInput.svelte";
    $: calendar = $currentCalendar;

    const transparency = $constants.transparency;

    /// Actualiza los calendarios
    currentCalendar.subscribe((value) => {
        $calendars = $calendars;
    });
</script>

<div
    id="calendar-panel"
    style="--main-color:{calendar.color}{transparency.main};
            --main-color-hover:{calendar.color}{transparency.hover};
            --main-color-active:{calendar.color}{transparency.active}"
>
    <input id="calendar-name" type="text" bind:value={$currentCalendar.name} />

    <div id="calendar-data">
        <CompInput
            label="Color"
            type="color"
            bind:value={$currentCalendar.color}
        />
        <div id="stats" style="grid-area: Stats">
            <div>Nº de eventos: {$currentCalendar.events.length}</div>
        </div>
        <div class="comp-input" style="grid-area: Description">
            <div>Description</div>
            <textarea
                name="description"
                id="description"
                bind:value={$currentCalendar.description}
            />
        </div>

        <div id="buttons" style="grid-area: Buttons;">
            <button
                on:click={() => {
                    deleteCalendar($currentCalendar);
                }}>Delete</button
            >
        </div>
    </div>
</div>

<style>
    #calendar-panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background-color: var(--main-color);
        padding: 1rem;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: clamp(300px, 90%, 700px);
        max-height: 100%;
        overflow: auto;
        scroll-snap-align: center;
    }

    #calendar-name {
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
        justify-content: center;
        text-align: center;
    }
    #calendar-name:focus {
        background-color: #0f0f0f98;
    }
    #stats {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #calendar-data {
        display: grid;
        grid-template-areas:
            "Color Stats"
            "Description Description"
            "Footer Buttons";
        gap: 20px;
        grid-template-columns: 1fr 1fr;
        width: 100%;
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
        align-items: flex-start;
    }

    @media (max-width: 1200px) {
        #calendar-name {
            font-size: 1.75em;
        }
    }
</style>
