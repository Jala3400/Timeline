<script lang="ts">
    import { configuration, constants } from "../../store";

    export let func: Function = () => {};
    export let text: string;
    export let color = $configuration.mainColor;

    const transparency = $constants.transparency;
</script>

<button
    on:click={func()}
    class="neonbtn"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}">{text}</button
>

<style>
    .neonbtn {
        /* border: 1px solid var(--main-color-hover); */
        padding: 1em;
        border-radius: 8px;
        background-color: var(--main-color);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        font-size: 16px;
    }
    .neonbtn:hover {
        background-color: var(--main-color-hover);
    }
    .neonbtn:active {
        background-color: var(--main-color-active);
    }
</style>
