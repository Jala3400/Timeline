<script lang="ts">
    import { constants } from "../../store";
    // import NavChild from "../NavChild/NavChild.svelte";

    export let expanded = true;
    export let name: string;
    // export let files: any[] = [];

    const color = $constants.discreteColor;
    const transparency = $constants.transparencyApp;

    /// Cambia el estado de la carpeta
    function toggle() {
        expanded = !expanded;
    }
</script>

<div class="nav-folder">
    <button
        class="side-folder"
        class:expanded
        style="--bg:{color}{transparency.none};
        --bg-light:{color}{transparency.light};
        --bg-hover:{color}{transparency.main}"
        on:click={toggle}
    >
        <div class="collapse-icon" class:is-collapsed={!expanded}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="svg-icon"><path d="M3 8L12 17L21 8"></path></svg
            >
        </div>
        <div class="folder-name">{name}</div>
    </button>
    <div class="folder-content">
        {#if expanded}
            <!-- {#if files.length != 0}
                <ul>
                    {#each files as file}
                        <li>
                            {#if file.files}
                                <svelte:self {...file} />
                            {:else}
                                <NavChild {...file} />
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if} -->
            {#if $$slots}
                <slot />
            {/if}
        {/if}
    </div>
</div>

<style>
    .nav-folder {
        width: 100%;
    }
    .side-folder {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: transparent;
        font-size: medium;
        width: 100%;
        border-radius: 6px;
        background-color: var(--bg);
    }
    .side-folder.expanded {
        background-color: var(--bg-light);
    }
    .side-folder:hover {
        background-color: var(--bg-hover);
    }
    .folder-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .folder-content {
        padding-left: 6px;
        margin-top: 5px;
        border-left: 1px solid #808080;
        margin-left: 12px;
    }
    .collapse-icon {
        display: flex;
    }
    .svg-icon {
        width: 0.75em;
        aspect-ratio: 1/1;
    }
    .collapse-icon.is-collapsed .svg-icon {
        transform: rotate(-90deg);
    }
    /* ul {
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
        border-left: 1px solid rgba(128, 128, 128, 0.4);
    }

    li {
        padding: 0.2em 0;
    } */
</style>
