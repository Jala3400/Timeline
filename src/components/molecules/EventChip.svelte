<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { constants, currentDetails, currentEvent } from "../../store";

    export let event: Evento;

    const transparency = $constants.transparency;

    $: color = event.getCalendar.color;
    $: top =
        ((new Date(event.date!).getHours() +
            new Date(event.date!).getMinutes() / 60) /
            24) *
        100;

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click|stopPropagation
    on:mousedown|stopPropagation={() => {
        isActive = true;
    }}
    on:mouseup={() => (isActive = false)}
    on:mouseenter={() => (isHovered = true)}
    on:mouseleave={() => {
        isHovered = false;
        isActive = false;
    }}
>
    <button
        on:click={selectEvent}
        class="time-bar"
        style="background-color: {activeColor}; top: {top}%"
    ></button>
    <button
        on:click={selectEvent}
        class="event-name"
        style="background-color: {activeColor};
        top: min(
            {top}%,
            calc(100% - 2em)
        );"
    >
        {event.name}
    </button>
</div>

<style>
    .time-bar {
        transition: top 0s;
        position: absolute;
        width: 50%;
        left: 0;
        height: 2px;
    }
    .event-name {
        transition: top 0s;
        position: absolute;
        font-size: 16px;
        border-radius: 0 5px 5px 5px;
        padding: 5px;
        margin-left: auto;
        width: 50%;
        height: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
