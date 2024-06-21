<script lang="ts">
    import { Evento } from "../../../classes/Evento";
    import EventChip from "../../molecules/EventChip.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    export let eventos: Evento[] = [];
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

    function handleClick(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        if (target) {
            const date = new Date(day);
            date.setHours((e.offsetY / target.clientHeight) * 24);

            // De esta forma se consigue dónde se ha hecho click dentro del bloque
            const block = target.clientHeight / 24;
            const blockNumber = Math.floor(e.offsetY / block);
            date.setMinutes(((e.offsetY - blockNumber * block) / block) * 60);

            dispatch("addEvent", { date: date });
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="day"
    on:click={(e) => {
        handleClick(e);
    }}
>
    {#each eventos as evento}
        <EventChip event={evento} />
    {/each}
    {#if today}
        <div id="today" style="top:{top}%" on:click|stopPropagation></div>
    {/if}
</div>

<style>
    .day {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 1px;
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
    #today {
        position: absolute;
        width: 100%;
        opacity: 0.5;
        height: 2px;
        background-color: var(--main-color);
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
        background-color: var(--main-color);
        color: var(--main-color);
    }
</style>
