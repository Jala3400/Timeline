<script lang="ts">
    import Modal from "../templates/Modal/Modal.svelte";
    import CompInput from "../molecules/CompInput.svelte";
    import { addNewCalendar } from "../../lib/ManageEvents";
    import { calendars, currentCalendar } from "../../store";

    export let addCalendarModal: boolean = false;
    export let calendarColor: string;

    let calendarName = "new calendar";
</script>

<Modal bind:showModal={addCalendarModal} color={calendarColor}>
    <h2 slot="header">Add Calendar</h2>
    <div slot="content" id="content">
        <CompInput label="Title" type="text" bind:value={calendarName} />
        <CompInput label="Color" type="color" bind:value={calendarColor} />
    </div>
    <button
        on:click={() => {
            // Añade el calendario y lo establece como el calendario actual.
            if (calendarName in $calendars) {
                console.log("Ya existe un calendario con ese nombre");
            } else {
                addNewCalendar(calendarName, calendarColor);
            }
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
