<script>
    import IconCard from "../../atoms/IconCard/IconCard.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para ocultar la barra lateral
    function hideSideBar() {
        dispatch("hideSideBar");
    }
</script>

<div id="icons-bar">
    <div id="icons-top">
        <IconCard func={hideSideBar} text="H" />
    </div>
    <div id="icons-main">
        <IconCard text="~" />
        <IconCard text="~" />
    </div>
</div>

<style>
    #icons-main {
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
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
