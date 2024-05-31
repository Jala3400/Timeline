<script lang="ts">
    import { currentDetails, constants } from "../../../store";
    import CalendarDetails from "../Details/CalendarDetails/CalendarDetails.svelte";
    import EventDetails from "../Details/EventDetails/EventDetails.svelte";
    import AllCalendarsDetails from "../Details/AllCalendarsDetails/AllCalendarsDetails.svelte";

    const transparency = $constants.transparency;

    let details = {
        event: EventDetails,
        calendar: CalendarDetails,
        allCalendars: AllCalendarsDetails,
    };
</script>

<div id="current-details">
    <svelte:component this={details[$currentDetails.type]} />
</div>

<style>
    #current-details {
        /* border-radius: 12px; */
        background-color: var(--main-background-light);
        /* margin: 5px; */
        padding: 1em;
        text-align: unset;
        display: flex;
        flex-direction: column;
    }
</style>
