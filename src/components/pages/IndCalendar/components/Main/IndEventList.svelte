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

<EventsList eventsList={visibleEvents} />
