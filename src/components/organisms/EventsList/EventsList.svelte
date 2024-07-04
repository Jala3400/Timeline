<script lang="ts">
    import type { Evento } from "../../../classes/Evento";
    import DayBlock from "../DayBlock/DayBlock.svelte";

    export let eventsList: Evento[] = [];

    function groupEventsByDay(eventsList: Evento[]) {
        let eventsByDay: Evento[][] = [];
        if (eventsList.length === 0) return eventsByDay;
        let j = 0;
        eventsByDay.push([]);
        let currentDay = new Date(eventsList[0].date).toDateString();
        for (let i = 0; i < eventsList.length; i++) {
            const event = eventsList[i];
            if (new Date(event.date).toDateString() === currentDay) {
                eventsByDay[j].push(event);
            } else {
                j++;
                eventsByDay[j] = [event];
                currentDay = new Date(event.date).toDateString();
            }
        }
        return eventsByDay;
    }

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
        gap: 1em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
</style>
