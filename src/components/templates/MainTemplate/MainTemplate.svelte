<script lang="ts">
</script>

<div id="multi-calendar">
    <slot name="sidebar" />
    <slot name="main" />
    <slot name="details" />
</div>

<style>
    #multi-calendar {
        display: grid;
        grid-template: 100% / 1fr 3fr 1.2fr;
        width: 100%;
        height: 100%;
    }
</style>
