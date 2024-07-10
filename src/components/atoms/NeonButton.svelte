<script lang="ts">
    import { configuration, constants } from "../../store";

    export let func: Function = () => {};
    export let text: string;
    export let color = $configuration.mainColor;

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
    class="neonbtn"
    style="background-color: {activeColor};">{text}</button
>

<style>
    .neonbtn {
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        font-size: 16px;
    }
</style>
