<script lang="ts">
    import Options from "../../templates/Options/Options.svelte";

    export let focusDate: Date;

    let shortYear = focusDate.getFullYear().toString().slice(-2);
    let shortMonth = focusDate.toLocaleString("default", { month: "short" });
</script>

<Options>
    <div class="special-input">
        <button
            class="special-button"
            on:click={() => {
                focusDate.setFullYear(focusDate.getFullYear() - 1);
                focusDate = focusDate;
                shortYear = focusDate.getFullYear().toString().slice(-2);
            }}>{"<"}</button
        >
        <input type="number" class="special-input-value" value={shortYear} />
        <button
            class="special-button"
            on:click={() => {
                focusDate.setFullYear(focusDate.getFullYear() + 1);
                focusDate = focusDate;
                shortYear = focusDate.getFullYear().toString().slice(-2);
            }}>{">"}</button
        >
    </div>
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
</Options>

<style>
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
