<script lang="ts">
    import { currentDetails } from "../../../store";
    import IconButton from "../../atoms/IconButton.svelte";
    export let currentMode: string = "multiCalendar";
</script>

<div id="icons-bar">
    <div id="icons-top">
        <IconButton text="H" />
    </div>
    <div id="icons-main">
        <IconButton
            text="M"
            func={() => {
                currentMode = "multiCalendar";
                $currentDetails = "allCalendars";
            }}
            selected={currentMode === "multiCalendar"}
        />
    </div>
</div>

<style>
    #icons-top {
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
    }
    #icons-main {
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        background-color: var(--bg-light);
        height: calc(100% - 2.5em);
        border-right: 1px solid var(--divider-color);
    }
</style>
