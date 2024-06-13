<script lang="ts">
    import { currentCalendar, currentEvent } from "../../../../../store";
    import EventsList from "../../../../organisms/EventsList/EventsList.svelte";

    currentEvent.subscribe((value) => {
        $currentCalendar = $currentCalendar;
    });
</script>

<EventsList eventsList={$currentCalendar.events} />
