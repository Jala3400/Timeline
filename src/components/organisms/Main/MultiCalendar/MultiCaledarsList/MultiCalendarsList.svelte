<script lang="ts">
    import {
        calendars,
        configuration,
        constants,
        selectedCalendars,
    } from "../../../../../store";
    import TiempoRestante from "../../../../atoms/TiempoRestante.svelte";
    import EventCard from "../../../../molecules/EventCard.svelte";

    const transparency = $constants.transparency;

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    // Calcula la diferencia de días entre dos fechas
    function dateDifference(date1: Date, date2 = new Date()) {
        const diff = (date1.getTime() - date2.getTime()) / oneDay;
        let result = Math.round(diff) + "d";
        if (Math.abs(diff) > 365) {
            result = Math.round(diff / 365) + "y";
        } else if (Math.abs(diff) < 1) {
            result = Math.round(diff * 24) + "h";
        }
        return result;
    }
</script>

<div id="calendars-container">
    {#each Object.entries($calendars) as [name, calendar]}
        {#if $selectedCalendars.includes(name)}
            <div
                class="calendar-block"
                style="--main-color:{calendar.color}{transparency.main};
            --main-color-hover:{calendar.color}{transparency.hover};
            --main-color-active:{calendar.color}{transparency.active}"
            >
                <h1>{name}</h1>
                <div class="events-container">
                    {#each calendar.events as event, index}
                        <EventCard
                            {event}
                            color={$calendars[event.calendar].color}
                        />
                        <TiempoRestante
                            text={dateDifference(new Date(event.date))}
                            {index}
                            color={$configuration.mainColor}
                        />
                    {/each}
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    #calendars-container {
        display: flex;
        padding: 1rem;
        gap: 1em;
        flex-direction: row;
        align-items: flex-start;
        text-align: center;
        height: 100%;
        max-width: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
    }

    .calendar-block {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background-color: var(--main-color);
        padding: 1em;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        min-width: 700px;
        max-width: 700px;
        max-height: 100%;
        overflow: auto;
        scroll-snap-align: center;
    }

    .events-container {
        display: flex;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
        overflow: auto;
        max-height: 100vh;
    }
</style>
