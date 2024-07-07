<script lang="ts">
    import Modal from "../templates/Modal/Modal.svelte";
    import CompInput from "../molecules/CompInput.svelte";
    import { addNewCalendar } from "../../lib/ManageEvents";
    import { Calendario } from "../../classes/Calendario";
    import { ListaKanban } from "../../classes/ListaKanban";

    export let addCalendarModal: boolean = false;
    export let calendarColor: string;

    let calendarName = "new calendar";
    let defaultList = "Inbox";
</script>

<Modal bind:showModal={addCalendarModal} color={calendarColor}>
    <h2 slot="header">Add Calendar</h2>
    <div slot="content" id="content">
        <CompInput label="Name" type="text" bind:value={calendarName} />
        <CompInput label="Color" type="color" bind:value={calendarColor} />
        <CompInput label="Default list" type="text" bind:value={defaultList} />
    </div>
    <button
        on:click={() => {
            const calendar = new Calendario(calendarColor, [], calendarName);
            const kanbanList = new ListaKanban([], defaultList, calendar);
            calendar.setKanbanLists = [kanbanList];
            addNewCalendar(calendar);
        }}
        slot="buttons">Save</button
    >
</Modal>

<style>
    #content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
</style>
