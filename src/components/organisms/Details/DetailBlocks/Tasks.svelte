<script lang="ts">
    import { onMount } from "svelte";
    import { loadTasks, saveTasks } from "../../../../lib/ManageEvents";
    import NavFolder from "../../../molecules/NavFolder.svelte";

    let todos: string[];
    let dones: string[];
    let newTodo = "";
    let todoInput: HTMLInputElement;

    onMount(() => {
        todoInput.focus();
    });
    [todos, dones] = loadTasks();

    function addTodo() {
        if (newTodo.trim() !== "") {
            todos = [...todos, newTodo];
            newTodo = "";
            saveTasks([todos, dones]);
            todoInput.focus();
        }
    }

    function check(index: number) {
        dones = [...dones, todos[index]];
        removeTodo(index);
    }

    function unCheck(index: number) {
        todos = [...todos, dones[index]];
        removeDone(index);
    }

    function removeTodo(index: number) {
        todos = todos.filter((_, i) => i !== index);
        saveTasks([todos, dones]);
    }

    function removeDone(index: number) {
        dones = dones.filter((_, i) => i !== index);
        saveTasks([todos, dones]);
    }
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addTodo();
        }
    }
</script>

<h1>Todo List</h1>

<div id="todo-input">
    <input
        type="text"
        bind:value={newTodo}
        placeholder="Enter a new todo"
        bind:this={todoInput}
        on:keydown={handleKeyDown}
    />
    <button on:click={addTodo}>+</button>
</div>

<div id="tasks">
    <ul id="todo-list">
        {#each todos as todo, index}
            <li>
                <div class="left">
                    <button class="check-button" on:click={() => check(index)}
                    ></button>
                    {todo}
                </div>
                <button on:click={() => removeTodo(index)}>X</button>
            </li>
        {/each}
    </ul>

    <NavFolder name="Done">
        <ul id="done-list">
            {#each dones as done, index}
                <li>
                    <div class="left">
                        <button
                            class="uncheck-button"
                            on:click={() => unCheck(index)}
                        ></button>
                        {done}
                    </div>
                    <button on:click={() => removeDone(index)}>X</button>
                </li>
            {/each}
        </ul>
    </NavFolder>
</div>

<style>
    #todo-input {
        display: flex;
        gap: 5px;
    }
    #todo-input input {
        border: 1px solid var(--divider-color);
    }
    #todo-input button {
        border: 1px solid var(--divider-color);
    }
    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    #tasks {
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 8px 0;
    }
    #done-list {
        opacity: 0.8;
    }
    .check-button {
        width: 1.25em;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
    }
    .uncheck-button {
        width: 1.25em;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
        background-color: var(--main-color);
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        border-bottom: 1px solid var(--divider-color);
    }
    li button {
        border-radius: 8px;
        padding: 0.5em;
        border: 1px solid var(--divider-color);
    }
</style>
