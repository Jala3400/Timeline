<script>
    import { lookDate } from "../../../../lib/ManageEvents";
    import { eventsList } from "../../../../store";
    import IconButton from "../../../atoms/IconButton.svelte";
    import DayBlock from "../../../organisms/DayBlock/DayBlock.svelte";
    import Tasks from "../../../organisms/Details/DetailBlocks/Tasks.svelte";

    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let formattedDate = currentDate.toLocaleDateString();

    const events = $eventsList
        .slice(
            lookDate(
                new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
                $eventsList
            ),
            lookDate(currentDate, $eventsList)
        )
        .filter((event) => {
            if (event.calendar.selected) return event;
        })
        .reverse();
</script>

<div id="main">
    <div id="main-top">
        <IconButton />
    </div>
    <div id="main-content">
        <div id="top-content">
            <h1>{formattedDate}</h1>
        </div>
        <div id="bottom-content">
            <div id="events-list-today">
                {#if events.length !== 0}
                    <DayBlock {events} />
                {:else}
                    <h1 style="margin-bottom: 0;">Día libre</h1>
                    <p>Ve a hacer tus tareas</p>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    /* Main layout*/
    #main-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
        gap: 5px;
    }
    #main-content {
        overflow: auto;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1.618fr);
        text-align: center;
        height: calc(100% - 2.5em);
    }
    #main {
        width: 100%;
        overflow: auto;
    }

    /* top-content */
    #top-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* bottom-content */
    #bottom-content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
        background-color: var(--bg-light);
    }
    #events-list-today {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: max(25em, 75%);
        height: 100%;
        padding: 1em;
        border-radius: 16px;
        background-color: var(--bg);
        overflow: hidden;
    }
</style>
