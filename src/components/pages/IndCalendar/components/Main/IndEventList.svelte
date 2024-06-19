<script lang="ts">
    import {
        currentCalendar,
        currentEvent,
        eventFilter,
    } from "../../../../../store";
    import EventsList from "../../../../organisms/EventsList/EventsList.svelte";

    currentEvent.subscribe((value) => {
        $currentCalendar = $currentCalendar;
    });

    $: visibleEvents = $currentCalendar.events.filter((event) => {
        if (event.calendar.selected && event.pasaFiltro($eventFilter)) {
            return event;
        }
    });
</script>

<div id="events-list-container">
    <EventsList eventsList={visibleEvents} />
</div>

<style>
    #events-list-container {
        display: flex;
        gap: 1em;
        flex-direction: row;
        align-items: flex-start;
        text-align: center;
        height: 100%;
        width: 100%;
        overflow-x: auto;
        padding: 1rem;
    }
</style>
