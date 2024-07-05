<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { constants, currentDetails, currentEvent } from "../../store";

    export let event: Evento;

    const transparency = $constants.transparency;

    $: color = event.calendar.color;
    $: top =
        ((new Date(event.date).getHours() +
            new Date(event.date).getMinutes() / 60) /
            24) *
        100;

    // Establece el evento actual y cambia la vista a la de detalles del evento.
    function selectEvent() {
        $currentEvent = event;
        $currentDetails = "event";
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click|stopPropagation
    on:mousedown|stopPropagation
    style="--main-color-pure:{color};
    --main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active};
--top:{top}%;"
>
    <button on:click={selectEvent} class="time-bar" style="top: {top}%"
    ></button>
    <button
        on:click={selectEvent}
        class="event-name"
        style="top: min(
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
        background-color: var(--main-color);
    }
    .event-name {
        transition: top 0s;
        position: absolute;
        background-color: var(--main-color);
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
