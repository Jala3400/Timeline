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
            lookDate(date, $eventsList),
            lookDate(
                new Date(date.getTime() + 24 * 60 * 60 * 1000),
                $eventsList
            )
        )
        .filter((event) => {
            if (event.pasaFiltroSuave($eventFilter)) {
                return event;
            }
        });

    function addEvent(e: MouseEvent) {
        dispatch("addEvent", { date: date });
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent) {
        if (e.dataTransfer?.getData("type") === "event") {
            e.preventDefault();
            const prevDate = new Date($currentEvent.date ?? new Date());
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
    on:click={addEvent}
    on:drop={onDrop}
    on:dragover={onDragOver}
>
    {date.getDate()}
    <div class="events" on:mousedown|stopPropagation>
        {#each events as event}
            <EventChipCal {event} />
        {/each}
    </div>
</div>

<style>
    .day {
        padding: 8px;
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
