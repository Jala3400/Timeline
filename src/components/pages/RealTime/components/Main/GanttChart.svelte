<script lang="ts">
    import { onMount } from "svelte";
    import { lookDate } from "../../../../../lib/ManageEvents";
    import { calendars, constants, eventFilter } from "../../../../../store";
    import DayGantt from "../../../../organisms/DayGantt/DayGantt.svelte";

    let offset = -3;
    let days = 7;
    let addedDays = 0;
    let focusDay = new Date();
    $: visibleCalendars = $calendars.filter((cal) => cal.selected);
    let calendarDaysElement: HTMLDivElement;

    onMount(() => {
        const middleDayElement = document.querySelector(
            `[data-middle-day="true"]`
        );
        middleDayElement?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });

    function checkScroll() {
        // Trabajo en progreso
        const scrollPercentage =
            (calendarDaysElement.scrollLeft /
                (calendarDaysElement.scrollWidth -
                    calendarDaysElement.clientWidth)) *
            100;
        if (scrollPercentage >= 90) {
            days += 1;
            addedDays += 1;
        }
    }

    let transparency = $constants.transparency;
</script>

<div
    class="gantt-chart"
    style="grid-template-rows: 5em repeat({visibleCalendars.length}, minmax(5em, auto)) 8px;"
>
    <div style="border-right:1px solid var(--divider-color);"></div>
    <div id="calendars">
        {#each visibleCalendars as calendar}
            <div class="calendar-name">
                <span>{calendar.name}</span>
            </div>
        {/each}
    </div>

    <div
        id="calendar-days"
        bind:this={calendarDaysElement}
        on:scroll={() => {
            /*checkScroll%*/
        }}
        on:mouseup={() => {
            days = 7;
            offset += addedDays;
            addedDays = 0;
        }}
        role="presentation"
    >
        <div id="days-header">
            {#each Array(days) as _, i}
                {@const date = new Date(
                    new Date().getTime() + (offset + i) * 24 * 60 * 60 * 1000
                )}
                <div class="day-info" data-middle-day={i === -offset}>
                    <div
                        class="day-name"
                        class:focus-day={new Date().toDateString() ===
                            date.toDateString()}
                    >
                        <div>
                            {date.toLocaleDateString()}
                        </div>
                        <div>
                            {date.toLocaleDateString("en-US", {
                                weekday: "long",
                            })}
                        </div>
                        <div class="border"></div>
                    </div>
                    <div id="hours">
                        {#each Array(24) as _, index}
                            <div class="hour">{index}</div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        {#each visibleCalendars as calendar}
            {@const events = calendar.getDatedEvents()}
            {@const color = calendar.color}
            <div
                class="day-events"
                style="--main-color-pure:{color};
    --main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
            >
                {#each Array(days) as _, i}
                    {@const currentDate = new Date(
                        focusDay.getTime() + (offset + i) * 24 * 60 * 60 * 1000
                    )}
                    {@const date = new Date(
                        new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate()
                        ).getTime()
                    )}
                    <DayGantt
                        on:addEvent
                        events={events
                            .slice(
                                lookDate(date, events),
                                lookDate(
                                    new Date(
                                        date.getTime() + 24 * 60 * 60 * 1000
                                    ),
                                    events
                                )
                            )
                            .filter((event) => {
                                if (event.pasaFiltroSuave($eventFilter)) {
                                    return event;
                                }
                            })}
                        day={date}
                    />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .gantt-chart {
        display: grid;
        grid-template-columns: 1fr 7fr;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #days-header {
        display: flex;
        justify-content: space-around;
    }

    .day-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .day-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 1px solid var(--divider-color);
    }

    .day-name.focus-day {
        color: var(--main-color-pure);
    }

    #hours {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-right: 1px solid var(--divider-color);
    }

    .hour {
        text-align: center;
        width: 100%;
        border-left: 2px solid var(--divider-color);
    }

    #calendars {
        display: grid;
        align-items: center;
        grid-template-rows: subgrid;
        grid-row: 2 / -1;
    }

    .calendar-name {
        background-color: var(--bg-lighter);
        border: 1px solid var(--divider-color);
        padding: 10px;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    #calendar-days {
        display: grid;
        grid-template-rows: subgrid;
        overflow: auto;
        overflow-y: hidden;
        grid-row: 1 / -1;
    }

    .day-events {
        display: flex;
    }
</style>
