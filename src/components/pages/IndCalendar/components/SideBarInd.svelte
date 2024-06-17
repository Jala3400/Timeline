<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import SideBar from "../../../organisms/SideBar/SideBar.svelte";
    import FilterSide from "./SideBar/FilterSide.svelte";
</script>

<SideBar>
    <div slot="top">
        <IconButton text="B" />
    </div>
    <FilterSide on:addEvent slot="main" />
</SideBar>
