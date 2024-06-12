<script lang="ts">
    import { currentDetails } from "../../../../store";
    import IconCard from "../../../atoms/IconCard.svelte";
    import CalendarPlan from "./Main/CalendarPlan.svelte";
    import IndEventsList from "./Main/EventList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: IndEventsList,
        calendarPlan: CalendarPlan,
    };
</script>

<div id="main">
    <div id="main-top">
        <IconCard text="E" func={() => (currentView = "eventsList")} />
        <IconCard
            text="P"
            func={() => {
                currentView = "calendarPlan";
                $currentDetails = "calendar";
            }}
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
