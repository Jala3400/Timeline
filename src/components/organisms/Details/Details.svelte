<script lang="ts">
    import { currentDetails } from "../../../store";
    import CalendarDetails from "./DetailBlocks/CalendarDetails.svelte";
    import EventDetails from "./DetailBlocks/EventDetails.svelte";
    import AllCalendarsDetails from "./DetailBlocks/AllCalendarsDetails.svelte";
    import IconButton from "../../atoms/IconButton.svelte";
    import Tasks from "./DetailBlocks/Tasks.svelte";

    let details: { [key: string]: any } = {
        allCalendars: AllCalendarsDetails,
        calendar: CalendarDetails,
        event: EventDetails,
        tasks: Tasks,
    };

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
        if (
            event.ctrlKey &&
            event.altKey &&
            !event.shiftKey &&
            !event.metaKey
        ) {
            switch (event.key) {
                case "|":
                case "a":
                    event.preventDefault();
                    $currentDetails = "allCalendars";
                    break;
                case "@":
                case "c":
                    event.preventDefault();
                    $currentDetails = "calendar";
                    break;
                case "#":
                case "€":
                    event.preventDefault();
                    $currentDetails = "event";
                    break;
                case "4":
                case "t":
                    event.preventDefault();
                    $currentDetails = "tasks";
                    break;
            }
        }
    });
</script>

<div id="details-container">
    <div id="details-top">
        <IconButton
            text="A"
            selected={$currentDetails === "allCalendars"}
            func={() => ($currentDetails = "allCalendars")}
        />
        <IconButton
            text="C"
            selected={$currentDetails === "calendar"}
            func={() => ($currentDetails = "calendar")}
        />
        <IconButton
            text="E"
            selected={$currentDetails === "event"}
            func={() => ($currentDetails = "event")}
        />
        <IconButton
            text="T"
            selected={$currentDetails === "tasks"}
            func={() => ($currentDetails = "tasks")}
        />
    </div>
    <div id="current-details">
        <svelte:component this={details[$currentDetails]} />
    </div>
</div>

<style>
    #details-container {
        overflow: hidden;
    }
    #current-details {
        background-color: var(--bg-light);
        padding: 1em;
        text-align: unset;
        display: flex;
        flex-direction: column;
        height: calc(100% - 2.5em);
        border-left: 1px solid var(--divider-color);
    }
    #details-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
        gap: 5px;
    }
</style>
