<script lang="ts">
    export let label: string;
    export let type: string;
    export let value: any;

    export let handleChange = () => {};

    function handleInput(e: any) {
        value = e.target.value;
    }
</script>

<label class="comp-input">
    {label}
    <input {type} on:input={handleInput} {value} on:change={handleChange} />
</label>

<style>
    .comp-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
</style>
