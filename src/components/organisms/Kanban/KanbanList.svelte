<script lang="ts">
    import type { ListaKanban } from "../../../classes/ListaKanban";
    import KanbanCard from "./KanbanCard.svelte";

    export let kanbanList: ListaKanban;

    import { onMount } from "svelte";

    let nameInput: HTMLInputElement;

    onMount(() => {
        if (kanbanList.name === "") {
            nameInput.focus();
        }
    });
</script>

<div class="kanban-list">
    <input
        class="kanban-list-name"
        type="text"
        bind:value={kanbanList.name}
        bind:this={nameInput}
        on:keydown={(event) => {
            if (event.key === "Enter") {
                nameInput.blur();
            }
        }}
    />
    <div class="card-list">
        {#each kanbanList.events as event}
            <KanbanCard {event} />
        {/each}
    </div>
    <div class="bottom-buttons">
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
        margin-top: 10px;
    }
</style>
