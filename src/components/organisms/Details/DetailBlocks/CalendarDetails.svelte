<script lang="ts">
    import { calendars, constants, currentCalendar } from "../../../../store";
    import { deleteCalendar } from "../../../../lib/ManageEvents";
    import CompInput from "../../../molecules/CompInput.svelte";

    const transparency = $constants.transparency;

    $: color = $currentCalendar.color;

    /// Actualiza los calendarios
    currentCalendar.subscribe((value) => {
        $calendars = $calendars;
    });
</script>

<div
    id="calendar-details"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
>
    <input id="calendar-name" type="text" bind:value={$currentCalendar.name} />
    <div id="calendar-data">
        <CompInput
            label="Color"
            type="color"
            bind:value={$currentCalendar.color}
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
                    deleteCalendar($currentCalendar);
                }}>Delete</button
            >
        </div>
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
