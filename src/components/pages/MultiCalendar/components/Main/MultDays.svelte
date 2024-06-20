<script lang="ts">
    import { lookDate } from "../../../../../lib/ManageEvents";
    import { eventsList } from "../../../../../store";
    import Day from "../../../../organisms/Day/Day.svelte";

    const dayInms = 24 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    let days = 3;
</script>

<!-- <div id="options"></div> -->
<div id="days-container">
    <div id="days-header">
        {#each Array(days) as _, index}
            <div class="day-info">
                <div>
                    {new Date(todayTime + dayInms * index).toLocaleDateString()}
                </div>
                <div>
                    {new Date(todayTime + dayInms * index).toLocaleDateString(
                        "en-US",
                        { weekday: "long" }
                    )}
                </div>
                <div class="border"></div>
            </div>
        {/each}
    </div>
    <div id="calendar">
        <div id="hours">
            {#each Array(24) as _, index}
                <div class="hour">{index}</div>
            {/each}
        </div>
        <div id="cal-days">
            {#each Array(days) as _, index}
                {@const eventos = $eventsList
                    .slice(
                        lookDate(
                            new Date(todayTime + dayInms * (1 + index)),
                            $eventsList
                        ),
                        lookDate(
                            new Date(todayTime + dayInms * index),
                            $eventsList
                        )
                    )
                    .filter((event) => {
                        if (event.calendar.selected) return event;
                    })}
                <Day
                    {eventos}
                    day={new Date(todayTime + dayInms * index)}
                    on:addEvent
                />
            {/each}
        </div>
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
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #days-header {
        display: flex;
        justify-content: space-around;
        width: 100%;
        grid-column: span 2;
        padding-left: 2em;
        padding-right: 9px;
        border-bottom: 1px solid var(--divider-color);
    }
    .day-info {
        width: 100%;
        position: relative;
        padding: 1em 0;
    }
    .border {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2em;
        border-left: 1px solid var(--divider-color);
    }
    #calendar {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        --heigth: 150%;
    }
    #hours {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: var(--heigth);
        border-right: 1px solid var(--divider-color);
    }
    .hour {
        width: 2em;
        height: calc(100% / 24);
        border-bottom: 1px solid var(--divider-color);
    }
    #cal-days {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 1px;
        width: 100%;
        height: var(--heigth);
    }
</style>
