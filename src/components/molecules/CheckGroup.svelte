<script lang="ts">
    export let list: any[];
    export let radio: boolean = false;
    export let focusObject: any;
    // export let group: any[] = [];
    // export let checked: boolean = false;
    export let change = (key: string) => {};
    export let click = (key: any) => {};
    export let onDrop = (key: any) => {};

    function onDragStart(e: DragEvent, index: number) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "calendar");
            e.dataTransfer.setData("index", JSON.stringify(index));
        }
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDropLocal(e: DragEvent, index: number) {
        if (e.dataTransfer && e.dataTransfer.getData("type") === "calendar") {
            e.preventDefault();
            const indexDragged = JSON.parse(e.dataTransfer.getData("index"));
            list.splice(index, 0, list.splice(indexDragged, 1)[0]);
        }
    }
</script>

<div class="checkbox-group">
    {#each list as value, index}
        <label
            class="side-checkbox"
            style="--main-color-pure: var(--{value.id}-color-pure);
    --main-color: var(--{value.id}-color);
    --main-color-hover: var(--{value.id}-color-hover);
    --main-color-active: var(--{value.id}-color-active);"
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
        background-color: var(--main-color-pure);
        border-radius: 100%;
    }
</style>
