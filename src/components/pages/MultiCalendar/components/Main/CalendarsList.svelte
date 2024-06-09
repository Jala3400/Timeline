<script lang="ts">
    import { calendars, selectedCalendars } from "../../../../../store";
    import CalendarBlock from "../../../../organisms/CalendarBlock/CalendarBlock.svelte";
</script>

<div id="calendars-container">
    {#each Object.entries($calendars) as [name, calendar]}
        {#if $selectedCalendars.includes(name)}
            <CalendarBlock {calendar} />
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
</style>
