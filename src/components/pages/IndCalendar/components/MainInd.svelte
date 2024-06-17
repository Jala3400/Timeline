<script lang="ts">
    import { currentDetails } from "../../../../store";
    import IconButton from "../../../atoms/IconButton.svelte";
    import CalendarPlan from "./Main/CalendarPlan.svelte";
    import IndEventList from "./Main/IndEventList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: IndEventList,
        calendarPlan: CalendarPlan,
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
            text="P"
            func={() => {
                currentView = "calendarPlan";
                $currentDetails = "calendar";
            }}
            selected={currentView === "calendarPlan"}
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
