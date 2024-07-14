<script lang="ts">
    import Modal from "../templates/Modal/Modal.svelte";
    import CompInput from "../molecules/CompInput.svelte";
    import { addNewCalendar } from "../../lib/ManageEvents";
    import { Calendario } from "../../classes/Calendario";
    import { ListaKanban } from "../../classes/ListaKanban";

    export let addCalendarModal: boolean = false;
    export let calendarColor: string;

    $: if (addCalendarModal) {
        calendarName = "new calendar";
    }

    let calendarName = "new calendar";
    let defaultList = "Inbox";
</script>

<Modal bind:showModal={addCalendarModal} color={calendarColor}>
    <div id="header"><h2>Add Calendar</h2></div>
    <div id="content">
        <CompInput label="Name" type="text" bind:value={calendarName} />
        <CompInput label="Color" type="color" bind:value={calendarColor} />
        <CompInput label="Default list" type="text" bind:value={defaultList} />
    </div>
    <div id="buttons">
        <button
            on:click={() => {
                const calendar = new Calendario(
                    calendarColor,
                    [],
                    calendarName
                );
                const kanbanList = new ListaKanban([], defaultList, calendar);
                calendar.setKanbanLists = [kanbanList];
                addNewCalendar(calendar);
            }}>Save</button
        >
    </div>
</Modal>

<style>
    #header,
    #content {
        border-bottom: 1px solid var(--main-color-full);
        padding: 0 10px;
    }

    #content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding-bottom: 20px;
    }

    #buttons {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }
</style>
