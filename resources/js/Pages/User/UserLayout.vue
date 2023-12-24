<script setup>
import Avatar from '@/Components/Misc/Avatar.vue'
import Section from '@/Components/Layout/Section.vue'
import Navbar from '@/Partials/Navbar.vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import Footer from '@/Partials/Footer.vue'
import SubMenu from '@/Pages/User/Partials/SubMenu.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Text from '@/Components/Text.vue'
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'
import Stack from '@/Components/Layout/Stack.vue'
import formService from '@/Services/form.service.js'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import Multiselect from '@vueform/multiselect'
import InputLabel from '@/Components/Elements/Form/InputLabel.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import Textarea from '@/Components/Elements/Form/Textarea.vue'

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

formService.setForm(form).setRouteName('user')
</script>

<template>
    <Head :title="`Profil de ${user.username}`"></Head>
    <PageLayout>
        <Stack spacing="4">
            <div class="flex items-center">
                <div>
                    <Avatar
                        :user="user"
                        size="lg"
                        class="mr-4"
                        :rounded="false"
                    />
                </div>
                <Stack spacing="2">
                    <Text type="title">{{ user.username }}</Text>
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
                        class="btn btn-info btn-outline"
                        @click="formService.openModal('editProfile')"
                    >
                        Modifier le profil
                    </button>

                    <Modal
                        id="editProfileModal"
                        title="Modifier le profil"
                        max-width="2xl"
                    >
                        <form @submit.prevent="formService.handle('update')">
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
                                    <Avatar size="lg" />
                                    <input
                                        type="file"
                                        class="file-input file-input-bordered w-full"
                                        @input="
                                            form.avatar = $event.target.files[0]
                                        "
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.avatar"
                                    />
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
                                        class="mt-2"
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
                <button class="btn btn-sm">Publications</button>
                <button class="btn btn-sm">Badges</button>
            </div>
            <slot />
        </Stack>
    </PageLayout>

    <SubMenu :user="user" />
</template>

<style scoped></style>
