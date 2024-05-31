<script lang="ts">
    import { constants } from "../../../store";

    export let func: Function = () => {};
    export let text: string;
    export let index: number;

    export let color = "#FF0000";

    const transparency = $constants.transparency;
</script>

<button
    on:click={func()}
    id={"add" + index}
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
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 2.8em;
        height: 2.5em;
        min-height: 2.5em;
        /* border: 1px solid transparent; */
    }
    .tiempo-restante:hover {
        /* border: 1px solid var(--main-color-hover); */
        background-color: var(--main-color-hover);
    }
    .tiempo-restante:active {
        background-color: var(--main-color-active);
    }
</style>
