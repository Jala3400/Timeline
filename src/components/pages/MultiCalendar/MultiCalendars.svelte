<script lang="ts">
    import AddCalendarModal from "../../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../../Modals/AddEventModal.svelte";
    import Details from "../../organisms/Details/Details.svelte";
    import MultiSideBar from "./components/SideBarMulti.svelte";
    import MainMultCal from "./components/MainMulti.svelte";
    import MainTemplate from "../../templates/MainTemplate/MainTemplate.svelte";
    import { dateToString } from "../../../lib/ManageEvents";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
    let eventDate = new Date().toISOString().substring(0, 16);

    function handleAddEvent(e: { detail: { date: Date } }) {
        eventDate = dateToString(e.detail.date);
        addEventModal = true;
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
        if (
            event.ctrlKey &&
            !event.altKey &&
            !event.shiftKey &&
            !event.metaKey
        ) {
            switch (event.key) {
                case "n":
                    event.preventDefault();
                    addEventModal = true;
                    break;
            }
        }
    });
</script>

<MainTemplate>
    <MultiSideBar on:addEvent={() => (addEventModal = true)} slot="sidebar" />
    <MainMultCal on:addEvent={handleAddEvent} slot="main" />
    <Details slot="details" />
</MainTemplate>

<AddEventModal
    bind:addEventModal
    {calendarColor}
    bind:addCalendarModal
    bind:date={eventDate}
/>
<AddCalendarModal bind:addCalendarModal bind:calendarColor />
