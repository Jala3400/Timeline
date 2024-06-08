<script lang="ts">
    import { currentDetails } from "../../../store";
    import IconCard from "../../atoms/IconCard.svelte";
    export let currentMode: string = "multiCalendar";
</script>

<div id="icons-bar">
    <div id="icons-top">
        <IconCard text="H" />
    </div>
    <div id="icons-main">
        <IconCard
            text="M"
            func={() => {
                currentMode = "multiCalendar";
                $currentDetails = "allCalendars";
            }}
        />
        <IconCard
            text="I"
            func={() => {
                currentMode = "indCalendar";
                $currentDetails = "allCalendars";
            }}
        />
    </div>
</div>

<style>
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
    #icons-top {
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
    }
</style>
