<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { dateDifference } from "../../lib/ManageEvents";
    import {
        currentDetails,
        constants,
        currentEvent,
        currentCalendar,
    } from "../../store";
    import TiempoRestante from "../atoms/TiempoRestante.svelte";

    export let event: Evento;
    $: color = event.calendar.color;

    const transparency = $constants.transparency;

    // Establece el evento actual y cambia la vista a la de detalles del evento.
    function selectEvent() {
        $currentEvent = event;
        $currentDetails = "event";
    }

    function onDragStart(e: DragEvent, evento: any) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "event");
        }
        $currentEvent = evento;
    }
</script>

<button
    on:click={selectEvent}
    class="event-card"
    style="--main-color:{color}{transparency.main};
--main-color-hover:{color}{transparency.hover};
--main-color-active:{color}{transparency.active}"
    draggable="true"
    on:dragstart={(e) => onDragStart(e, event)}
>
    <h3>{event.name}</h3>
    <!-- <p class="date">{new Date(event.date).toLocaleDateString()}</p> -->

    <TiempoRestante
        text={dateDifference(new Date(event.date))}
        {color}
        func={() => {
            // Al hacer click en el tiempo restante, se cambian los detalles al calendario del evento.
            $currentCalendar = event.calendar;
            $currentDetails = "calendar";
        }}
    />
</button>

<style>
    .event-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0;
        background-color: var(--main-color);
        padding: 0.2em 1.2em;
        width: 100%;
        max-width: 700px;
    }
    .event-card:hover {
        background-color: var(--main-color-hover);
    }
    .event-card:active {
        background-color: var(--main-color-active);
    }
</style>
