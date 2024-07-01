<script lang="ts">
    export let collapsed = false;
</script>

<div id="options" class:collapsed>
    <slot />
</div>

<button id="collapse-options" on:mousedown={() => (collapsed = !collapsed)}
    >C</button
>

<style>
    #options {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 10px;
        width: 100%;
        min-height: 2.25em;
        max-height: 2.25em;
        padding-left: 10px;
        padding-right: 2.75em;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        overflow: hidden;
    }
    #options.collapsed {
        min-height: 0;
        height: 0;
    }
    #collapse-options {
        position: absolute;
        right: 0;
        width: 2.5em;
        height: 2.5em;
        background-color: var(--bg-lighter);
        border: 1px solid var(--divider-color);
        border-top: none;
        border-radius: 0;
        border-bottom-left-radius: 8px;
        z-index: 1;
    }
</style>
