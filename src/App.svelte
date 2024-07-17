<script lang="ts">
    import IconButton from "./components/atoms/IconButton.svelte";
    import EditEventModal from "./components/Modals/EditEventModal.svelte";
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import AbsoluteList from "./components/pages/AbsoluteList/AbsoluteList.svelte";
    import MainPage from "./components/pages/MainPage/MainPage.svelte";
    import Organization from "./components/pages/Organization/Organization.svelte";
    import RealTime from "./components/pages/RealTime/RealTime.svelte";
    import { loadEvents, saveCalendars } from "./lib/ManageEvents";
    import {
        calendars,
        configuration,
        constants,
        currentEvent,
        displayModal,
        eventsList,
    } from "./store";

    // Main panel
    let currentMode: string = "mainPage";
    let page: { [key: string]: any } = {
        mainPage: MainPage,
        organization: Organization,
        absoluteList: AbsoluteList,
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
                    currentMode = "mainPage";
                    break;
                case "2":
                case "o":
                    event.preventDefault();
                    currentMode = "organization";
                    break;
                case "3":
                case "l":
                    event.preventDefault();
                    currentMode = "absoluteList";
                    break;
                case "4":
                case "r":
                    event.preventDefault();
                    currentMode = "realTime";
                    break;
            }
        }
    });

    const transparency = $constants.transparency;
    let hideSidebar: boolean = false;
    let hideDetails: boolean = false;
    let editEventModal: boolean = false;

    displayModal.subscribe((value) => {
        if (value.name === "eventDetails") {
            editEventModal = true;
        }
    });
</script>

<div
    id="main-container"
    class:hideSidebar
    class:hideDetails
    style="
    --main-color-pure: {$configuration.mainColor};
--main-color: {$configuration.mainColor}{transparency.main};
--main-color-hover: {$configuration.mainColor}{transparency.hover};
--main-color-active: {$configuration.mainColor}{transparency.active};
"
>
    <IconsBar bind:currentMode bind:hideSidebar />
    <svelte:component this={page[currentMode]} />
    <div id="hide-details">
        <IconButton text="H" func={() => (hideDetails = !hideDetails)} />
    </div>
</div>
<div id="saved" class:savedOn>Saved</div>

<EditEventModal bind:editEventModal />

<style>
    #main-container {
        display: grid;
        grid-template: 100% / 2.5rem 1fr 3fr 1.2fr;
        width: 100%;
        height: 100%;
    }
    #main-container.hideSidebar {
        grid-template: 100% / 2.5rem 0fr 4fr 1.2fr;
    }
    #main-container.hideDetails {
        grid-template: 100% / 2.5rem 1fr 4.2fr 0fr;
    }
    #main-container.hideDetails.hideSidebar {
        grid-template: 100% / 2.5rem 0fr 1fr 0fr;
    }
    #hide-details {
        position: absolute;
        right: 2px;
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
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
