<script lang="ts">
    import type { Calendario } from "../../classes/Calendario";
    import { constants } from "../../store";

    export let list: { [key: string]: Calendario };
    export let group: string[];
    export let func = (key: string) => {};

    const transparency = $constants.transparency;
</script>

<div class="checkbox-group">
    {#each Object.entries(list) as [key, value]}
        <label
            class="side-checkbox"
            style="--main-color:{value.color}{transparency.low};
            --main-color-hover:{value.color}{transparency.hover};
            --main-color-active:{value.color}{transparency.active};
            --main-color-full:{value.color}{transparency.full}"
        >
            <input
                type="checkbox"
                class="checkbox"
                value={key}
                bind:group
                on:change={() => func(key)}
            />
            <span class="checkbox-label">{key}</span>
        </label>
    {/each}
</div>

<style>
    .side-checkbox {
        background-color: var(--main-color);
        padding: 5px 10px;
        margin: 5px;
        border-radius: 8px;

        cursor: pointer;
        user-select: none;

        display: grid;
        grid-template-columns: 1em auto;
        align-items: center;
        gap: 0.25em;
    }
    .side-checkbox:hover {
        background-color: var(--main-color-hover);
    }
    .side-checkbox:has(> .checkbox:checked) {
        background-color: var(--main-color-hover);
    }
    .side-checkbox:hover:has(> .checkbox:checked) {
        background-color: var(--main-color-active);
    }
    .checkbox-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .checkbox {
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff0;
        margin: 0;
        width: 1em;
        height: 1em;
        border-radius: 100%;
        display: grid;
        cursor: pointer;
    }
    .checkbox:checked::before {
        content: "";
        background-color: var(--main-color-full);
        border-radius: 100%;
    }
</style>
