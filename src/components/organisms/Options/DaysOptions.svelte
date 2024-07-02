<script lang="ts">
    import {
        dateToString,
        load3daysOpt,
        save3daysOpt,
    } from "../../../lib/ManageEvents";
    import Options from "../../templates/Options/Options.svelte";

    export let focusDay: Date;
    export let days: number;
    export let offset: number;

    let conf = load3daysOpt();
    days = conf.days;
    offset = conf.offset;

    $: sessionStorage.setItem("focusDay-3days", JSON.stringify(focusDay));
    focusDay = new Date(
        JSON.parse(
            sessionStorage.getItem("focusDay-3days") || JSON.stringify(focusDay)
        )
    );

    function checkFocusDay() {
        if (days < offset + 1) {
            offset = days - 1;
        }
    }
</script>

<Options>
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
                on:mousedown={() => {
                    offset = index;
                    save3daysOpt({ days, offset });
                }}
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
            on:input={() => {
                checkFocusDay();
                save3daysOpt({ days, offset });
            }}
            max="7"
            min="1"
        />
    </label>
</Options>

<style>
    input {
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
