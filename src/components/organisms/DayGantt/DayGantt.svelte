<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { Evento } from "../../../classes/Evento";
    import { selectEvent } from "../../../lib/ManageEvents";

    const dispatch = createEventDispatcher();
    export let events: Evento[] = [];
    export let day: Date;

    $: today = day.toDateString() === new Date().toDateString();

    let left =
        ((new Date().getHours() + new Date().getMinutes() / 60) / 24) * 100;

    let interval: NodeJS.Timer;

    onMount(() => {
        interval = setInterval(() => {
            if (today) {
                left =
                    ((new Date().getHours() + new Date().getMinutes() / 60) /
                        24) *
                    100;
            }
        }, 60000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    function getAproxDate(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        if (target) {
            const date = new Date(day);
            date.setHours((e.offsetX / target.clientWidth) * 24);

            // De esta forma se consigue dónde se ha hecho click dentro del bloque
            const block = target.clientWidth / 24;
            const blockNumber = Math.floor(e.offsetX / block);
            const roundedMinutes =
                ((e.offsetX - blockNumber * block) / block) * 60;
            date.setMinutes(Math.round(roundedMinutes / 5) * 5);

            return date;
        }
        return new Date();
    }

    function getFormattedTime(e: MouseEvent) {
        return getAproxDate(e).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function addEvent(e: MouseEvent) {
        dispatch("addEvent", { date: getAproxDate(e) });
    }

    let followCursor: boolean = false;
    let cursorLeft: number = 0;
    let cursorTime: string = "";
    // on:click={(e) => {
    //     addEvent(e);
    // }}
    // on:mouseenter={(e) => {
    //     followCursor = true;
    //     cursorLeft = e.offsetX;
    //     cursorTime = getFormattedTime(e);
    // }}
    // on:mouseleave={(e) => {
    //     followCursor = false;
    // }}
    // on:mousemove={(e) => {
    //     if (followCursor) {
    //         cursorLeft = e.offsetX;
    //         cursorTime = getFormattedTime(e);
    //     }
    // }}
</script>

<div id="day-gantt" role="presentation">
    <div
        class="follow-cursor"
        class:visible={followCursor}
        style="left:{cursorLeft}px"
    >
        <div class="popover">
            {cursorTime}
        </div>
    </div>

    <div
        class="events-container"
        on:mouseenter|stopPropagation
        role="presentation"
    >
        {#each events as event}
            <div
                class="event"
                style="left:{((new Date(event.date ?? 0).getHours() +
                    new Date(event.date ?? 0).getMinutes() / 60) /
                    24) *
                    100}%"
                on:click|stopPropagation={(e) => selectEvent(e, event)}
                on:mousedown|stopPropagation
                role="presentation"
            >
                <div class="event-chip">{event.name}</div>
            </div>
        {/each}
    </div>

    {#if today}
        <div
            id="today"
            style="left:{left}%"
            on:mousedown|stopPropagation
            on:click|stopPropagation
            role="presentation"
        ></div>
    {/if}
</div>

<style>
    #day-gantt {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background-image: repeating-linear-gradient(
            to right,
            var(--divider-color),
            var(--divider-color) 1px,
            transparent 1px,
            transparent calc(1 / 24 * 100%)
        );
        cursor: crosshair;
        border: 1px solid var(--divider-color);
        min-width: 60rem;
        padding-top: 10px;
    }

    .event {
        /* z-index: 1; */
        position: absolute;
        display: flex;
        padding: 0;
        height: 100%;
        background-color: transparent;
        border-left: 3px solid var(--main-color);
        border-radius: 0;
        cursor: pointer;
    }

    .event-chip {
        padding: 10px;
        height: 3em;
        max-width: 15em;
        background-color: var(--main-color);
        border-radius: 0 4px 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .events-container {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .follow-cursor {
        position: absolute;
        display: flex;
        justify-content: center;
        height: 100%;
        width: 2px;
        background-color: var(--main-color-pure);
        opacity: 0;
        pointer-events: none;
        transition: 0s;
    }

    .follow-cursor.visible {
        opacity: 1;
    }

    .popover {
        user-select: none;
        position: absolute;
        left: -3em;
        color: var(--main-color-pure);
    }

    #today {
        position: absolute;
        height: 100%;
        opacity: 0.5;
        width: 2px;
        background-color: var(--main-color-pure);
        cursor: auto;
    }
</style>
