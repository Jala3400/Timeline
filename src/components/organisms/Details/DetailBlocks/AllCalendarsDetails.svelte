<script lang="ts">
    import type { Calendario } from "../../../../classes/Calendario";
    import {
        calendars,
        configuration,
        constants,
        currentCalendar,
        currentDetails,
    } from "../../../../store";
    import ColoredButton from "../../../atoms/ColoredButton.svelte";

    const transparency = $constants.transparency;
    let color = $configuration.mainColor;

    /// Establece el calendario actual y cambia la vista a la de detalles del calendario.
    function selectCalendar(calendar: Calendario) {
        $currentCalendar = calendar;
        $currentDetails = "calendar";
    }
</script>

<div
    id="all-calendars-details"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
>
    <h1 id="title">Calendars</h1>
    <div id="calendars">
        {#each $calendars as calendar}
            <div class="calendar-details">
                <ColoredButton
                    text={calendar.name}
                    color={calendar.color}
                    func={() => {
                        selectCalendar(calendar);
                    }}
                />
            </div>
        {/each}
    </div>
</div>

<style>
    #all-calendars-details {
        padding: 1em;
        border-radius: 12px;
        background-color: var(--bg-secondary);
        text-align: unset;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    #title {
        margin-top: 10px;
        margin-left: 5px;
    }
    #calendars {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    @media (max-width: 1200px) {
        #title {
            font-size: 1.75em;
        }
    }
</style>
