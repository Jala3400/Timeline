<script lang="ts">
    import {
        calendars,
        currentCalendar,
        currentEvent,
        currentDetails,
        eventFilter,
    } from "../../../../store";
    import IconButton from "../../../atoms/IconButton.svelte";
    import NeonButton from "../../../atoms/NeonButton.svelte";
    import CheckGroup from "../../../molecules/CheckGroup.svelte";
    import NavFolder from "../../../molecules/NavFolder.svelte";
    import SideBar from "../../../organisms/SideBar/SideBar.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEvent() {
        dispatch("addEvent");
    }
</script>

<SideBar>
    <div slot="top">
        <IconButton text="B" selected={true} />
    </div>
    <div id="main" slot="main">
        <div id="side-main">
            <input
                id="search-input"
                type="text"
                placeholder="Search"
                bind:value={$eventFilter.name}
            />
            <NavFolder name="Calendar">
                <CheckGroup
                    radio={true}
                    list={$calendars}
                    bind:focusObject={$currentCalendar}
                    click={(calendar) => {
                        $currentCalendar = calendar;
                        $currentEvent = $currentCalendar.defaultList.events[0];
                        $currentDetails = "calendar";
                    }}
                />
            </NavFolder>
        </div>
        <div id="side-bottom">
            <NeonButton text={"Add Event"} func={addEvent} />
        </div>
    </div>
</SideBar>

<style>
    #main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        background-color: var(--bg-light);
        width: 100%;
        height: 100%;
    }
    #side-main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 2px;
    }
    #side-main,
    #side-bottom {
        width: 100%;
    }
    #search-input {
        padding: 7px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
    }
</style>
