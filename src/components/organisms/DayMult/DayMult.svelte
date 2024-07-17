<script lang="ts">
    import { Evento } from "../../../classes/Evento";
    import EventChip from "../../molecules/EventChip.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    export let events: Evento[] = [];
    export let day: Date;

    $: today = day.toDateString() === new Date().toDateString();

    let top =
        ((new Date().getHours() + new Date().getMinutes() / 60) / 24) * 100;

    let interval: NodeJS.Timer;

    onMount(() => {
        interval = setInterval(() => {
            if (today) {
                top =
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
            date.setHours((e.offsetY / target.clientHeight) * 24);

            // De esta forma se consigue dónde se ha hecho click dentro del bloque
            const block = target.clientHeight / 24;
            const blockNumber = Math.floor(e.offsetY / block);
            const roundedMinutes =
                ((e.offsetY - blockNumber * block) / block) * 60;
            date.setMinutes(Math.round(roundedMinutes / 5) * 5);

            return date;
        }
        return new Date();
    }

    function getFormattedTime(e: MouseEvent) {
        return getAproxDate(e).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function addEvent(e: MouseEvent) {
        dispatch("addEvent", { date: getAproxDate(e) });
    }

    let followCursor: boolean = false;
    let cursorTop: number = 0;
    let cursorTime: string = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="day"
    on:click={(e) => {
        followCursor = false;
        addEvent(e);
    }}
    on:mousedown={(e) => {
        followCursor = true;
        cursorTop = e.offsetY;
        cursorTime = getFormattedTime(e);
    }}
    on:mousemove={(e) => {
        if (followCursor) {
            cursorTop = e.offsetY;
            cursorTime = getFormattedTime(e);
        }
    }}
>
    <div
        class="follow-cursor"
        class:visible={followCursor}
        style="top:{cursorTop}px"
    >
        <div class="popover" class:bottom={cursorTop < 20}>
            {cursorTime}
        </div>
    </div>

    {#each events as evento}
        <EventChip event={evento} />
    {/each}
    {#if today}
        <div
            id="today"
            style="top:{top}%"
            on:mousedown|stopPropagation
            on:click|stopPropagation
        ></div>
    {/if}
</div>

<style>
    .day {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        border-right: 1px solid var(--divider-color);
        background-image: repeating-linear-gradient(
            to top,
            var(--divider-color),
            var(--divider-color) 1px,
            transparent 1px,
            transparent calc(1 / 24 * 100%)
        );
        cursor: crosshair;
    }
    .follow-cursor {
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 2px;
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
        top: -1.5em;
        color: var(--main-color-pure);
    }
    .popover.bottom {
        top: 0;
    }
    #today {
        position: absolute;
        width: 100%;
        opacity: 0.5;
        height: 2px;
        background-color: var(--main-color-pure);
        cursor: auto;
    }
    #today::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translate(0, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--main-color-pure);
    }
</style>
