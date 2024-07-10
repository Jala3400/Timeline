<script lang="ts">
    import type { Evento } from "../../../classes/Evento";
    import {
        constants,
        currentCalendar,
        currentDetails,
        currentEvent,
    } from "../../../store";

    export let event: Evento;
    export let index: number;

    const transparency = $constants.transparency;

    $: activeColor = "#0f0f0f" + transparency.hover;

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
</script>

<button
    class="kanban-card"
    on:click={() => {
        $currentEvent = event;
        $currentDetails = "event";
    }}
    draggable="true"
    on:dragstart|stopPropagation={(e) => onDragStart(e, event, index)}
    on:dragover={onDragOver}
    on:drop|stopPropagation={(e) => onDrop(e, event, index)}
    style="background-color: {activeColor};"
>
    <div class="kanban-card-title">{event.name}</div>
</button>

<style>
    .kanban-card {
        padding: 10px;
        border-radius: 8px;
    }
    .kanban-card-title {
        font-size: 1.1em;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
