<script lang="ts">
    import { eventFilter, eventsList } from "../../../../../store";
    import EventsList from "../../../../organisms/EventsList/EventsList.svelte";

    $: visibleEvents = $eventsList.filter((event) => {
        if (event.calendar.selected && event.pasaFiltro($eventFilter)) {
            return event;
        }
    });
</script>

<EventsList eventsList={visibleEvents} />
