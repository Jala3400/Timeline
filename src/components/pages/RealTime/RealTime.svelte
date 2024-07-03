<script lang="ts">
    import AddCalendarModal from "../../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../../Modals/AddEventModal.svelte";
    import Details from "../../organisms/Details/Details.svelte";
    import MainTemplate from "../../templates/MainTemplate/MainTemplate.svelte";
    import { dateToString } from "../../../lib/ManageEvents";
    import SideBarRt from "./components/SideBarRT.svelte";
    import MainRt from "./components/MainRT.svelte";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
    let eventDate = dateToString(new Date());

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
    <SideBarRt on:addEvent={() => (addEventModal = true)} slot="sidebar" />
    <MainRt on:addEvent={handleAddEvent} slot="main" />
    <Details slot="details" />
</MainTemplate>

<AddEventModal
    bind:addEventModal
    {calendarColor}
    bind:addCalendarModal
    bind:date={eventDate}
/>
<AddCalendarModal bind:addCalendarModal bind:calendarColor />
