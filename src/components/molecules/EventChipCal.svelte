<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { selectEvent } from "../../lib/ManageEvents";
    import { constants, currentEvent } from "../../store";

    export let event: Evento;

    const transparency = $constants.transparency;

    $: color = event.getCalendar.color;

    function onDragStart(e: DragEvent, evento: any) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "event");
        }
        $currentEvent = evento;
    }

    // Establece el evento actual y cambia la vista a la de detalles del evento.
    function handleClick(e: MouseEvent) {
        selectEvent(e, event);
    }
</script>

<button
    on:click|stopPropagation={handleClick}
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
