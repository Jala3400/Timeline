<script lang="ts">
    import AddCalendarModal from "./components/Modals/AddCalendarModal/AddCalendarModal.svelte";
    import AddEventModal from "./components/Modals/AddEventModal/AddEventModal.svelte";
    import Details from "./components/organisms/Details/Details.svelte";
    import EventList from "./components/organisms/EventList/EventList.svelte";
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import NavBar from "./components/organisms/NavBar/NavBar.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<div id="main-container" style="height: 100%; ">
    <IconsBar />
    <NavBar on:addEvent={() => (addEventModal = true)} />
    <EventList />
    <Details />
</div>

<AddEventModal
    bind:addEventModal
    {calendarColor}
    bind:addCalendarModal
/>
<AddCalendarModal bind:addCalendarModal bind:calendarColor />

<style>
    #main-container {
        display: grid;
        grid-template: 100% / 2.5rem 1fr 3fr 1.25fr;
    }
</style>
