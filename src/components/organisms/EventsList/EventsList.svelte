<script lang="ts">
    import type { Evento } from "../../../classes/Evento";
    import { groupEventsByDay } from "../../../lib/ManageEvents";
    import DayBlock from "../DayBlock/DayBlock.svelte";

    export let eventsList: Evento[] = [];

    $: eventsByDay = groupEventsByDay(eventsList);
</script>

<div id="events-container">
    {#each eventsByDay as events}
        <DayBlock {events} />
    {/each}
</div>

<style>
    #events-container {
        display: flex;
        gap: 0.25em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
</style>
