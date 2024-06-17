<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import SideBar from "../../../organisms/SideBar/SideBar.svelte";
    import FiltersSide from "./SideBar/FiltersSide.svelte";
</script>

<SideBar>
    <div slot="top">
        <IconButton text="B" selected={true} />
    </div>
    <FiltersSide on:addEvent slot="main" />
</SideBar>
