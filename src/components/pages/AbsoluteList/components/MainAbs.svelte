<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import CalendarsList from "./Main/CalendarsList.svelte";
    import MultiEventsList from "./Main/AllEventsList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: MultiEventsList,
        calendarsList: CalendarsList,
    };

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
        if (
            event.ctrlKey &&
            !event.altKey &&
            !event.shiftKey &&
            !event.metaKey
        ) {
            switch (event.key) {
                case "1":
                case "e":
                    event.preventDefault();
                    currentView = "eventsList";
                    break;
                case "2":
                case "l":
                    event.preventDefault();
                    currentView = "calendarsList";
                    break;
            }
        }
    });
</script>

<div id="main">
    <div id="main-top">
        <IconButton
            text="E"
            func={() => (currentView = "eventsList")}
            selected={currentView === "eventsList"}
        />
        <IconButton
            text="L"
            func={() => (currentView = "calendarsList")}
            selected={currentView === "calendarsList"}
        />
    </div>
    <div id="main-content">
        <svelte:component this={view[currentView]} on:addEvent />
    </div>
</div>

<style>
    #main-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
        gap: 5px;
    }
    #main-content {
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        height: calc(100% - 2.5em);
    }
    #main {
        width: 100%;
        overflow: auto;
    }
</style>
