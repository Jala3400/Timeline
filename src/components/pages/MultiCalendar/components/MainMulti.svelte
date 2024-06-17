<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import CalendarsList from "./Main/CalendarsList.svelte";
    import MultiEventsList from "./Main/MultiEventsList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: MultiEventsList,
        calendarsList: CalendarsList,
    };
</script>

<div id="main">
    <div id="main-top">
        <IconButton
            text="E"
            func={() => (currentView = "eventsList")}
            selected={currentView === "eventsList"}
        />
        <IconButton
            text="C"
            func={() => (currentView = "calendarsList")}
            selected={currentView === "calendarsList"}
        />
    </div>
    <div id="main-content">
        <svelte:component this={view[currentView]} />
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
        padding: 1rem;
    }
    #main {
        width: 100%;
        overflow: auto;
    }
</style>
