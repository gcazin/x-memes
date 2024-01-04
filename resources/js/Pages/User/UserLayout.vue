<script setup>
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Textarea from '@/Components/Elements/Form/Textarea.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Avatar from '@/Components/Misc/Avatar.vue'
import Text from '@/Components/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import formService from '@/Services/form.service.js'
import { Head, useForm, usePage } from '@inertiajs/vue3'

const props = defineProps({
    user: {
        type: Array,
    },
    medias: {
        type: Array,
    },
})

const page = usePage()
const auth = page.props.auth?.user

const form = useForm({
    username: auth?.username,
    description: auth?.description,
    avatar: null,
})

const downloadMediaCount =
    props.user.medias && props.user.medias.length
        ? props.user.medias
              .map((media) => media.download_count)
              .reduce((accumulator, media) => accumulator + media)
        : 0

const updateUser = () => {
    form.post(route('user.update'), {
        onSuccess: () => {
            formService.closeModal()
        },
    })
}
</script>

<template>
    <Head :title="`Profil de ${user.username}`"></Head>
    <PageLayout>
        <Stack spacing="4">
            <div class="flex flex-col items-center lg:flex-row">
                <div>
                    <Avatar
                        :user="user"
                        size="lg"
                        class="lg:mr-4"
                        :rounded="false"
                    />
                </div>
                <Stack spacing="2" class="mb-4 lg:mb-0">
                    <Text type="title" class="text-center lg:text-left">{{
                        user.username
                    }}</Text>
                    <Text>
                        {{ user.description }}
                    </Text>
                    <div class="flex gap-4">
                        <Text type="sub">
                            {{
                                'total' in medias ? medias.total : medias.length
                            }}
                            publication
                        </Text>
                        <Text type="sub">
                            {{ downloadMediaCount }} téléchargements
                        </Text>
                        <Text type="sub">
                            {{ user.followers.length }} abonnés
                        </Text>
                    </div>
                </Stack>
                <div class="flex-1 text-right">
                    <FollowButton
                        v-if="auth && user.id !== auth.id"
                        :user="user"
                    />
                    <button
                        v-else
                        class="btn btn-outline btn-secondary btn-sm"
                        @click="formService.openModal('editProfile')"
                    >
                        Modifier le profil
                    </button>

                    <Modal
                        id="editProfileModal"
                        title="Modifier le profil"
                        max-width="2xl"
                    >
                        <form @submit.prevent="updateUser()">
                            <Stack>
                                <div>
                                    <TextInput
                                        label="Nom d'utilisateur"
                                        v-model="form.username"
                                    />
                                    <InputError
                                        :message="form.errors.username"
                                    />
                                </div>
                                <div class="flex items-center gap-4">
                                    <Avatar
                                        :user="$page.props.auth.user"
                                        size="lg"
                                    />
                                    <input
                                        type="file"
                                        class="file-input file-input-bordered w-full"
                                        @input="
                                            form.avatar = $event.target.files[0]
                                        "
                                    />
                                    <InputError :message="form.errors.avatar" />
                                </div>
                                <div>
                                    <progress
                                        v-if="form.progress"
                                        class="progress progress-primary w-full"
                                        :value="form.progress.percentage"
                                        max="100"
                                    >
                                        {{ form.progress.percentage }}%
                                    </progress>
                                </div>
                                <div>
                                    <Textarea
                                        label="Description"
                                        v-model="form.description"
                                        autofocus
                                        autocomplete="description"
                                    />
                                    <InputError
                                        :message="form.errors.description"
                                    />
                                </div>
                                <LoadingButton :loading="form.processing">
                                    Modifier le profil
                                </LoadingButton>
                            </Stack>
                        </form>
                    </Modal>
                </div>
            </div>
            <div class="flex gap-2">
                <a :href="route('user.show', user.username)" class="btn btn-sm"
                    >Publications</a
                >
                <a
                    :href="route('user.badge.index', user.username)"
                    class="btn btn-sm"
                    >Badges</a
                >
            </div>
            <slot />
        </Stack>
    </PageLayout>
</template>

<style scoped></style>
