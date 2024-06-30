<script lang="ts">
    import EventCard from "../../molecules/EventCard.svelte";
    import type { Evento } from "../../../classes/Evento";

    export let eventsList: Evento[] = [];

    function groupEventsByDay(eventsList: Evento[]) {
        let eventsByDay: Evento[][] = [];
        let j = 0;
        for (let i = 0; i < eventsList.length; i++) {
            eventsByDay[j] = [];
            let currentDay = new Date(eventsList[i].date).getDate();
            while (
                i < eventsList.length &&
                new Date(eventsList[i].date).getDate() === currentDay
            ) {
                eventsByDay[j].push(eventsList[i]);
                i++;
            }
            j++;
        }
        return eventsByDay;
    }

    $: eventsByDay = groupEventsByDay(eventsList);
</script>

<div id="events-container">
    {#each eventsByDay as events}
        <div class="new-day">
            {new Date(events[0].date).toDateString()}
        </div>
        <div class="event-day">
            {#each events as event}
                <EventCard {event} />
            {/each}
        </div>
    {/each}
</div>

<style>
    #events-container {
        display: flex;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .new-day {
        font-size: 1.2em;
    }
    .event-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 12px;
        overflow: hidden;
        width: 100%;
        max-width: 700px;
        gap: 1px;
    }
</style>
