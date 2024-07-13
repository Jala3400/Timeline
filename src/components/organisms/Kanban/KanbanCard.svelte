<script lang="ts">
    import { onMount } from "svelte";
    import type { Evento } from "../../../classes/Evento";
    import { currentCalendar, currentEvent } from "../../../store";
    import { selectEvent } from "../../../lib/ManageEvents";

    export let event: Evento;
    export let index: number;

    onMount(() => {
        if (event.name === "") {
            editing = true;
        }
    });

    function handleClick(e: MouseEvent) {
        selectEvent(e, event);
    }

    function onDragStart(e: DragEvent, event: Evento, index: number) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("type", "event");
            e.dataTransfer.setData("index", JSON.stringify(index));
        }
        $currentEvent = event;
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent, event: Evento, index: number) {
        if (e.dataTransfer && e.dataTransfer.getData("type") === "event") {
            if (event.kanbanList === $currentEvent.kanbanList) {
                const indexDragged = JSON.parse(
                    e.dataTransfer.getData("index")
                );
                event.kanbanList.events.splice(
                    index,
                    0,
                    event.kanbanList.events.splice(indexDragged, 1)[0]
                );
            } else {
                $currentEvent.changeKanbanlist(event.kanbanList);
                event.kanbanList.events.splice(
                    index,
                    0,
                    event.kanbanList.events.splice(
                        event.kanbanList.events.length - 1,
                        1
                    )[0]
                );
            }
        }
        $currentCalendar = $currentCalendar;
    }
    let nameInput: HTMLTextAreaElement;
    let editing = false;
</script>

<button
    class="kanban-card"
    on:click|self={handleClick}
    draggable="true"
    on:dragstart|stopPropagation={(e) => onDragStart(e, event, index)}
    on:dragover={onDragOver}
    on:drop|stopPropagation={(e) => onDrop(e, event, index)}
    >{#if editing}
        <!-- svelte-ignore a11y-autofocus -->
        <textarea
            class="kanban-card-title-input"
            rows={Math.ceil(event.name.length / 20)}
            bind:this={nameInput}
            bind:value={event.name}
            on:blur={() => (editing = false)}
            on:input={() => ($currentEvent = $currentEvent)}
            on:keydown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                    nameInput.blur();
                }
            }}
            autofocus
        ></textarea>
    {:else}
        <div class="kanban-card-title" on:click={handleClick} role="presentation">{event.name}</div>
        <button
            class="edit-button"
            on:click|stopPropagation={() => (editing = true)}>Edit</button
        >
    {/if}
</button>

<style>
    .kanban-card {
        min-height: 2em;
        position: relative;
        padding: 10px;
        border-radius: 8px;
        background-color: color-mix(
            in srgb,
            #0f0f0f 82.75%,
            var(--main-color-pure) 17.25%
        );
    }
    .kanban-card-title {
        font-size: 1.1em;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        border: 1px solid transparent;
    }
    .kanban-card-title-input {
        font-size: 1.1em;
        text-align: left;
    }
    .edit-button {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: transparent;
        opacity: 0;
    }
    .edit-button:focus,
    .kanban-card:focus .edit-button,
    .kanban-card:hover .edit-button {
        opacity: 1;
    }
</style>
