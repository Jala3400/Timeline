<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import MonthCalendar from "./Main/MonthCalendar.svelte";
    import MultDays from "./Main/MultDays.svelte";

    let currentView: string = "day";
    let view: { [key: string]: any } = {
        day: MultDays,
        monthCalendar: MonthCalendar,
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
                case "d":
                    event.preventDefault();
                    currentView = "day";
                    break;
                case "2":
                case "c":
                    event.preventDefault();
                    currentView = "monthCalendar";
                    break;
            }
        }
    });
</script>

<div id="main">
    <div id="main-top">
        <IconButton
            text="D"
            func={() => (currentView = "day")}
            selected={currentView === "day"}
        />
        <IconButton
            text="C"
            func={() => (currentView = "monthCalendar")}
            selected={currentView === "monthCalendar"}
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
