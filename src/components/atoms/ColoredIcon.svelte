<script lang="ts">
    import { constants } from "../../store";

    export let func: Function = (...ags: any) => {};
    export let text: string;
    export let colorId = "main_";
    export let customColor = "";

    const transparency = $constants.transparency;

    let style = customColor
        ? `--main-color-pure: ${customColor};
        --main-color: ${customColor}${transparency.main};
        --main-color-hover: ${customColor}${transparency.hover};
        --main-color-active: ${customColor}${transparency.active};
        `
        : `--main-color-pure: var(--${colorId}-color-pure);
        --main-color: var(--${colorId}-color);
        --main-color-hover: var(--${colorId}-color-hover);
        --main-color-active: var(--${colorId}-color-active);`;
</script>

<button
    on:mousedown={func()}
    on:click|stopPropagation
    class="colored-icon"
    {style}>{text}</button
>

<style>
    .colored-icon {
        border: none;
        border-radius: 8px;
        padding: 0;
        color: #ffffff;
        background-color: var(--main-color);
        width: 2.75em;
        aspect-ratio: 1/1;
    }
    .colored-icon:hover {
        background-color: var(--main-color-hover);
    }
    .colored-icon:active {
        background-color: var(--main-color-active);
    }
</style>
