<script lang="ts">
    import {
        calendars,
        currentCalendar,
        currentDetails,
        eventFilter,
        eventsList,
    } from "../../../store";
    import CheckGroup from "../../molecules/CheckGroup.svelte";
    import CompInput from "../../molecules/CompInput.svelte";
    import NavFolder from "../../molecules/NavFolder.svelte";

    export let multi: boolean = true;

    let startDate = new Date($eventFilter.startDate)
        .toISOString()
        .substring(0, 16);
    let endDate = new Date($eventFilter.endDate).toISOString().substring(0, 16);

    function changeStartDate(date: string) {
        $eventFilter.startDate = date;
        if (startDate > endDate) {
            endDate = startDate;
            $eventFilter.endDate = startDate;
        }
    }
    function changeEndDate(date: string) {
        $eventFilter.endDate = date;
        if (endDate < startDate) {
            startDate = endDate;
            $eventFilter.startDate = endDate;
        }
    }
</script>

<div id="filter-cont">
    <input
        id="search-input"
        type="text"
        placeholder="Search"
        bind:value={$eventFilter.name}
    />

    <NavFolder name="Dates">
        <label for="filtByDate" class="side-checkbox">
            <input
                type="checkbox"
                id="filtByDate"
                class="checkbox"
                bind:checked={$eventFilter.filtByDate}
            />
            <span class="checkbox-label"> Filter by date </span>
        </label>
        <CompInput
            type="datetime-local"
            bind:value={startDate}
            label="From"
            change={() => {
                changeStartDate(startDate);
            }}
        />
        <CompInput
            type="datetime-local"
            bind:value={endDate}
            label="To"
            change={() => {
                changeEndDate(endDate);
            }}
        />
    </NavFolder>

    <NavFolder name="Calendars">
        {#if multi}
            <CheckGroup
                list={$calendars}
                click={() => ($currentDetails = "allCalendars")}
                change={() => {
                    $calendars = $calendars;
                    $eventsList = $eventsList; // filtra los eventos
                }}
                onDrop={() => ($calendars = $calendars)}
                focusObject={null}
            />
        {:else}
            <CheckGroup
                radio={true}
                list={$calendars}
                bind:focusObject={$currentCalendar}
                click={(calendar) => {
                    $currentCalendar = calendar;
                    $currentDetails = "calendar";
                }}
                onDrop={() => ($calendars = $calendars)}
            />
        {/if}
    </NavFolder>
</div>

<style>
    #filter-cont {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 2px;
    }
    #search-input {
        padding: 7px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
    }

    .side-checkbox {
        padding: 5px 10px;
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
        /* -webkit-appearance: none;
        appearance: none; */
        background-color: red;
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
