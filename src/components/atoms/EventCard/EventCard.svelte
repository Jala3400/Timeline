<script lang="ts">
    import type { Evento } from "../../../classes/Evento";
    import {
        currentDetails,
        constants,
        calendars,
        currentEvent,
    } from "../../../store";

    export let event: Evento;
    export let index: number;
    export let color = "#FF0000";

    const transparency = $constants.transparency;

    function selectEvent() {
        $currentEvent = { event: event, index: index };
        $currentDetails = {
            type: "event",
            color: $calendars[event.calendar].color,
        };
    }
</script>

<button
    on:click={selectEvent}
    class="event"
    style="--main-color:{color}{transparency.main};
--main-color-hover:{color}{transparency.hover};
--main-color-active:{color}{transparency.active}"
>
    <h2>{event.title}</h2>
    <!-- <p class="date">{new Date(event.date).toLocaleDateString()}</p> -->
</button>

<style>
    .event {
        /* border: 1px solid var(--main-color-hover); */
        border-radius: 8px;
        background-color: var(--main-color);
        padding: 0.6em 1.2em;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 700px;
    }
    .event:hover {
        background-color: var(--main-color-hover);
    }
    .event:active {
        background-color: var(--main-color-active);
    }
</style>
