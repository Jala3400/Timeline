<script>
    export let func;
    export let text;
    export let index;

    function onMouseEnter() {
        document.getElementById("add" + index).innerHTML = text;
    }
    function onMouseLeave() {
        document.getElementById("add" + index).innerHTML = "";
    }
</script>

<button
    on:click={func(index)}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    id={"add" + index}
    class="neonbtn"
></button>

<style>
    .neonbtn {
        border: none;
        padding: 0.1rem;
        border-radius: 8px;
        color: var(--color);
        background-color: var(--color);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 0.1rem;
        height: 2rem;
        margin: 0.5rem;
    }
    .neonbtn:hover {
        border: 1px solid var(--color-hover);
        background-color: var(--color-hover);
        color: #ffffff;
        width: 2rem;
    }
    .neonbtn:active {
        background-color: var(--color-active);
    }
</style>
