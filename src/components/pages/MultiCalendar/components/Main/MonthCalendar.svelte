<script lang="ts">
    import DayCal from "../../../../organisms/DayCal/DayCal.svelte";
    import CalendarOptions from "../../../../organisms/Options/CalendarOptions.svelte";

    let daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    let focusDate = new Date();
    $: currentMonth = focusDate.getMonth();
    $: currentYear = focusDate.getFullYear();
    $: daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    $: daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    $: firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    $: firstOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    $: lastDayOfMonth = new Date(
        currentYear,
        currentMonth,
        daysInMonth
    ).getDay();
    $: lastOffset = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;

    $: weeksInMonth = Math.ceil((firstOffset + daysInMonth) / 7);
</script>

<div id="month-calendar">
    <CalendarOptions bind:focusDate></CalendarOptions>
    <div
        id="calendar"
        style="
        grid-template-rows: 2.5em repeat({weeksInMonth}, 1fr);"
    >
        {#each daysOfWeek as day}
            <div class="day-header">{day}</div>
        {/each}

        {#each Array(firstOffset) as _, index}
            <DayCal
                on:addEvent
                disabled={true}
                date={new Date(
                    currentYear,
                    currentMonth - 1,
                    daysInPrevMonth + index - firstOffset + 1
                )}
            />
        {/each}

        {#each Array(daysInMonth) as _, index}
            <DayCal
                on:addEvent
                date={new Date(currentYear, currentMonth, index + 1)}
            />
        {/each}
        {#each Array(lastOffset) as _, index}
            <DayCal
                on:addEvent
                disabled={true}
                date={new Date(currentYear, currentMonth + 1, index + 1)}
            />
        {/each}
    </div>
</div>

<style>
    #month-calendar {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    #calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .day-header {
        width: 100%;
        position: static;
        padding: 0.5em 0;
    }
</style>
