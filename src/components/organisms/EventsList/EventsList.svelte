<script lang="ts">
    import EventCard from "../../molecules/EventCard.svelte";
    import TiempoRestante from "../../atoms/TiempoRestante.svelte";
    import { calendars, configuration } from "../../../store";
    import { dateDifference } from "../../../lib/ManageEvents";
    import type { Evento } from "../../../classes/Evento";

    export let eventsList: Evento[] = [];

    $: diffColor = $configuration.mainColor;
</script>

<div id="events-container">
    {#each eventsList as event, index}
        <EventCard {event} color={$calendars[event.calendar].color} />
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
        padding: 1rem;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
</style>
