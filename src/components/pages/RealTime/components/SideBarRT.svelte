<script lang="ts">
    import IconButton from "../../../atoms/IconButton.svelte";
    import SideBar from "../../../organisms/SideBar/SideBar.svelte";
    import FiltersSide from "../../../organisms/SideBar/SideBlocks/FiltersSide.svelte";
</script>

<SideBar>
    <div slot="top">
        <IconButton text="B" selected={true} />
    </div>
    <FiltersSide on:addEvent slot="main" date={false} />
</SideBar>
