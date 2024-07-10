<script>
    import { constants } from "../../store";

    export let func;
    export let text;
    export let color = "#FF0000";

    const transparency = $constants.transparency;
    let isHovered = false;
    let isActive = false;

    $: bgColor = isHovered
        ? color + transparency.hover
        : color + transparency.main;
    $: activeColor = isActive ? color + transparency.active : bgColor;
</script>

<button
    on:mousedown={() => {
        func();
        isActive = true;
    }}
    on:mouseup={() => (isActive = false)}
    on:mouseenter={() => (isHovered = true)}
    on:mouseleave={() => {
        isHovered = false;
        isActive = false;
    }}
    class="colored-btn"
    style="background-color: {activeColor};"
    ><span class="text">
        {text}
    </span>
</button>

<style>
    .colored-btn {
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
</style>
