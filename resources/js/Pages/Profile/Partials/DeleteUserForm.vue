<script setup>
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

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
        <Text class="font-bold text-error">{{
            $t('Supprimer le compte')
        }}</Text>

        <Text type="sub">
            {{
                $t(
                    'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous souhaitez conserver.'
                )
            }}
        </Text>
    </header>

    <button
        class="btn btn-error mt-4"
        @click="formService.openModal('deleteAccount')"
    >
        {{ $t('Supprimer le compte') }}
    </button>

    <Modal id="deleteAccountModal" @close="closeModal">
        <div class="p-6">
            <Text class="font-bold">
                {{ $t('Êtes-vous sûr de vouloir supprimer votre compte ?') }}
            </Text>

            <Text type="sub">
                {{
                    $t(
                        'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte.'
                    )
                }}
            </Text>

            <TextInput
                label="Mot de passe"
                ref="passwordInput"
                v-model="form.password"
                type="password"
                class="mt-1 block w-3/4"
                placeholder="Mot de passe"
                @keyup.enter="deleteUser"
            />

            <InputError :message="form.errors.password" />

            <div class="mt-6 flex justify-end">
                <button
                    class="btn btn-primary"
                    @click="formService.closeModal('deleteAccount')"
                >
                    {{ $t('Annuler') }}
                </button>

                <button
                    class="btn btn-outline btn-error ms-3"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    @click="deleteUser"
                >
                    {{ $t('Supprimer le compte') }}
                </button>
            </div>
        </div>
    </Modal>
</template>
