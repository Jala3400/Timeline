<script lang="ts">
    import IconCard from "../../../atoms/IconCard.svelte";
    import IndEventsList from "./IndEventsList/IndEventsList.svelte";

    let currentView: string = "eventsList";
    let view: { [key: string]: any } = {
        eventsList: IndEventsList,
    };
</script>

<div id="main">
    <div id="main-top">
        <IconCard text="E" func={() => (currentView = "eventsList")} />
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
        gap: 0.5em;
        flex-direction: column;
        align-items: center;
        text-align: center;
        height: calc(100% - 2.5em);
    }
    #main {
        width: 100%;
        overflow: auto;
    }
</style>
