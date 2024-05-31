<script lang="ts">
    export let func: Function = () => {};
    export let text: string = "+";
</script>

<button on:click={func()} class="iconCard">{text} </button>

<style>
    .iconCard {
        border: none;
        border-radius: 8px;
        color: #ffffff;
        width: 2.5em;
        min-height: 2.5em;
        background-color: var(--main-background-light);
    }
    .iconCard:hover {
        background-color: var(--main-background-lighter);
    }
    .iconCard:active {
        background-color: var(--main-background-lighter);
    }
</style>
