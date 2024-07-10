<script>
    export let func;
    export let text;
    export let colorId = "main_";
</script>

<button
    on:mousedown={func}
    class="colored-btn"
    style="--main-color-pure: var(--{colorId}-color-pure);
    --main-color: var(--{colorId}-color);
    --main-color-hover: var(--{colorId}-color-hover);
    --main-color-active: var(--{colorId}-color-active);"
    ><span class="text">
        {text}
    </span>
</button>

<style>
    .colored-btn {
        background-color: var(--main-color);
        display: flex;
        justify-content: left;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 16px;
        width: 100%;
    }
    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .colored-btn:hover {
        background-color: var(--main-color-hover);
    }
    .colored-btn:active {
        background-color: var(--main-color-active);
    }
</style>
