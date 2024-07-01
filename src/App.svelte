<script lang="ts">
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import MultiCalendar from "./components/pages/MultiCalendar/MultiCalendars.svelte";
    import { loadEvents, saveCalendars } from "./lib/ManageEvents";
    import { calendars, currentEvent, eventsList } from "./store";

    // Main panel
    let currentMode: string = "multiCalendar";
    let page: { [key: string]: any } = {
        multiCalendar: MultiCalendar,
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
        savedOn = true;
        setTimeout(() => {
            savedOn = false;
        }, 2000);
    }

    // Keyboard shortcuts
    // document.addEventListener("keydown", (event) => {
    //     if (
    //         event.ctrlKey &&
    //         !event.altKey &&
    //         !event.shiftKey &&
    //         !event.metaKey
    //     ) {
    //         switch (event.key) {
    //             case "m":
    //                 event.preventDefault();
    //                 currentMode = "multiCalendar";
    //                 break;
    //         }
    //     }
    // });
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
        transition: opacity 0.5s;
    }
    #saved.savedOn {
        opacity: 1;
    }
</style>
