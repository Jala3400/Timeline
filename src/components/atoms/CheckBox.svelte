<script lang="ts">
    import { constants } from "../../store";

    export let color = "#FF0000";
    export let radio = false;
    export let value;
    export let index = 0;
    export let focusObject: any = {};
    export let change = (key: string) => {};
    export let click = (key: any) => {};
    export let onDragStart = (e: DragEvent, index: number) => {};
    export let onDragOver = (e: DragEvent) => {};
    export let onDropLocal = (e: DragEvent, index: number) => {};
    export let onDrop = (key: any) => {};

    const transparency = $constants.transparency;
    let isHovered = false;
    let isActive = false;

    $: bgColor = isHovered
        ? color + transparency.hover
        : color + transparency.main;
    $: activeColor = isActive ? color + transparency.active : bgColor;
</script>

<label
    class="side-checkbox"
    style="background-color: {activeColor};"
    draggable="true"
    on:dragstart={(e) => onDragStart(e, index)}
    on:dragover={onDragOver}
    on:drop={(e) => {
        onDropLocal(e, index);
        onDrop(value);
    }}
>
    {#if radio}
        <input
            type="radio"
            class="checkbox"
            {value}
            bind:group={focusObject}
            on:change={() => change(value)}
            on:click={() => click(value)}
        />
    {:else}
        <input
            type="checkbox"
            class="checkbox"
            value={value.name}
            bind:checked={value.selected}
            on:change={() => change(value)}
            on:click={() => click(value)}
        />
    {/if}
    <span class="checkbox-label">{value.name}</span>
</label>

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
        gap: 5px;
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
        aspect-ratio: 1/1;
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
