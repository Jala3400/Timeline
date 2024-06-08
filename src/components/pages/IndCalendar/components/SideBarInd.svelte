<script lang="ts">
    import IconCard from "../../../atoms/IconCard.svelte";
    import SideBar from "../../../organisms/SideBar/SideBar.svelte";
    import CalendarsSide from "./SideBar/CalendarSide.svelte";
</script>

<SideBar>
    <div slot="top">
        <IconCard text="B" />
    </div>
    <CalendarsSide on:addEvent slot="main" />
</SideBar>
