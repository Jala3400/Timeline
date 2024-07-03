<script lang="ts">
    import { dateToString, lookDate } from "../../../lib/ManageEvents";
    import { currentEvent, eventFilter, eventsList } from "../../../store";
    import EventChipCal from "../../molecules/EventChipCal.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let date: Date;
    export let disabled = false;

    $: today = date.toDateString() === new Date().toDateString();

    $: events = $eventsList
        .slice(
            lookDate(
                new Date(date.getTime() + 24 * 60 * 60 * 1000),
                $eventsList
            ),
            lookDate(date, $eventsList)
        )
        .filter((event) => {
            if (
                event.calendar.selected &&
                event.pasaFiltroSuave($eventFilter)
            ) {
                return event;
            }
        })
        .reverse();

    function addEvent(e: MouseEvent) {
        dispatch("addEvent", { date: date });
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent) {
        if (e.dataTransfer?.getData("type") === "event") {
            e.preventDefault();
            const prevDate = new Date($currentEvent.date);
            $currentEvent.changeDate(
                dateToString(
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        prevDate.getHours(),
                        prevDate.getMinutes(),
                        prevDate.getSeconds()
                    )
                )
            );
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="day"
    class:disabled
    class:today
    on:mousedown={addEvent}
    on:drop={(e) => onDrop(e)}
    on:dragover={onDragOver}
>
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
    .day.today {
        color: var(--main-color-pure);
        border-color: var(--main-color-active);
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
