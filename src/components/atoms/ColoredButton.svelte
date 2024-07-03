<script>
    import { constants } from "../../store";

    export let func;
    export let text;
    export let color = "#FF0000";

    const transparency = $constants.transparency;
</script>

<button
    on:mousedown={func}
    class="colored-btn"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
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
