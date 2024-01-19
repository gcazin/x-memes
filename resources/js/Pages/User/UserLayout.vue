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
    x_username: auth?.x_username,
    github_username: auth?.github_username,
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
                        <div class="text-center lg:text-left">
                            <Text type="title">
                                {{ user.username }}
                                <RoleBadge :user="user" />
                            </Text>
                        </div>
                        <Text>
                            {{ user.description }}
                        </Text>
                        <div
                            class="flex"
                            v-if="user.x_username || user.github_username"
                        >
                            <div class="flex flex-1 items-center gap-2">
                                <a
                                    :href="`https://x.com/${user.x_username}`"
                                    target="_blank"
                                >
                                    <Button
                                        ghost
                                        size="sm"
                                        class="px-1"
                                        v-if="user.x_username"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            fill="none"
                                            viewBox="0 0 1200 1227"
                                        >
                                            <path
                                                fill="#fff"
                                                d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                                            />
                                        </svg>
                                        <Text type="sub"
                                            >@{{ user.x_username }}</Text
                                        >
                                    </Button>
                                </a>
                                <a
                                    :href="`https://github.com/${user.github_username}`"
                                    target="_blank"
                                >
                                    <Button
                                        ghost
                                        size="sm"
                                        class="px-1"
                                        v-if="user.github_username"
                                    >
                                        <Icon
                                            name="logo-github"
                                            size="xl"
                                            :outline="false"
                                        />
                                        <Text type="sub"
                                            >@{{ user.github_username }}</Text
                                        >
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <div class="flex gap-2 text-center md:gap-4">
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
                            <Text type="sub">
                                {{
                                    helperService.plural(
                                        user.followings_count,
                                        'abonnnement'
                                    )
                                }}
                            </Text>
                        </div>
                    </Stack>
                    <div class="flex-1 text-right" v-if="auth">
                        <FollowButton
                            v-if="auth && user.id !== auth?.id"
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
                                            required
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
                                    <div
                                        class="flex flex-col gap-4 lg:flex-row"
                                    >
                                        <div class="flex-1">
                                            <TextInput
                                                label="Nom d'utilisateur X"
                                                v-model="form.x_username"
                                                autofocus
                                                placeholder="johndoe"
                                            />
                                            <InputError
                                                :message="
                                                    form.errors.description
                                                "
                                            />
                                        </div>
                                        <div class="flex-1">
                                            <TextInput
                                                label="Nom d'utilisateur GitHub"
                                                v-model="form.github_username"
                                                autofocus
                                                placeholder="johndoe"
                                            />
                                            <InputError
                                                :message="
                                                    form.errors.github_username
                                                "
                                            />
                                        </div>
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
