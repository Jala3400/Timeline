<script lang="ts">
    import { calendars } from "../../../../../store";
    import CalendarBlock from "../../../../organisms/CalendarBlock/CalendarBlock.svelte";
    import { onMount } from "svelte";

    let thisContainer: HTMLDivElement;

    onMount(() => {
        thisContainer.scrollLeft = 0;
    });
</script>

<div id="calendars-container" bind:this={thisContainer}>
    {#each $calendars as calendar}
        {#if calendar.selected}
            <CalendarBlock {calendar} />
        {/if}
    {/each}
</div>

<style>
    #calendars-container {
        display: flex;
        gap: 1em;
        flex-direction: row;
        align-items: flex-start;
        text-align: center;
        height: 100%;
        width: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 1rem;
    }
</style>
