<script lang="ts">
    import AddCalendarModal from "./components/Modals/AddCalendarModal/AddCalendarModal.svelte";
    import AddEventModal from "./components/Modals/AddEventModal/AddEventModal.svelte";
    import Details from "./components/organisms/Details/Details.svelte";
    import Main from "./components/organisms/Main/Main.svelte";
    import IconsBar from "./components/organisms/IconsBar/IconsBar.svelte";
    import SideBar from "./components/organisms/SideBar/SideBar.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<div id="main-container" style="height: 100%; ">
    <IconsBar />
    <SideBar on:addEvent={() => (addEventModal = true)} />
    <Main />
    <Details />
</div>

<AddEventModal bind:addEventModal {calendarColor} bind:addCalendarModal />
<AddCalendarModal bind:addCalendarModal bind:calendarColor />

<style>
    #main-container {
        display: grid;
        grid-template: 100% / 2.5rem 1fr 3fr 1.2fr;
    }
</style>
