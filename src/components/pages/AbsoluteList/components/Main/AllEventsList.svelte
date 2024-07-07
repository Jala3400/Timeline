<script lang="ts">
    import { eventFilter, eventsList } from "../../../../../store";
    import EventsList from "../../../../organisms/EventsList/EventsList.svelte";
    import AllEventsListOptions from "../../../../organisms/Options/AllEventsListOptions.svelte";

    $: visibleEvents = $eventsList.filter((event) => {
        if (
            event.pasaFiltro($eventFilter) &&
            (!filtByDate ||
                (new Date(event.date!) >= startDate &&
                    new Date(event.date!) <= endDate))
        ) {
            return event;
        }
    });

    let startDate = new Date(0);
    let endDate = new Date();
    let filtByDate = false;
</script>

<div id="all-events-list">
    <AllEventsListOptions bind:startDate bind:endDate bind:filtByDate />
    <div id="events-list-container">
        <EventsList eventsList={visibleEvents} />
    </div>
</div>

<style>
    #all-events-list {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    #events-list-container {
        display: flex;
        gap: 1em;
        align-items: flex-start;
        text-align: center;
        height: 100%;
        width: 100%;
        overflow-x: auto;
        padding: 1rem;
    }
</style>
