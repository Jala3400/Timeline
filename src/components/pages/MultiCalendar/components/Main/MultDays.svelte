<script lang="ts">
    import { lookDate } from "../../../../../lib/ManageEvents";
    import { eventsList } from "../../../../../store";
    import EventChip from "../../../../atoms/EventChip.svelte";

    const dayInms = 24 * 60 * 60 * 1000;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
</script>

<!-- <div id="options"></div> -->
<div id="days-container">
    <div id="hours">
        {#each Array(24) as _, index}
            <div class="hour">{index}</div>
        {/each}
    </div>
    <div id="mult-days">
        {#each Array(3) as _, index}
            {@const eventos = $eventsList
                .slice(
                    lookDate(
                        new Date(todayTime + dayInms * (1 + index)),
                        $eventsList
                    ),
                    lookDate(new Date(todayTime + dayInms * index), $eventsList)
                )
                .filter((event) => {
                    if (event.calendar.selected) return event;
                })
                .reverse()}
            <div class="day">
                {#each eventos as evento}
                    <EventChip event={evento} />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    /* #options {
        display: flex;
        flex-direction: row;
        gap: 1px;
        width: 100%;
        height: 2.5em;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
    } */
    #days-container {
        display: flex;
        flex-direction: row;
        gap: 1px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #hours {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .hour {
        height: calc(100% / 24);
        border-top: 1px solid var(--divider-color);
    }
    #mult-days {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 1px;
        width: 100%;
        height: 100%;
    }
    .day {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 1px;
        width: 100%;
        height: 100%;
        border-left: 1px solid var(--divider-color);
        background: repeating-linear-gradient(
            to bottom,
            var(--divider-color),
            var(--divider-color) 1px,
            transparent 1px,
            transparent calc(100% / 24)
        );
    }
</style>
