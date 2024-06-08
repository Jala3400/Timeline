<script lang="ts">
    import { currentDetails } from "../../../store";
    import CalendarDetails from "./DetailBlocks/CalendarDetails.svelte";
    import EventDetails from "./DetailBlocks/EventDetails.svelte";
    import AllCalendarsDetails from "./DetailBlocks/AllCalendarsDetails.svelte";
    import IconCard from "../../atoms/IconCard.svelte";

    let details: { [key: string]: any } = {
        event: EventDetails,
        calendar: CalendarDetails,
        allCalendars: AllCalendarsDetails,
    };
</script>

<div>
    <div id="details-top">
        <IconCard text="#" />
    </div>
    <div id="current-details">
        <svelte:component this={details[$currentDetails]} />
    </div>
</div>

<style>
    #current-details {
        background-color: var(--bg-light);
        padding: 1em;
        text-align: unset;
        display: flex;
        flex-direction: column;
        height: calc(100% - 2.5em);
        border-left: 1px solid var(--divider-color);
    }
    #details-top {
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--bg-lighter);
        border-bottom: 1px solid var(--divider-color);
        width: 100%;
    }
</style>
