<script setup>
import InputError from '@/Components/Elements/Form/InputError.vue'
import InputLabel from '@/Components/Elements/Form/InputLabel.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import { useForm } from '@inertiajs/vue3'
import { nextTick, ref } from 'vue'
import Section from '@/Components/Layout/Section.vue'
import formService from '@/Services/form.service.js'
import ActionModal from '@/Components/Elements/Modal/ActionModal.vue'

const passwordInput = ref(null)

const form = useForm({
    password: '',
})

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    })
}

const closeModal = () => {
    confirmingUserDeletion.value = false

    form.reset()
}
</script>

<template>
    <header>
        <h2 class="text-lg font-medium text-error">Supprimer le compte</h2>

        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Une fois votre compte supprimé, toutes ses ressources et données
            seront définitivement effacées. Avant de supprimer votre compte,
            veuillez télécharger toutes les données ou informations que vous
            souhaitez conserver.
        </p>
    </header>

    <button
        class="btn btn-error mt-4"
        @click="formService.openModal('deleteAccount')"
    >
        Supprimer le compte
    </button>

    <Modal id="deleteAccountModal" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Êtes-vous sûr de vouloir supprimer votre compte ?
            </h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Une fois votre compte supprimé, toutes ses ressources et données
                seront définitivement effacées. Veuillez saisir votre mot de
                passe pour confirmer que vous souhaitez supprimer définitivement
                votre compte.
            </p>

            <TextInput
                label="Mot de passe"
                ref="passwordInput"
                v-model="form.password"
                type="password"
                class="mt-1 block w-3/4"
                placeholder="Password"
                @keyup.enter="deleteUser"
            />

            <InputError :message="form.errors.password" class="mt-2" />

            <div class="mt-6 flex justify-end">
                <button
                    class="btn btn-secondary"
                    @click="formService.closeModal('deleteAccount')"
                >
                    Annuler
                </button>

                <button
                    class="btn btn-error ms-3"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    @click="deleteUser"
                >
                    Supprimer le compte
                </button>
            </div>
        </div>
    </Modal>
</template>
