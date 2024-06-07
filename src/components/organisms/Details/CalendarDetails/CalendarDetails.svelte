<script lang="ts">
    import {
        calendars,
        constants,
        currentCalendar,
        selectedCalendars,
    } from "../../../../store";
    import { deleteCalendar } from "../../../../lib/ManageEvents";

    const transparency = $constants.transparency;

    $: color = $currentCalendar.color;
    let calendarName = $currentCalendar.name;
    let prevName = $currentCalendar.name;

    /**
     *  Cambia el nombre del calendario actual.
     *  @param calName El nuevo nombre del calendario.
     */
    function changeName(calName: string) {
        if (calName == prevName) {
            calendarName = prevName;
        } else if (!Object.keys($calendars).includes(calName)) {
            // Si el nombre no está elegido, se cambia el nombre del calendario.
            let descriptor = Object.getOwnPropertyDescriptor(
                $calendars,
                prevName
            );
            if (descriptor) {
                // Si existe el calendario con el nombre anterior, se cambia el nombre. (Hay que ponerlo así por TypeScript)
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
                for (let i = 0; i < $calendars[calName].events.length; i++) {
                    // Cambia el nombre del calendario de los eventos.
                    $calendars[calName].events[i].setCalendar = calName;
                }
            }
        } else {
            // Si el nombre ya está elegido, se pide otro nombre.
            console.log("taken");
            let newName = prompt(
                "El nombre del calendario ya existe, elige otro",
                prevName
            );
            changeName(newName || prevName);
        }
    }

    /// Al cambiar el color del calendario actual, se actualiza el color del calendario.
    currentCalendar.subscribe((value) => {
        $calendars[value.name].setColor = value.color;
        calendarName = value.name;
        prevName = value.name;
    });
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
    <input type="color" bind:value={$currentCalendar.color} />
    <button
        on:click={() => {
            deleteCalendar($currentCalendar.name);
        }}>Delete</button
    >
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
    @media (max-width: 1200px) {
        #calendar-name {
            font-size: 1.75em;
        }
    }
</style>
