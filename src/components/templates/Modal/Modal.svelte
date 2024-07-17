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
    on:mousedown|self={() => dialog.close()}
    style="--main-color-pure:{color};
    --main-color:{color}{transparency.main};
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
        <slot />
    </form>
</dialog>

<style>
    dialog {
        border-radius: 0.2em;
        border: none;
        padding: 0;
        background-color: var(--bg);
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
        display: flex;
        flex-direction: column;
        gap: 20px;
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
</style>
