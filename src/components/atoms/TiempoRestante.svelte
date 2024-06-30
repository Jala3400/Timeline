<script lang="ts">
    import { constants } from "../../store";

    export let func: Function = (...ags: any) => {};
    export let text: string;

    export let color = "#FF0000";

    const transparency = $constants.transparency;
</script>

<button
    on:mousedown={func()}
    on:click|stopPropagation
    class="tiempo-restante"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}">{text}</button
>

<style>
    .tiempo-restante {
        border: none;
        border-radius: 8px;
        color: #ffffff;
        background-color: var(--main-color);
        width: 2.75em;
        aspect-ratio: 1/1;
    }
    .tiempo-restante:hover {
        background-color: var(--main-color-hover);
    }
    .tiempo-restante:active {
        background-color: var(--main-color-active);
    }
</style>
