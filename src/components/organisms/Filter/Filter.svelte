<script lang="ts">
    import {
        calendars,
        currentDetails,
        eventFilter,
        eventsList,
    } from "../../../store";
    import CheckGroup from "../../molecules/CheckGroup.svelte";
    import NavFolder from "../../molecules/NavFolder.svelte";
</script>

<div id="filter-cont">
    <input
        id="search-input"
        type="text"
        placeholder="Search"
        bind:value={$eventFilter.name}
    />

    <NavFolder name="Calendars">
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
</style>
