<script lang="ts">
    import EventCard from "../../molecules/EventCard.svelte";
    import type { Evento } from "../../../classes/Evento";
    import { onMount } from "svelte";

    export let eventsList: Evento[] = [];

    onMount(() => {
        const currentDayElement = document.querySelector(
            `.new-day[data-today=true]`
        );
        if (currentDayElement) {
            currentDayElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    function groupEventsByDay(eventsList: Evento[]) {
        let eventsByDay: Evento[][] = [];
        let j = 0;
        if (eventsList.length === 0) return eventsByDay;
        eventsByDay.push([]);
        let currentDay = new Date(eventsList[0].date).toDateString();
        for (let i = 0; i < eventsList.length; i++) {
            const event = eventsList[i];
            if (new Date(event.date).toDateString() === currentDay) {
                eventsByDay[j].push(event);
            } else {
                j++;
                eventsByDay[j] = [event];
                currentDay = event.date;
            }
        }
        return eventsByDay;
    }

    $: eventsByDay = groupEventsByDay(eventsList);
</script>

<div id="events-container">
    {#each eventsByDay as events}
        {@const today = new Date(events[0].date).toDateString()}
        <div class="new-day" data-today={today === new Date().toDateString()}>
            {today}
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
        transition: none;
        padding-top: 8px;
        font-size: 1.2em;
    }
    .new-day[data-today="true"] {
        font-weight: bold;
        color: var(--main-color-pure);
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
    }
</style>
