<script lang="ts">
    import type { ListaKanban } from "../../../classes/ListaKanban";
    import { currentCalendar, currentEvent, eventFilter } from "../../../store";
    import KanbanCard from "./KanbanCard.svelte";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEvent() {
        dispatch("addEvent", { kanbanList: kanbanList });
    }

    export let kanbanList: ListaKanban;

    let nameInput: HTMLInputElement;

    onMount(() => {
        if (kanbanList.name === "") {
            nameInput.focus();
        }
    });

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.getData("type") === "event") {
            e.preventDefault();
            $currentEvent.changeKanbanlist(kanbanList);
        }
    }
</script>

<div
    class="kanban-list"
    draggable="true"
    on:dragover={onDragOver}
    on:drop={onDrop}
    role="presentation"
>
    <input
        class="kanban-list-name"
        type="text"
        bind:value={kanbanList.name}
        bind:this={nameInput}
        on:input={() => ($currentCalendar = $currentCalendar)}
        on:keydown={(event) => {
            if (event.key === "Enter") {
                nameInput.blur();
            }
        }}
    />
    <div class="card-list">
        {#each kanbanList.events.filter( (event) => event.pasaFiltroSuave($eventFilter) ) as event, index}
            <KanbanCard {event} {index} />
        {/each}
    </div>
    <div class="bottom-buttons">
        <button id="add-card" on:click={addEvent}>+ Add a card</button>
        <button
            on:click={() => {
                kanbanList.delete();
            }}>Delete</button
        >
    </div>
</div>

<style>
    .kanban-list {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 12px;
        min-width: min(17.5em, 25%);
        max-width: min(17.5em, 25%);
        background-color: var(--main-color);
        overflow: hidden;
        max-height: 100%;
    }
    .kanban-list-name {
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
        margin-bottom: 15px;
        margin-top: 5px;
    }
    .kanban-list-name:focus {
        background-color: #0f0f0f98;
    }
    .card-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: auto;
    }
    .bottom-buttons {
        display: flex;
        justify-content: right;
        justify-content: space-between;
        gap: 10px;
        margin-top: 10px;
    }
    #add-card {
        width: 100%;
    }
</style>
