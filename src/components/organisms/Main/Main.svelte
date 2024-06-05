<script lang="ts">
    import IconCard from "../../atoms/IconCard/IconCard.svelte";
    import EventsList from "./EventsList/EventsList.svelte";
</script>

<div>
    <div id="main-top">
        <IconCard text="#" />
    </div>
    <div id="main">
        <EventsList />
    </div>
</div>

<style>
    #main-top {
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
    }
    #main {
        padding: 1rem;
        overflow: auto;
        display: flex;
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        height: calc(100% - 2.5em);
    }
</style>
