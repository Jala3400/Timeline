<script lang="ts">
    import { dateToString } from "../../../lib/ManageEvents";

    export let focusDay: Date;
    export let days: number;
    export let offset: number;

    let collapsed = false;
</script>

<button id="collapse-options" on:mousedown={() => (collapsed = !collapsed)}
    >C</button
>
<div id="options" class:collapsed>
    <label for="focus-day-input">
        Focus day:
        <input
            id="focus-day-input"
            type="date"
            value={dateToString(focusDay).split("T")[0]}
            on:change={(e) => {
                focusDay = new Date(e.target.value);
                focusDay.setHours(0, 0, 0, 0);
            }}
        />
    </label>
    <div id="offset">
        {#each Array(days) as _, index}
            <button
                class="offset-button"
                on:mousedown={() => (offset = index)}
                class:offset-selected={index == offset}
            >
                {index}
            </button>
        {/each}
    </div>
    <label for="num-days-input">
        Days:
        <input
            id="num-days-input"
            type="number"
            bind:value={days}
            max="7"
            min="1"
        />
    </label>
</div>

<style>
    #options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 2.5em;
        padding-left: 10px;
        padding-right: 2.75em;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        overflow: hidden;
    }
    #options.collapsed {
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
    #options input {
        width: 10em;
    }
    #offset {
        display: flex;
        background-color: var(--divider-color);
        border: 1px solid var(--divider-color);
        gap: 1px;
        border-radius: 12px;
        overflow: hidden;
    }
    .offset-button {
        width: 2em;
        height: 2em;
        background-color: var(--bg-light);
        border-radius: 0;
        opacity: 0.5;
    }
    .offset-button.offset-selected {
        opacity: 1;
    }
</style>
