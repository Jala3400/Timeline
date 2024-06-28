<script lang="ts">
    import IconButton from "../../atoms/IconButton.svelte";
    let hideSidebar: boolean = false;
    let hideDetails: boolean = false;
</script>

<div id="multi-calendar" class:hideDetails class:hideSidebar>
    <div id="hide-sidebar">
        <IconButton text="H" func={() => (hideSidebar = !hideSidebar)} />
    </div>
    <slot name="sidebar" />
    <slot name="main" />
    <slot name="details" />
    <div id="hide-details">
        <IconButton text="H" func={() => (hideDetails = !hideDetails)} />
    </div>
</div>

<style>
    #multi-calendar {
        display: grid;
        grid-template: 100% / 1fr 3fr 1.2fr;
        width: 100%;
        height: 100%;
    }
    #multi-calendar.hideSidebar {
        grid-template: 100% / 0fr 4fr 1.2fr;
    }
    #multi-calendar.hideDetails {
        grid-template: 100% / 1fr 4.2fr 0fr;
    }
    #multi-calendar.hideDetails.hideSidebar {
        grid-template: 100% / 0fr 1fr 0fr;
    }

    #hide-sidebar {
        position: absolute;
        left: 2px;
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
    }
    #hide-details {
        position: absolute;
        right: 2px;
        padding: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-lighter);
    }
</style>
