<script lang="ts">
    import {
        calendars,
        configuration,
        constants,
        currentCalendar,
        currentDetails,
    } from "../../../../store";
    import ColoredButton from "../../../atoms/ColoredButton/ColoredButton.svelte";

    const transparency = $constants.transparency;
    let color = $configuration.mainColor;

    function selectCalendar(calendar: string) {
        $currentCalendar = { calendar: $calendars[calendar], name: calendar };
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
        {#each Object.entries($calendars) as [calendar, value]}
            <div class="calendar-details">
                <ColoredButton
                    text={calendar}
                    color={value.color}
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
        background-color: var(--secondary-background);
        text-align: unset;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    #title {
        margin-top: 20px;
        margin-left: 5px;
    }
    #calendars {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .calendar-details {
        display: flex;
        gap: 0.5em;
    }
    @media (max-width: 1200px) {
        #title {
            font-size: 1.75em;
        }
    }
</style>
