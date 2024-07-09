<script lang="ts">
    import type { ListaKanban } from "../../../classes/ListaKanban";
    import { currentCalendar, currentEvent, eventFilter } from "../../../store";
    import KanbanCard from "./KanbanCard.svelte";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let index: number;
    export let kanbanList: ListaKanban;
    $: collapsed = kanbanList.collapsed;

    function onDragStart(e: DragEvent, index: number) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "kanbanList");
            e.dataTransfer.setData("index", JSON.stringify(index));
        }
    }

    const dispatch = createEventDispatcher();

    // Lanza el evento para añadir un evento
    function addEvent() {
        dispatch("addEvent", { kanbanList: kanbanList });
    }

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
        } else if (
            e.dataTransfer &&
            e.dataTransfer.getData("type") === "kanbanList"
        ) {
            e.preventDefault();
            const indexDragged = JSON.parse(e.dataTransfer.getData("index"));
            $currentCalendar.kanbanLists.splice(
                index,
                0,
                $currentCalendar.kanbanLists.splice(indexDragged, 1)[0]
            );
            $currentCalendar = $currentCalendar;
        }
    }
    let draggable = true;
</script>

<div
    class="kanban-list"
    class:collapsed
    {draggable}
    on:dragstart={(e) => onDragStart(e, index)}
    on:dragover={onDragOver}
    on:drop={onDrop}
    role="presentation"
>
    <div class="top-kanban">
        <button
            class="collapse-button"
            on:click={() => (kanbanList.collapsed = !kanbanList.collapsed)}
        >
            <div class="collapse-icon" class:expanded={!collapsed}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="svg-icon"><path d="M3 8L12 17L21 8"></path></svg
                >
            </div>
        </button>
        <input
            class="kanban-list-name"
            type="text"
            bind:value={kanbanList.name}
            bind:this={nameInput}
            on:input={() => ($currentCalendar = $currentCalendar)}
            on:focusin={() => (draggable = false)}
            on:focusout={() => (draggable = true)}
            on:keydown={(event) => {
                if (event.key === "Enter") {
                    nameInput.blur();
                }
            }}
        />
    </div>
    <div class="kanban-content" class:collapsed>
        <div class="card-list">
            {#each kanbanList.events.filter( (event) => event.pasaFiltroSuave($eventFilter) ) as event, index}
                <KanbanCard {event} {index} />
            {/each}
        </div>
        <div class="bottom-buttons">
            <button id="add-card" on:click={addEvent} class="bottom-button"
                >Add event</button
            >
            <button
                on:click={() => {
                    kanbanList.delete();
                }}>Delete</button
            >
        </div>
    </div>
</div>

<style>
    .kanban-list {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 12px;
        --width: clamp(max(10%, 12.5em), 15%, 20em);
        min-width: var(--width);
        max-width: var(--width);
        background-color: var(--main-color);
        overflow: hidden;
        max-height: 100%;
        gap: 10px;
        transition: padding 0s;
    }
    .kanban-list.collapsed {
        width: fit-content;
        min-width: 0;
        min-width: 2.2em;
        text-orientation: sideways;
        writing-mode: vertical-lr;
        -webkit-writing-mode: vertical-lr;
        min-height: max-content;
        padding: 0px;
    }

    .top-kanban {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .collapse-button {
        background-color: transparent;
        border: none;
        font-size: 1.25em;
        padding: 0.5em;
    }
    .collapse-icon {
        display: flex;
    }
    .svg-icon {
        width: 0.75em;
        aspect-ratio: 1/1;
    }
    .collapse-icon.expanded {
        transform: rotate(-90deg);
    }
    .kanban-list-name {
        font-size: 1em;
        font-weight: bold;
        background-color: transparent;
    }
    .kanban-list-name:focus {
        background-color: #0f0f0f98;
    }

    .kanban-content {
        display: flex;
        gap: 10px;
        flex-direction: column;
        overflow: hidden;
    }
    .kanban-content.collapsed {
        display: none;
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
    }
    #add-card {
        width: 100%;
    }
</style>
