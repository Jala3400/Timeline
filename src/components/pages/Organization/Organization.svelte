<script lang="ts">
    import AddCalendarModal from "../../Modals/AddCalendarModal.svelte";
    import AddEventModal from "../../Modals/AddEventModal.svelte";
    import Details from "../../organisms/Details/Details.svelte";
    import SideBarOrg from "./Components/SideBarOrg.svelte";
    import MainOrg from "./Components/MainOrg.svelte";
    import type { ListaKanban } from "../../../classes/ListaKanban";
    import type { Calendario } from "../../../classes/Calendario";

    // Modals
    let addEventModal: boolean = false;
    let addCalendarModal: boolean = false;
    let calendarColor = "#FF0000";
    let calendar: Calendario;
    let kanbanList: ListaKanban;

    function handleAddEvent(e: { detail: { kanbanList: ListaKanban } }) {
        calendar = e.detail.kanbanList.calendar;
        kanbanList = e.detail.kanbanList;
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

<SideBarOrg on:addEvent={() => (addEventModal = true)} />
<MainOrg on:addEvent={handleAddEvent} />
<Details />

<AddEventModal
    bind:addEventModal
    {calendarColor}
    bind:addCalendarModal
    bind:calendar
    bind:kanbanList
/>
<AddCalendarModal bind:addCalendarModal bind:calendarColor />
