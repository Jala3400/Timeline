<script lang="ts">
    import { dateToString } from "../../../lib/ManageEvents";
    import Options from "../../templates/Options/Options.svelte";

    export let startDate: Date;
    export let endDate: Date;
    export let filtByDate: boolean;

    $: sessionStorage.setItem("startDate-AllEvents", JSON.stringify(startDate));
    startDate = new Date(
        JSON.parse(
            sessionStorage.getItem("startDate-AllEvents") ||
                JSON.stringify(startDate)
        )
    );

    $: sessionStorage.setItem("endDate-AllEvents", JSON.stringify(endDate));
    endDate = new Date(
        JSON.parse(
            sessionStorage.getItem("endDate-AllEvents") ||
                JSON.stringify(endDate)
        )
    );

    $: sessionStorage.setItem(
        "filtByDate-AllEvents",
        JSON.stringify(filtByDate)
    );
    filtByDate = JSON.parse(
        sessionStorage.getItem("filtByDate-AllEvents") ||
            JSON.stringify(filtByDate)
    );

    function checkEndDate() {
        if (endDate < startDate) {
            endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        }
    }

    function checkStartDate() {
        if (startDate > endDate) {
            startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
        }
    }
</script>

<Options
    ><label for="filtByDate" class="side-checkbox">
        <input
            type="checkbox"
            id="filtByDate"
            class="checkbox"
            bind:checked={filtByDate}
        />
        <span class="checkbox-label"> Filter by date </span>
    </label>
    <label for="focus-day-input">
        Start date:
        <input
            id="focus-day-input"
            type="date"
            value={dateToString(startDate).split("T")[0]}
            on:change={(e) => {
                startDate = new Date(e.target.value);
                startDate.setHours(0, 0, 0, 0);
                checkEndDate();
            }}
        />
    </label>
    <label for="focus-day-input">
        End date:
        <input
            id="focus-day-input"
            type="date"
            value={dateToString(endDate).split("T")[0]}
            on:change={(e) => {
                endDate = new Date(e.target.value);
                endDate.setHours(0, 0, 0, 0);
                checkStartDate();
            }}
        />
    </label>
</Options>

<style>
    input {
        width: 10em;
    }
    .side-checkbox {
        cursor: pointer;
        user-select: none;
        display: grid;
        grid-template-columns: 1em auto;
        align-items: center;
        gap: 5px;
    }
    .checkbox-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .checkbox {
        width: 1em;
        cursor: pointer;
    }
</style>
