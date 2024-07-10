<script lang="ts">
    import { onMount } from "svelte";
    import type { Evento } from "../../../classes/Evento";
    import { dateToString } from "../../../lib/ManageEvents";
    import { currentEvent } from "../../../store";
    import EventCard from "../../molecules/EventCard.svelte";

    export let events: Evento[] = [];
    $: targetDay = new Date(events[0].date!).toDateString();
    $: today = targetDay === new Date().toDateString();

    let currentDayElement: HTMLDivElement;

    onMount(() => {
        if (today) {
            currentDayElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent, targetDay: string) {
        if (e.dataTransfer?.getData("type") === "event") {
            e.preventDefault();
            let targetDate = new Date(targetDay);
            let newDate = new Date($currentEvent.date ?? new Date());
            newDate.setFullYear(targetDate.getFullYear());
            newDate.setMonth(targetDate.getMonth());
            newDate.setDate(targetDate.getDate());
            $currentEvent.changeDate(dateToString(newDate));
        }
    }
</script>

<div
    class="day-container"
    on:drop={(e) => onDrop(e, targetDay)}
    on:dragover={onDragOver}
    role="presentation"
    bind:this={currentDayElement}
>
    <div class="day-date" data-today={today}>
        {targetDay}
    </div>
    <div class="event-day">
        {#each events as event}
            <EventCard {event} />
        {/each}
    </div>
</div>

<style>
    .day-container {
        padding-top: 0.75em;
        display: flex;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .day-date {
        transition: none;
        font-size: 1.2em;
    }
    .day-date[data-today="true"] {
        font-weight: bold;
        color: var(--main-color-pure);
    }
    .event-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 12px;
        width: 100%;
        max-width: 700px;
        overflow: auto;
    }
</style>
