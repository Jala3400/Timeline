<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { constants, currentDetails, currentEvent } from "../../store";

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
    function selectEvent() {
        $currentEvent = event;
        $currentDetails = "event";
    }

    let isHovered = false;
    let isActive = false;

    $: bgColor = isHovered
        ? color + transparency.hover
        : color + transparency.main;
    $: activeColor = isActive ? color + transparency.active : bgColor;
</script>

<button
    on:click|stopPropagation={selectEvent}
    on:mousedown|stopPropagation={() => (isActive = true)}
    on:mouseup={() => (isActive = false)}
    on:mouseenter={() => (isHovered = true)}
    on:mouseleave={() => {
        isHovered = false;
        isActive = false;
    }}
    style="background-color: {activeColor};"
    class="event-name"
    draggable="true"
    on:dragstart={(e) => onDragStart(e, event)}
>
    {event.name}
</button>

<style>
    .event-name {
        font-size: 16px;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
        min-height: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
