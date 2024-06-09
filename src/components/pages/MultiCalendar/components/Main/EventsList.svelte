<script lang="ts">
    import { eventsList } from "../../../../../store";
    import EventsList from "../../../../organisms/EventsList/EventsList.svelte";
</script>

<EventsList eventsList={$eventsList} />
