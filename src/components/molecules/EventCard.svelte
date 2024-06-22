<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { currentDetails, constants, currentEvent } from "../../store";

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
    on:mousedown={selectEvent}
    class="event"
    style="--main-color:{color}{transparency.main};
--main-color-hover:{color}{transparency.hover};
--main-color-active:{color}{transparency.active}"
    draggable="true"
    on:dragstart={(e) => onDragStart(e, event)}
>
    <h2>{event.name}</h2>
    <!-- <p class="date">{new Date(event.date).toLocaleDateString()}</p> -->
</button>

<style>
    .event {
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
