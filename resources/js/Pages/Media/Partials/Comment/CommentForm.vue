<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputError from '@/Components/Form/InputError.vue'
import Textarea from '@/Components/Form/Textarea.vue'
import Avatar from '@/Components/User/Avatar.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { useForm, usePage } from '@inertiajs/vue3'
import { onMounted, onUpdated, ref } from 'vue'
import Button from '@/Components/Button/Button.vue'

const props = defineProps({
    media: {
        type: Object,
        required: true,
    },
    comment: {
        type: Object,
        required: false,
    },
    isReply: {
        type: Boolean,
        default: false,
    },
    isEditing: {
        type: Boolean,
    },
    submitText: {
        type: String,
        default: 'Commenter'
    },
    labelText: {
        type: String,
        default: 'Commentaire'
    },
})

const form = useForm({
    content: null,
    media_id: props.media.id,
    ...(props.isReply && {
        parent_id: props.comment.id,
    }),
    ...(props.isEditing && {
        comment_id: props.comment.id,
    })
})

onMounted(() => {
    if (props.isEditing) {
        console.log(props.comment)
        form.content = props.comment.content
    }
})

const page = usePage()
const auth = page.props.auth
const cancel = defineModel('cancel', { type: Boolean, default: false })

/**
 * Handle the submission for comment and reply
 */
const submit = () => {
    formService.setRouteName('media.comment').setForm(form)

    const media = props.media
    if (props.isReply) {
        formService.setRouteName('media.comment.reply').setPreserveState()
        return formService.handle('store', media)
    }

    if (props.isEditing) {
        return formService.handle('update', media)
    }

    return formService.setPreserveState().handle('store', media)
}

const cancelForm = () => {
    cancel.value = !cancel.value
}
</script>

<template>
    <form @submit.prevent="submit()">
        <Stack spacing="2">
            <div class="flex items-center">
                <div class="text-center" v-if="! isEditing">
                    <Avatar :user="auth.user" class="mr-4 w-10 md:w-12" />
                </div>
                <div class="flex-1">
                    <Textarea
                        :label="labelText"
                        v-model="form.content"
                        autofocus
                        :disabled="!auth.isConnected"
                        :placeholder="`J't'écoute ${auth.user.username}, dit-moi tout`"
                    />

                    <InputError :message="form.errors.content" />
                </div>
            </div>
            <div class="text-right space-x-2">
                <Button ghost v-if="isEditing || isReply" @click="cancelForm()">Fermer</Button>
                <LoadingButton>{{ submitText }}</LoadingButton>
            </div>
        </Stack>
    </form>
</template>

<style scoped></style>