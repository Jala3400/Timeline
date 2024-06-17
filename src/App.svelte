<script lang="ts">
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import MultiCalendar from "./components/pages/MultiCalendar/MultiCalendars.svelte";
    import IndCalendar from "./components/pages/IndCalendar/IndCalendar.svelte";
    import { loadEvents } from "./lib/ManageEvents";
    import { currentEvent, eventsList } from "./store";

    // Main panel
    let currentMode: string = "multiCalendar";
    let page: { [key: string]: any } = {
        multiCalendar: MultiCalendar,
        indCalendar: IndCalendar,
    };
    loadEvents();
    $currentEvent = $eventsList[0];
</script>

<div id="main-container">
    <IconsBar bind:currentMode />
    <svelte:component this={page[currentMode]} />
</div>

<style>
    #main-container {
        display: flex;
        height: 100%;
    }
</style>
