<script lang="ts">
    import IconCard from "../../../atoms/IconCard.svelte";
    import CalendarsList from "./Main/CalendarsList.svelte";
    import EventsList from "./Main/EventsList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: EventsList,
        calendarsList: CalendarsList,
    };
</script>

<div id="main">
    <div id="main-top">
        <IconCard text="E" func={() => (currentView = "eventsList")} />
        <IconCard text="C" func={() => (currentView = "calendarsList")} />
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
