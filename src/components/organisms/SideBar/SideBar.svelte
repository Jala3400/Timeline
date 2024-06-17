<script lang="ts">
</script>

<div id="side-bar">
    <div id="side-top">
        <slot name="top" />
    </div>
    <div id="side-main">
        <slot name="main" />
    </div>
</div>

<style>
    #side-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
        gap: 5px;
    }
    #side-main {
        padding: 10px;
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
</style>
