<script lang="ts">
    import EventCard from "../../molecules/EventCard.svelte";
    import TiempoRestante from "../../atoms/TiempoRestante.svelte";
    import {
        calendars,
        configuration,
        currentCalendar,
        currentDetails,
    } from "../../../store";
    import { dateDifference } from "../../../lib/ManageEvents";
    import type { Evento } from "../../../classes/Evento";

    export let eventsList: Evento[] = [];

    $: diffColor = $configuration.mainColor;
</script>

<div id="events-container">
    {#each eventsList as event}
        <EventCard {event} color={$calendars[event.calendar].color} />
        <TiempoRestante
            text={dateDifference(new Date(event.date))}
            color={diffColor}
            func={() => {
                // Al hacer click en el tiempo restante, se cambian los detalles al calendario del evento.
                $currentCalendar = $calendars[event.calendar];
                $currentDetails = "calendar";
            }}
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
