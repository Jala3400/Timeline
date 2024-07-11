<script lang="ts">
    import { constants, currentCalendar, eventsList } from "../../../../store";
    import { deleteCalendar } from "../../../../lib/ManageEvents";
    import CompInput from "../../../molecules/CompInput.svelte";
    import EventsList from "../../EventsList/EventsList.svelte";

    const transparency = $constants.transparency;

    $: color = $currentCalendar.color;
    $: events = $currentCalendar.getDatedEvents();

    let deleteButtonText = "Delete";

    currentCalendar.subscribe((value) => {
        deleteButtonText = "Delete";
    });
    let nameInput: HTMLInputElement;
</script>

<div
    id="calendar-details"
    style="
    --main-color-pure: {color};
    --main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
>
    <input
        id="calendar-name"
        type="text"
        bind:this={nameInput}
        bind:value={$currentCalendar.name}
        on:keydown={(event) => {
            if (event.key === "Enter") {
                nameInput.blur();
            }
        }}
    />
    <div id="calendar-data">
        <CompInput
            label="Color"
            type="color"
            bind:value={$currentCalendar.color}
            input={() => ($eventsList = $eventsList)}
        />
        <div class="comp-input" style="grid-area:Description">
            <div>Description</div>
            <textarea
                name="description"
                id="description"
                bind:value={$currentCalendar.description}
            />
        </div>

        <div id="buttons" style="grid-area: Buttons;">
            <button
                on:click={() => {
                    if (!deleteCalendar($currentCalendar)) {
                        deleteButtonText = "No";
                    }
                }}>{deleteButtonText}</button
            >
        </div>
    </div>
    <div class="calendar-events">
        {#if events.length !== 0}
            <EventsList eventsList={events} />
        {:else}
            <h1>Sin eventos</h1>
        {/if}
    </div>
</div>

<style>
    #calendar-details {
        padding: 1em;
        border-radius: 12px;
        background-color: var(--main-color);
        text-align: unset;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        height: 100%;
    }
    #calendar-name {
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
    }
    #calendar-name:focus {
        background-color: #0f0f0f98;
    }

    #calendar-data {
        display: grid;
        grid-template-areas:
            "Color"
            "Description"
            "Buttons";
        gap: 20px;
    }
    #buttons {
        display: flex;
        justify-content: flex-end;
    }
    .calendar-events {
        margin-top: 1em;
        padding: 1em;
        border-radius: 12px;
        overflow: auto;
        background-color: var(--bg);
        display: flex;
        justify-content: center;
    }
    .comp-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
    @media (max-width: 1200px) {
        #calendar-name {
            font-size: 1.75em;
        }
        #calendar-data {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: flex-end;
        }
    }
</style>
