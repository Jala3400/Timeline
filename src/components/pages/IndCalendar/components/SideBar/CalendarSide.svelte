<script lang="ts">
    import {
        calendars,
        currentCalendar,
        currentDetails,
    } from "../../../../../store";
    import NavFolder from "../../../../molecules/NavFolder.svelte";
    import NeonButton from "../../../../atoms/NeonButton.svelte";
    import { createEventDispatcher } from "svelte";
    import CheckGroup from "../../../../molecules/CheckGroup.svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEventEvent() {
        dispatch("addEvent");
    }
</script>

<div id="calendars-side">
    <div id="side-main">
        <NavFolder name="Calendars">
            <CheckGroup
                radio={true}
                list={$calendars}
                bind:focusObject={$currentCalendar}
                click={(calendar) => {
                    $currentCalendar = calendar;
                    $currentDetails = "calendar";
                }}
                onDrop={() => ($calendars = $calendars)}
            />
        </NavFolder>
    </div>
    <div id="side-bottom">
        <NeonButton text={"Add Event"} func={addEventEvent} />
    </div>
</div>

<style>
    #calendars-side {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        padding: 5px;
        background-color: var(--bg-light);
        width: 100%;
        height: 100%;
    }
    #side-main,
    #side-bottom {
        width: 100%;
    }
</style>
