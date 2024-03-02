<script>
    export let eventName = "evento sin nombre";
</script>

<button class="event">
    <h2>{eventName}</h2>
</button>

<style>
    .event {
        border: 1px solid var(--color-hover);
        border-radius: 8px;
        background-color: var(--color);
        padding: 0.6em 1.2em;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 700px;
    }
    .event:hover {
        background-color: var(--color-hover);
    }
    .event:active {
        background-color: var(--color-active);
    }
</style>
