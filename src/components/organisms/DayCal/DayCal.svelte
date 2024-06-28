<script lang="ts">
    import { lookDate } from "../../../lib/ManageEvents";
    import { eventsList } from "../../../store";
    import EventChipCal from "../../molecules/EventChipCal.svelte";

    export let date: Date;
    export let disabled = false;
    $: events = $eventsList
        .slice(
            lookDate(
                new Date(date.getTime() + 24 * 60 * 60 * 1000),
                $eventsList
            ),
            lookDate(date, $eventsList)
        )
        .filter((event) => {
            if (event.calendar.selected) return event;
        })
        .reverse();
</script>

<div class="day" class:disabled>
    {date.getDate()}
    <div class="events">
        {#each events as event}
            <EventChipCal {event} />
        {/each}
    </div>
</div>

<style>
    .day {
        padding: 12px;
        border: 1px solid var(--divider-color-strong);
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: auto;
    }
    .day.disabled {
        opacity: 0.5;
    }
    .events {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>
