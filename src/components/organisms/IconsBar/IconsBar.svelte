<script lang="ts">
    import { currentDetails } from "../../../store";
    import IconButton from "../../atoms/IconButton.svelte";
    export let currentMode: string = "absoluteList";

    export let hideSidebar: boolean = false;
</script>

<div id="icons-bar">
    <div id="icons-top">
        <IconButton text="H" func={() => (hideSidebar = !hideSidebar)} />
    </div>
    <div id="icons-main">
        <IconButton
            text="M"
            func={() => {
                currentMode = "mainPage";
                $currentDetails = "allCalendars";
            }}
            selected={currentMode === "mainPage"}
        />
        <IconButton
            text="O"
            func={() => {
                currentMode = "organization";
                $currentDetails = "allCalendars";
            }}
            selected={currentMode === "oragnization"}
        />
        <IconButton
            text="L"
            func={() => {
                currentMode = "absoluteList";
                $currentDetails = "allCalendars";
            }}
            selected={currentMode === "absoluteList"}
        />
        <IconButton
            text="R"
            func={() => {
                currentMode = "realTime";
                $currentDetails = "allCalendars";
            }}
            selected={currentMode === "realTime"}
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
