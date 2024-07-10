<script lang="ts">
    import { constants } from "../../store";

    export let func: Function = (...ags: any) => {};
    export let text: string;

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
    on:click|stopPropagation
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
    class="colored-icon"
    style="background-color: {activeColor};">{text}</button
>

<style>
    .colored-icon {
        border: none;
        border-radius: 8px;
        padding: 0;
        color: #ffffff;
        width: 2.75em;
        aspect-ratio: 1/1;
    }
</style>
