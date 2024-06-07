<script lang="ts">
    import { calendars } from "../../store";
    import AddCalendarModal from "../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../Modals/AddEventModal.svelte";
    import Details from "../organisms/Details/Details.svelte";
    import IndSideBar from "../organisms/SideBar/IndCalendar/IndSideBar.svelte";
    import MainIndCal from "../organisms/Main/IndCalendar/MainIndCal.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<div id="ind-calendar">
    <IndSideBar on:addEvent={() => (addEventModal = true)} />
    <MainIndCal />
    <Details />
</div>

<AddEventModal bind:addEventModal {calendarColor} bind:addCalendarModal />
<AddCalendarModal bind:addCalendarModal bind:calendarColor />

<style>
    #ind-calendar {
        display: grid;
        grid-template: 100% /1fr 3fr 1.2fr;
        width: 100%;
        height: 100%;
    }
</style>
