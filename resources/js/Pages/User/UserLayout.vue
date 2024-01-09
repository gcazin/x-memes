<script setup>
import Button from '@/Components/Button/Button.vue'
import FollowButton from '@/Components/Button/FollowButton.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Textarea from '@/Components/Form/Textarea.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import helperService from '../../Services/helper.service.js'

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
            <Stack spacing="8">
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
                        <div>
                            <Text
                                type="title"
                                class="inline text-center lg:text-left"
                            >
                                {{ user.username }}
                                <RoleBadge :user="user" />
                            </Text>
                        </div>
                        <Text>
                            {{ user.description }}
                        </Text>
                        <div class="flex gap-4">
                            <Text type="sub">
                                {{
                                    helperService.plural(
                                        'total' in medias
                                            ? medias.total
                                            : medias.length,
                                        'publication'
                                    )
                                }}
                            </Text>
                            <Text type="sub">
                                {{
                                    helperService.plural(
                                        downloadMediaCount,
                                        'téléchargement'
                                    )
                                }}
                            </Text>
                            <Text type="sub">
                                {{
                                    helperService.plural(
                                        user.followers.length,
                                        'abonné'
                                    )
                                }}
                            </Text>
                        </div>
                    </Stack>
                    <div class="flex-1 text-right">
                        <FollowButton
                            v-if="auth && user.id !== auth.id"
                            :user="user"
                        />
                        <Button
                            v-else
                            type="secondary"
                            outline
                            size="sm"
                            @click="formService.openModal('editProfile')"
                        >
                            Modifier le profil
                        </Button>

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
                                                form.avatar =
                                                    $event.target.files[0]
                                            "
                                        />
                                        <InputError
                                            :message="form.errors.avatar"
                                        />
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
                                    <LoadingButton :loading="form.processing">
                                        Modifier le profil
                                    </LoadingButton>
                                </Stack>
                            </form>
                        </Modal>
                    </div>
                </div>
                <div role="tablist" class="tabs tabs-lifted tabs-lg">
                    <a
                        :href="route('user.show', user.username)"
                        role="tab"
                        class="tab"
                        :class="{
                            'bg-primary/30 font-bold':
                                route().current('user.show'),
                        }"
                    >
                        <Icon name="document" size="lg" class="mr-1" />
                    </a>
                    <a
                        :href="route('user.media.liked', user.username)"
                        role="tab"
                        class="tab"
                        :class="{
                            'bg-primary/30 font-bold':
                                route().current('user.media.liked'),
                        }"
                    >
                        <Icon name="heart" size="lg" class="mr-1" />
                    </a>
                    <a
                        :href="route('user.badge.index', user.username)"
                        role="tab"
                        class="tab"
                        :class="{
                            'bg-primary/30 font-bold':
                                route().current('user.badge.index'),
                        }"
                    >
                        <Icon name="apps" size="lg" class="mr-1" />
                    </a>
                </div>
            </Stack>
            <slot />
        </Stack>
    </PageLayout>
</template>

<style scoped></style>
