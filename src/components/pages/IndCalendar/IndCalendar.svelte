<script lang="ts">
    import AddCalendarModal from "../../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../../Modals/AddEventModal.svelte";
    import Details from "../../organisms/Details/Details.svelte";
    import IndSideBar from "./components/SideBarInd.svelte";
    import MainIndCal from "./components/MainInd.svelte";
    import MainTemplate from "../../templates/MainTemplate/MainTemplate.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
</script>

<MainTemplate>
    <IndSideBar on:addEvent={() => (addEventModal = true)} slot="sidebar" />
    <MainIndCal slot="main" />
    <Details slot="details" />
</MainTemplate>

<AddEventModal bind:addEventModal {calendarColor} bind:addCalendarModal />
<AddCalendarModal bind:addCalendarModal bind:calendarColor />
