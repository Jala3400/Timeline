<script lang="ts">
    import Options from "../../templates/Options/Options.svelte";

    export let focusDate: Date;

    $: shortYear = focusDate.getFullYear().toString().slice(-2);
    let shortMonth = focusDate.toLocaleString("default", { month: "short" });
</script>

<Options>
    <div id="date-input">
        <div class="special-input">
            <button
                class="special-button"
                on:click={() => {
                    focusDate.setMonth(focusDate.getMonth() - 1);
                    focusDate = focusDate;
                    shortMonth = focusDate.toLocaleString("default", {
                        month: "short",
                    });
                }}>{"<"}</button
            >
            <input
                type="number"
                class="special-input-value"
                value={shortYear}
            />
            <span class="special-input-value">{shortMonth}</span>
            <button
                class="special-button"
                on:click={() => {
                    focusDate.setMonth(focusDate.getMonth() + 1);
                    focusDate = focusDate;
                    shortMonth = focusDate.toLocaleString("default", {
                        month: "short",
                    });
                }}>{">"}</button
            >
        </div>
        <button
            id="today-button"
            on:click={() => {
                focusDate = new Date();
            }}>Today</button
        >
    </div>
</Options>

<style>
    #date-input {
        display: flex;
        justify-content: center;
        gap: 1em;
    }
    .special-input {
        display: flex;
        background-color: var(--divider-color);
        border: 1px solid var(--divider-color);
        gap: 1px;
        border-radius: 12px;
        overflow: hidden;
    }
    .special-input-value {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0;
        width: 2em;
        background-color: var(--bg-light);
        border: none;
        border-radius: 0;
    }
    .special-button {
        width: 2em;
        height: 2em;
        background-color: var(--bg-light);
        border-radius: 0;
    }
    #today-button {
        height: 2em;
        background-color: var(--bg-light);
        border-radius: 8px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
