<script lang="ts">
    import type { Evento } from "../../../classes/Evento";
    import { currentDetails, currentEvent } from "../../../store";

    export let event: Evento;
</script>

<button
    class="kanban-card"
    on:click={() => {
        $currentEvent = event;
        $currentDetails = "event";
    }}
>
    <div class="kanban-card-title">{event.name}</div>
</button>

<style>
    .kanban-card {
        padding: 10px;
        border-radius: 8px;
        background-color: rgb(from var(--bg-white) r g b / 0.8);
        color: var(--color-black);
    }
    .kanban-card-title {
        font-size: 1.1em;
        font-weight: bold;
        text-align: left;
    }
</style>
