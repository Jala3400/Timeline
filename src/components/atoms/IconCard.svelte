<script lang="ts">
    import { constants } from "../../store";

    export let func: Function = () => {};
    export let text: string = "+";

    const transparency = $constants.transparencyApp;
</script>

<button
    style="
    --main-color:#ffffff{transparency.none};
    --main-color-hover:#ffffff{transparency.main};
    --main-color-active:#ffffff{transparency.hover};
    "
    on:click={func()}
    class="iconCard"
    >{text}
</button>

<style>
    .iconCard {
        border: none;
        border-radius: 8px;
        color: #ffffff;
        width: 2.5em;
        min-height: 2.5em;
        background-color: var(--main-color);
    }
    .iconCard:hover {
        background-color: var(--main-color-hover);
    }
    .iconCard:active {
        background-color: var(--main-color-active);
    }
</style>
