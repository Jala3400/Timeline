<script lang="ts">
    import { constants } from "../../../store";

    export let showModal: boolean;
    export let color = "#404040";

    let dialog: HTMLDialogElement; // HTMLDialogElement

    const transparency = $constants.transparency;

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    style="--main-color:{color}{transparency.main};
    --main-color-hover:{color}{transparency.hover};
    --main-color-active:{color}{transparency.active};
    --main-color-full:{color}{transparency.full}"
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <form
        class="modal"
        on:click|stopPropagation
        on:submit|preventDefault={() => dialog.close()}
    >
        <div id="header">
            <slot name="header" />
        </div>
        <div id="content">
            <slot name="content" />
        </div>

        <div id="buttons">
            <slot name="buttons" />
            <button on:click={() => dialog.close()}>Close</button>
        </div>
    </form>
</dialog>

<style>
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
        background-color: var(--main-background);
        border: 2px solid var(--main-color-full);
        border-radius: 12px;
    }
    dialog::backdrop {
        background: var(--dialog-backdrop);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }
    .modal {
        padding: 1em;
        color: var(--color);
        background-color: var(--main-color);
        display: grid;
        gap: 20px;
    }
    .modal {
        padding: 1em;
        color: var(--color);
        background-color: var(--main-color);
        display: grid;
        gap: 20px;
    }

    #header,
    #content {
        border-bottom: 1px solid var(--main-color-full);
        padding: 0 10px;
    }

    #content {
        padding-bottom: 20px;
    }

    #buttons {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }

    dialog[open] {
        animation: zoom 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.15s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
