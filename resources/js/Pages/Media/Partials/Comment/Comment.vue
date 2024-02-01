<script setup>
import Button from '@/Components/Button/Button.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import CommentForm from '@/Pages/Media/Partials/Comment/CommentForm.vue'
import formService from '@/Services/form.service.js'
import helperService from '@/Services/helper.service.js'
import { useForm, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps({
    media: {
        type: Object,
        required: true,
    },
    comment: {
        type: Object,
        required: true,
    },
    isReply: {
        type: Boolean,
        default: false,
        required: false,
    },
})

const page = usePage()
const auth = page.props.auth?.user
const openReply = defineModel('openReply', { type: Boolean, default: false })
const replyComment = defineModel('replyComment', {
    type: Number,
    default: null,
})
const editComment = ref(null)

const form = useForm({
    content: null,
    media_id: props.media.id,
})

const getReplies = (comment) => {
    openReply.value = !openReply.value
    replyComment.value = comment.id
}

const editCommentForm = (comment) => {
    console.log('iocio')
    editComment.value = comment.id
}
</script>

<template>
    <Section :class="{ 'ms-auto w-11/12': isReply }">
        <Stack spacing="6">
            <div class="flex items-center gap-4">
                <Avatar :user="comment.user" class="w-10 md:w-12" />
                <Text>
                    <a :href="route('user.show', comment.user.username)">
                        {{ comment.user.username }}
                    </a>
                </Text>
                <Text type="xs">
                    {{ comment.created_at }}
                </Text>
                <Text
                    v-if="comment.created_at !== comment.updated_at"
                    type="xs"
                    class="italic"
                >
                    modifié {{ comment.updated_at }}
                </Text>
                <div
                    class="dropdown dropdown-end ms-auto"
                    v-if="
                        comment.user.id === auth?.id ||
                        helperService.checkRoles('super-admin')
                    "
                >
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-xs"
                    >
                        <Icon name="ellipsis-vertical" size="lg" />
                    </div>
                    <ul
                        tabindex="0"
                        class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li>
                            <button @click="editCommentForm(comment)">
                                Modifier
                            </button>
                        </li>
                        <li>
                            <div
                                @click="
                                    formService
                                        .setForm(form)
                                        .setRouteName('media.comment')
                                        .handle('destroy', comment)
                                "
                            >
                                Supprimer
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <CommentForm
                v-if="editComment && editComment === comment.id"
                :media
                :comment="comment"
                is-editing
                v-model="editComment"
                submit-text="Modifier"
            />
            <div v-else>{{ comment.content }}</div>
            <div class="flex items-center space-x-2" v-if="auth">
                <Button
                    size="sm"
                    ghost
                    @click="
                        formService
                            .setForm(form)
                            .setRouteName('media.comment')
                            .setPreserveState()
                            .handle('like', comment, 'get')
                    "
                    :disabled="form.processing || !page.props.auth?.user"
                    :class="
                        page.props.auth?.user
                            ? comment.likers
                                  ?.map((liker) => liker.id)
                                  .includes($page.props.auth.user.id)
                                ? 'btn-error text-error'
                                : 'btn-ghost'
                            : ''
                    "
                >
                    <Icon size="xl" name="heart" />
                    {{ comment.likers.length }}
                </Button>
                <Button
                    v-if="!isReply"
                    ghost
                    size="sm"
                    @click="getReplies(comment)"
                >
                    <Icon size="xl" name="chatbox-ellipses" />
                    {{
                        comment.replies.length
                            ? `Voir les réponses (${comment.replies.length})`
                            : 'Sois le premier à commenter'
                    }}
                </Button>
            </div>
        </Stack>
    </Section>
</template>

<style scoped></style>
