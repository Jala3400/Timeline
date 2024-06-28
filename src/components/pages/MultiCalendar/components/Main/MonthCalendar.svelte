<script lang="ts">
    import DayCal from "../../../../organisms/DayCal/DayCal.svelte";

    let daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const prevMonth = new Date(currentYear, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const firstOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const lastDayOfMonth = new Date(
        currentYear,
        currentMonth,
        daysInMonth
    ).getDay();
    const lastOffset = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;
</script>

<div class="calendar">
    {#each daysOfWeek as day}
        <div class="day-header">{day}</div>
    {/each}

    {#each Array(firstOffset) as _, index}
        <DayCal
            disabled={true}
            date={new Date(
                currentYear,
                currentMonth - 1,
                daysInPrevMonth + index - firstOffset + 1
            )}
        />
    {/each}

    {#each Array(daysInMonth) as _, index}
        <DayCal date={new Date(currentYear, currentMonth, index + 1)} />
    {/each}
    {#each Array(lastOffset) as _, index}
        <DayCal date={new Date(currentYear, currentMonth + 1, index + 1)} />
    {/each}
</div>

<style>
    .calendar {
        position: relative;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 2.5em repeat(5, 1fr);
        width: 100%;
        height: 100%;
    }

    .day-header {
        width: 100%;
        position: static;
        padding: 0.5em 0;
    }
</style>
