<script lang="ts">
    import { constants } from "../../store";

    export let func: Function = () => {};
    export let text: string = "+";
    export let selected: boolean = false;

    const transparency = $constants.transparencyApp;
</script>

<button
    style="
    --bg:#ffffff{transparency.none};
    --bg-light:#ffffff{transparency.main};
    --bg-lighter:#ffffff{transparency.hover};    "
    class:selected
    on:click={func()}
    class="icon-btn"
    >{text}
</button>

<style>
    .icon-btn {
        border: none;
        border-radius: 8px;
        color: #ffffff;
        width: 2.5em;
        aspect-ratio: 1/1;
        background-color: var(--bg);
        opacity: 0.5;
    }
    .icon-btn.selected {
        /* color: var(--main-color);
        border: 1px solid var(--main-color); 
        background-color: var(--bg-light); */
        opacity: 1;
    }
    .icon-btn:hover {
        background-color: var(--bg-light);
        opacity: 1;
    }
    .icon-btn.selected:hover {
        background-color: var(--bg-light);
    }
    .icon-btn:active {
        background-color: var(--bg-lighter);
    }
</style>
