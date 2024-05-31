<script lang="ts">
    import { configuration } from "../../../store";

    export let func: Function = () => {};
    export let text: string;
    export let color = $configuration.mainColor;

    const transparency = "60";
    const transparencyHover = "90";
    const transparencyActive = "AA";
</script>

<button
    on:click={func()}
    class="neonbtn"
    style="--main-color:{color}{transparency};
--main-color-hover:{color}{transparencyHover};
--main-color-active:{color}{transparencyActive}">{text}</button
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
