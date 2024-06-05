<script lang="ts">
    import EventCard from "../../../atoms/EventCard/EventCard.svelte";
    import TiempoRestante from "../../../atoms/TiempoRestante/TiempoRestante.svelte";
    import { calendars, configuration, eventsList } from "../../../../store";

    $: diffColor = $configuration.mainColor;

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

<div id="events-container">
    {#each $eventsList as event, index}
        <EventCard {event} {index} color={$calendars[event.calendar].color} />
        <TiempoRestante
            text={dateDifference(new Date(event.date))}
            {index}
            color={diffColor}
        />
    {/each}
</div>

<style>
    #events-container {
        display: flex;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
</style>
