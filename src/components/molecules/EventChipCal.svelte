<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { constants, currentDetails, currentEvent } from "../../store";

    export let event: Evento;

    const transparency = $constants.transparency;

    $: color = event.calendar.color;

    function onDragStart(e: DragEvent, evento: any) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "event");
        }
        $currentEvent = evento;
    }

    // Establece el evento actual y cambia la vista a la de detalles del evento.
    function selectEvent() {
        $currentEvent = event;
        $currentDetails = "event";
    }
</script>

<button
    on:click|stopPropagation={selectEvent}
    on:mousedown|stopPropagation
    style="--main-color-pure:{color};
    --main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active};"
    class="event-name"
    draggable="true"
    on:dragstart={(e) => onDragStart(e, event)}
>
    {event.name}
</button>

<style>
    .event-name {
        background-color: var(--main-color);
        font-size: 16px;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
        min-height: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .event-name:hover {
        background-color: var(--main-color-hover);
    }
    .event-name:active {
        background-color: var(--main-color-active);
    }
</style>
