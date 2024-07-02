<script lang="ts">
    import { lookDate } from "../../../../../lib/ManageEvents";
    import { eventsList } from "../../../../../store";
    import Day from "../../../../organisms/Day/Day.svelte";
    import DaysOptions from "../../../../organisms/Options/DaysOptions.svelte";

    const dayInms = 24 * 60 * 60 * 1000;
    let focusDay = new Date();
    focusDay.setHours(0, 0, 0, 0);
    $: focusTime = focusDay.getTime();

    let days = 3;
    let offset = 0;
</script>

<div id="days-container">
    <DaysOptions bind:days bind:offset bind:focusDay />
    <div id="days-header">
        {#each Array(days) as _, index}
            {@const day = new Date(focusTime + dayInms * (index - offset))}
            <div
                class="day-info"
                class:focus-day={new Date().toDateString() ===
                    day.toDateString()}
            >
                <div>
                    {day.toLocaleDateString()}
                </div>
                <div>
                    {day.toLocaleDateString("en-US", { weekday: "long" })}
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
                            new Date(
                                focusTime + dayInms * (1 + index - offset)
                            ),
                            $eventsList
                        ),
                        lookDate(
                            new Date(focusTime + dayInms * (index - offset)),
                            $eventsList
                        )
                    )
                    .filter((event) => {
                        if (event.calendar.selected) return event;
                    })
                    .reverse()}
                <Day
                    {eventos}
                    day={new Date(focusTime + dayInms * (index - offset))}
                    on:addEvent
                />
            {/each}
        </div>
    </div>
</div>

<style>
    #days-container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
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
        transition: 0s;
    }
    .day-info.focus-day {
        color: var(--main-color-pure);
    }
    .border {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2em;
        border-left: 1px solid var(--divider-color);
        z-index: -1;
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
