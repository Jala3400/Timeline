<script lang="ts">
    import { calendars, currentDetails } from "../../../../../store";
    import NavFolder from "../../../../molecules/NavFolder.svelte";
    import NeonButton from "../../../../atoms/NeonButton.svelte";
    import NavCheckGroup from "../../../../molecules/CheckGroup.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEventEvent() {
        dispatch("addEvent");
    }
</script>

<div id="calendars-side">
    <div id="side-main">
        <NavFolder name="Calendars">
            <NavCheckGroup
                list={$calendars}
                click={() => ($currentDetails = "allCalendars")}
                change={() => ($calendars = $calendars)}
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
