<script>
    import IconCard from "../../atoms/IconCard/IconCard.svelte";
</script>

<div id="icons-bar">
    <IconCard text="~" />
</div>

<style>
    #icons-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        background-color: var(--main-background-light);
    }
</style>
