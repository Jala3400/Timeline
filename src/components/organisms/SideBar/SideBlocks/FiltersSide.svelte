<script lang="ts">
    import NeonButton from "../../../atoms/NeonButton.svelte";
    import { createEventDispatcher } from "svelte";
    import Filter from "../../Filter/Filter.svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEvent() {
        dispatch("addEvent");
    }
</script>

<div id="filters-side">
    <div id="side-main">
        <Filter />
    </div>
    <div id="side-bottom">
        <NeonButton text={"Add Event"} func={addEvent} />
    </div>
</div>

<style>
    #filters-side {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        background-color: var(--bg-light);
        width: 100%;
        height: 100%;
    }
    #side-main {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    #side-main,
    #side-bottom {
        width: 100%;
    }
</style>
