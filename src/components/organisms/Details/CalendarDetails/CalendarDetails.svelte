<script lang="ts">
    import {
        calendars,
        constants,
        currentCalendar,
        currentDetails,
        selectedCalendars,
    } from "../../../../store";

    $: color = $currentDetails.color;
    const transparency = $constants.transparency;

    let calendarName = $currentCalendar.name;
    let prevName = $currentCalendar.name;

    function changeName(calName: string) {
        if (calName == prevName) {
            calendarName = prevName;
        } else if (!Object.keys($calendars).includes(calName)) {
            let descriptor = Object.getOwnPropertyDescriptor(
                $calendars,
                prevName
            );
            if (descriptor) {
                Object.defineProperty($calendars, calName, descriptor);
                $calendars = $calendars;
                $selectedCalendars.splice(
                    $selectedCalendars.indexOf(prevName),
                    1,
                    calName
                );
                delete $calendars[prevName];
                $currentCalendar.name = calName;
                prevName = calName;
                $selectedCalendars = $selectedCalendars;
            }
        } else {
            console.log("taken");
            let newName = prompt(
                "El nombre del calendario ya existe, elige otro",
                prevName
            );
            changeName(newName || prevName);
        }
    }
</script>

<div
    id="calendar-details"
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active}"
>
    <input
        id="calendar-name"
        type="text"
        bind:value={calendarName}
        on:change={() => {
            changeName(calendarName);
        }}
    />
    <input type="color" bind:value={$currentCalendar.calendar.color} />
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
        margin: 15px 0;
        font-size: 2em;
        font-weight: bold;
        background-color: transparent;
    }
    #calendar-name:focus {
        background-color: #0f0f0f98;
    }

    @media (max-width: 1200px) {
        #calendar-name {
            font-size: 1.75em;
        }
    }
</style>
