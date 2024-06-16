<script lang="ts">
    export let label: string;
    export let type: string;
    export let value: any;

    export let change = () => {};

    export let input = () => {};

    function handleInput(e: any) {
        value = e.target.value;
    }
</script>

<label class="comp-input">
    {label}
    <input
        {type}
        on:input={(e) => {
            handleInput(e);
            input();
        }}
        {value}
        on:change={change}
    />
</label>

<style>
    .comp-input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        width: 100%;
    }
</style>
