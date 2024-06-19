<script lang="ts">
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import MultiCalendar from "./components/pages/MultiCalendar/MultiCalendars.svelte";
    import IndCalendar from "./components/pages/IndCalendar/IndCalendar.svelte";
    import { loadEvents, saveCalendars } from "./lib/ManageEvents";
    import { calendars, currentEvent, eventsList } from "./store";

    // Main panel
    let currentMode: string = "multiCalendar";
    let page: { [key: string]: any } = {
        multiCalendar: MultiCalendar,
        indCalendar: IndCalendar,
    };
    loadEvents();
    $currentEvent = $eventsList[0];

    let savedOn = false;

    let timer: NodeJS.Timeout;

    calendars.subscribe((value) => {
        // Debounce saving
        clearTimeout(timer);
        timer = setTimeout(() => {
            saveCalendars();
            savedNotification();
        }, 1000);
    });

    function savedNotification() {
        console.log("saved");
        savedOn = true;
        setTimeout(() => {
            savedOn = false;
        }, 2000);
    }
</script>

<div id="main-container">
    <IconsBar bind:currentMode />
    <svelte:component this={page[currentMode]} />
</div>
<div id="saved" class:savedOn>Saved</div>

<style>
    #main-container {
        display: flex;
        height: 100%;
    }
    #saved {
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: var(--bg-lighter);
        padding: 5px;
        border-top-left-radius: 8px;
        opacity: 0;
    }
    #saved.savedOn {
        opacity: 1;
        transition: opacity 0.5s;
    }
</style>
