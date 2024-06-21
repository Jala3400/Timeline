<script lang="ts">
    import type { Calendario } from "../../../classes/Calendario";
    import { calendars, constants, currentEvent } from "../../../store";
    import EventsList from "../EventsList/EventsList.svelte";

    export let calendar: Calendario;

    const transparency = $constants.transparency;

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent) {
        if (e.dataTransfer?.getData("type") === "event") {
            e.preventDefault();
            $currentEvent.changeCalendar(calendar);
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="calendar-block"
    style="--main-color:{calendar.color}{transparency.main};
            --main-color-hover:{calendar.color}{transparency.hover};
            --main-color-active:{calendar.color}{transparency.active}"
    on:drop={(e) => onDrop(e)}
    on:dragover={onDragOver}
>
    <input
        id="calendar-name"
        type="text"
        bind:value={calendar.name}
        on:input={() => ($calendars = $calendars)}
    />
    <div class="calendar-events">
        <EventsList eventsList={calendar.events} />
    </div>
</div>

<style>
    .calendar-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background-color: var(--main-color);
        padding: 1rem;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        min-width: 700px;
        max-width: 700px;
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
    .calendar-events {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>
