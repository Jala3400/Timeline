<script lang="ts">
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import MultiCalendar from "./components/pages/MultiCalendar/MultiCalendars.svelte";
    import RealTime from "./components/pages/RealTime/RealTime.svelte";
    import { loadEvents, saveCalendars } from "./lib/ManageEvents";
    import {
        calendars,
        configuration,
        constants,
        currentEvent,
        eventsList,
    } from "./store";

    // Main panel
    let currentMode: string = "multiCalendar";
    let page: { [key: string]: any } = {
        multiCalendar: MultiCalendar,
        realTime: RealTime,
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
    document.addEventListener("keydown", (event) => {
        if (
            !event.ctrlKey &&
            event.altKey &&
            !event.shiftKey &&
            !event.metaKey
        ) {
            switch (event.key) {
                case "1":
                case "m":
                    event.preventDefault();
                    currentMode = "multiCalendar";
                    break;
                case "2":
                case "r":
                    event.preventDefault();
                    currentMode = "realTime";
                    break;
            }
        }
    });

    const transparency = $constants.transparency;
</script>

<div
    id="main-container"
    style="
    --main-color-pure: {$configuration.mainColor};
--main-color: {$configuration.mainColor}{transparency.main};
--main-color-hover: {$configuration.mainColor}{transparency.hover};
--main-color-active: {$configuration.mainColor}{transparency.active};
"
>
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
