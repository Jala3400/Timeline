<script>
    import { onMount } from "svelte";
    import EventCard from "./components/atoms/EventCard/EventCard.svelte";
    import NeonButton from "./components/atoms/AddEventBtn/AddEventBtn.svelte";
    let color = "#ff0000";

    let transparency = "60";
    let transparencyHover = "90";
    let transparencyActive = "AA";

    let events = ["Objetivo"];
    let eventText = "";

    onMount(() => {
        const existingEvents = localStorage.getItem("events");
        events = JSON.parse(existingEvents) || ["Objetivo"];
    });

    function addEventCard(index) {
        let title = prompt("Event name", "new event");
        events.splice(index + 1, 0, title);
        events = events;
        localStorage.setItem("events", JSON.stringify(events));
    }
</script>

<main id="main-container">
    <button on:click={localStorage.clear} hidden></button>
    {#each events as event, i}
        <EventCard
            eventName={event}
            --color="{color}{transparency}"
            --color-hover="{color}{transparencyHover}"
            --color-active="{color}{transparencyActive}"
        />
        <NeonButton
            func={addEventCard}
            text={"+"}
            index={i}
            --color="{color}{transparency}"
            --color-hover="{color}{transparencyHover}"
            --color-active="{color}{transparencyActive}"
        />
    {/each}
    <EventCard
        eventName="Today"
        --color="{color}{transparency}"
        --color-hover="{color}{transparencyHover}"
        --color-active="{color}{transparencyActive}"
    />
</main>

<style>
    #main-container {
        padding: 1rem;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
</style>
