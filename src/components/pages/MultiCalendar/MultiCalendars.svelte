<script lang="ts">
    import AddCalendarModal from "../../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../../Modals/AddEventModal.svelte";
    import Details from "../../organisms/Details/Details.svelte";
    import MultiSideBar from "./components/SideBarMulti.svelte";
    import MainMultCal from "./components/MainMulti.svelte";
    import MainTemplate from "../../templates/MainTemplate/MainTemplate.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<MainTemplate>
    <MultiSideBar on:addEvent={() => (addEventModal = true)} slot="sidebar" />
    <MainMultCal slot="main" />
    <Details slot="details" />
</MainTemplate>

<AddEventModal bind:addEventModal {calendarColor} bind:addCalendarModal />
<AddCalendarModal bind:addCalendarModal bind:calendarColor />
