<script lang="ts">
    import Options from "../../templates/Options/Options.svelte";

    export let focusDate: Date;

    $: sessionStorage.setItem("focusDate-calendar", JSON.stringify(focusDate));
    focusDate = new Date(
        JSON.parse(
            sessionStorage.getItem("focusDate-calendar") ||
                JSON.stringify(focusDate)
        )
    );

    $: shortYear = focusDate.getFullYear().toString();
    $: shortMonth = focusDate.toLocaleString("en-US", { month: "short" });

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
</script>

<Options>
    <div id="date-input">
        <div class="special-input">
            <button
                class="special-button"
                on:click={() => {
                    focusDate.setMonth(focusDate.getMonth() - 1);
                    focusDate = focusDate;
                }}>{"<"}</button
            >
            <input
                id="year-input"
                type="number"
                class="special-input-value"
                value={shortYear}
                on:change={(e) => {
                // @ts-ignore 'e.target' is possibly 'null'.
                    focusDate.setFullYear(parseInt(e.target.value));
                    focusDate = focusDate;
                }}
            />
            <select
                id="month-input"
                class="special-input-value"
                value={shortMonth}
                on:change={(e) => {
                // @ts-ignore 'e.target' is possibly 'null'.
                    focusDate.setMonth(months.indexOf(e.target.value));
                    focusDate = focusDate;
                }}
            >
                {#each months as month}
                    <option value={month}>{month}</option>
                {/each}
            </select>
            <button
                class="special-button"
                on:click={() => {
                    focusDate.setMonth(focusDate.getMonth() + 1);
                    focusDate = focusDate;
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
    #year-input {
        width: 3em;
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
    #year-input::-webkit-outer-spin-button,
    #year-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-indent: 1px;
        text-overflow: "";
    }
</style>
