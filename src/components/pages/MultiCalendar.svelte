<script lang="ts">
    import AddCalendarModal from "../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../Modals/AddEventModal.svelte";
    import Details from "../organisms/Details/Details.svelte";
    import MultiSideBar from "../organisms/SideBar/MultiCalendar/MultiSideBar.svelte";
    import MainMultCal from "../organisms/Main/MultiCalendar/MainMultCal.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<div id="multi-calendar">
    <MultiSideBar on:addEvent={() => (addEventModal = true)} />
    <MainMultCal />
    <Details />
</div>

<AddEventModal bind:addEventModal {calendarColor} bind:addCalendarModal />
<AddCalendarModal bind:addCalendarModal bind:calendarColor />

<style>
    #multi-calendar {
        display: grid;
        grid-template: 100% / 1fr 3fr 1.2fr;
        width: 100%;
        height: 100%;
    }
</style>
