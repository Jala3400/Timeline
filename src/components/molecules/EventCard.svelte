<script lang="ts">
    import type { Evento } from "../../classes/Evento";
    import { dateDifference } from "../../lib/ManageEvents";
    import {
        currentDetails,
        constants,
        currentEvent,
        currentCalendar,
    } from "../../store";
    import ColoredIcon from "../atoms/ColoredIcon.svelte";

    export let event: Evento;
    $: color = event.calendar.color;

    const transparency = $constants.transparency;
    const dateColors = $constants.dateColors;

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

    $: dateDiff = dateDifference(new Date(event.date));

    function dateColor(dateDiff: string) {
        let color = "#000000";
        const lastChar = dateDiff.charAt(dateDiff.length - 1);
        if (dateDiff.charAt(0) === "-") {
            color = dateColors.overdue;
        } else if (lastChar == "h" || lastChar == "m") {
            color = dateColors.urgent;
        } else if (dateDiff.length == 2) {
            color = dateColors.close;
        } else {
            color = dateColors.good;
        }
        return color;
    }

    $: timeColor = dateColor(dateDiff);
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
    <div class="left">
        <ColoredIcon
            text={event.calendar.name.charAt(0).toUpperCase()}
            {color}
            func={() => {
                // Al hacer click en el tiempo restante, se cambian los detalles al calendario del evento.
                $currentCalendar = event.calendar;
                $currentDetails = "calendar";
            }}
        />
    </div>
    <h3 class="event-name">{event.name}</h3>

    <div class="right">
        <ColoredIcon text={dateDiff} color={timeColor} func={selectEvent} />
    </div>
</button>

<style>
    .event-card {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
        border-radius: 0;
        background-color: var(--bg-light);
        padding: 0.2em 1.2em;
        width: 100%;
        max-width: 700px;
    }
    .event-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        width: 100%;
    }
    .event-card:hover {
        background-color: var(--bg-lighter);
    }
    .event-card:active {
        background-color: var(--bg-lighter-er);
    }
</style>
