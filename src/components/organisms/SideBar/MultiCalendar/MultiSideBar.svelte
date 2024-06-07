<script lang="ts">
    import IconCard from "../../../atoms/IconCard.svelte";
    import CalendarsSide from "./CalendarsSide/CalendarsSide.svelte";
</script>

<div id="side-bar">
    <div id="side-top">
        <IconCard text="B" />
    </div>
    <div id="side-main">
        <CalendarsSide on:addEvent/>
    </div>
</div>

<style>
    #side-main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        background-color: var(--bg-light);
        width: 100%;
        height: calc(100% - 2.5em);
        border-right: 1px solid var(--divider-color);
    }

    #side-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
    }
</style>
