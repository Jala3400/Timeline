<script>
    import { ListaKanban } from "../../../../../classes/ListaKanban";
    import { constants, currentCalendar } from "../../../../../store";
    import KanbanList from "../../../../organisms/Kanban/KanbanList.svelte";

    const transparency = $constants.transparency;

    let kanbanLists = $currentCalendar.kanbanLists;

    currentCalendar.subscribe((value) => {
        kanbanLists = value.kanbanLists;
    });

    function addList() {
        $currentCalendar.addKanbanList(
            new ListaKanban([], "", $currentCalendar)
        );
    }
</script>

<div
    id="kanban-container"
    style="
--main-color-pure: {$currentCalendar.color};
--main-color:{$currentCalendar.color}{transparency.main};
--main-color-hover:{$currentCalendar.color}{transparency.hover};
--main-color-active:{$currentCalendar.color}{transparency.active}"
>
    {#each kanbanLists as kanbanList, index}
        <KanbanList {kanbanList} {index} />
    {/each}
    <button id="add-list-btn" on:click={addList}>+ Add List</button>
</div>

<style>
    #kanban-container {
        display: flex;
        gap: 1em;
        flex-direction: row;
        align-items: flex-start;
        text-align: center;
        height: 100%;
        width: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 1rem;
    }
    #add-list-btn {
        background-color: var(--bg-light);
        font-weight: bold;
        border: none;
        border-radius: 12px;
        padding: 10px;
        min-width: min(17.5em, 25%);
        max-width: min(17.5em, 25%);
        cursor: pointer;
    }
    #add-list-btn:hover {
        background-color: var(--bg-lighter);
    }
    #add-list-btn:active {
        background-color: var(--bg-lightest);
    }
</style>
