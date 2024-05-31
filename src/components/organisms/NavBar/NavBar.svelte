<script lang="ts">
    import {
        calendars,
        currentDetails,
        currentEvent,
        selectedCalendars,
        configuration,
    } from "../../../store";
    import NavFolder from "../../atoms/NavFolder/NavFolder.svelte";
    import NeonButton from "../../atoms/NeonButton/NeonButton.svelte";
    import NavCheckGroup from "../../molecules/NavCheckGroup/NavCheckGroup.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function addEventEvent() {
        dispatch("addEvent");
    }

    function displayAllCalendars() {
        $currentDetails = {
            type: "allCalendars",
            color: "#454545",
        };
        $currentEvent = {};
    }
</script>

<div id="nav-bar">
    <div id="nav-top">
        <NavFolder name="Calendars">
            <NavCheckGroup
                list={$calendars}
                bind:group={$selectedCalendars}
                func={displayAllCalendars}
            />
        </NavFolder>
    </div>
    <div id="nav-bottom">
        <NeonButton text={"Add Event"} func={addEventEvent} />
    </div>
</div>

<style>
    #nav-bar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        padding: 5px;
        background-color: var(--main-background-light);
    }
    #nav-top,
    #nav-bottom {
        width: 100%;
    }
</style>
