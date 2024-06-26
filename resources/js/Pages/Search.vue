<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import Select from '@/Components/Form/Select.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import UserCard from '@/Components/User/UserCard.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import Gallery from '@/Pages/Media/Partials/Gallery.vue'
import formService from '@/Services/form.service.js'
import helperService from '@/Services/helper.service.js'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { trans } from 'laravel-vue-i18n'
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
    },
    query: {
        type: String,
    },
    result: {
        type: Array,
    },
})

const form = useForm({
    query: props.query ?? null,
    type: props.type ?? 'medias',
})

const title = computed(() => {
    if (props.result?.total) {
        return `${helperService.plural(
            props.result.total,
            'résultat'
        )} pour la recherche '${props.query}'`
    }

    return trans('Recherche un mème, un tag, ou un utilisateur')
})

const searchByType = [
    {
        name: 'medias',
        label: 'Mèmes',
    },
    {
        name: 'users',
        label: 'Utilisateurs',
    },
]

const search = () => {
    form.get(route('search'), {
        onSuccess: () => {
            router.reload({
                only: ['result'],
            })
        },
    })
}

const queryPlaceholder = computed(() => {
    switch (form.type) {
        case 'users':
            return `Rechercher par nom d'utilisateur (ex: john, jack...)`
        case 'medias':
            return 'Rechercher par titre, tags... (ex: paqueta, snap...)'
    }
    return null
})

formService.setForm(form).setRouteName(null)

const page = usePage()
</script>

<template>
    <Head :title="page.props.seo.title" />
    <PageLayout :title="title">
        <Stack spacing="8">
            <form @submit.prevent="search">
                <div class="flex flex-col items-center gap-4 lg:flex-row">
                    <label class="form-control w-full lg:w-1/4">
                        <select
                            v-model="form.type"
                            class="select select-bordered bg-base-300"
                        >
                            <option
                                v-for="(option, index) in searchByType"
                                :key="index"
                                :value="option.name"
                            >
                                {{ trans(option.label.trim()) }}
                            </option>
                        </select>
                    </label>
                    <TextInput
                        v-model="form.query"
                        :type="form.type"
                        :placeholder="queryPlaceholder"
                    />
                    <LoadingButton
                        :loading="form.processing"
                        class="ms-auto lg:m-auto"
                    >
                        {{ $t('Rechercher') }}
                    </LoadingButton>
                </div>
            </form>
            <Gallery
                v-if="type === 'medias' && !form.processing"
                :medias="result"
            />
            <div
                v-else-if="type === 'users' && !form.processing"
                class="flex gap-4"
            >
                <UserCard
                    v-for="(user, index) in result.data"
                    :key="index"
                    :user="user"
                />
            </div>
            <template v-if="!query">
                <img
                    src="/images/assets/wait.jpg"
                    class="mx-auto w-full rounded-lg shadow-lg lg:w-80"
                    alt="Mèmems d'une personne qui attend"
                />
            </template>
            <template v-if="form.processing">
                <div class="flex flex-col gap-4">
                    <div class="skeleton h-32 w-full"></div>
                    <div class="skeleton h-4 w-28"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="skeleton h-32 w-full"></div>
                    <div class="skeleton h-4 w-28"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                </div>
            </template>
            <template
                v-if="
                    result &&
                    result.data &&
                    result.data.length === 0 &&
                    !form.processing
                "
            >
                <div class="alert alert-info">
                    {{
                        $t(
                            'Aucun résultat à afficher. Essayer avec un autre terme.'
                        )
                    }}
                </div>
            </template>
        </Stack>
    </PageLayout>
</template>

<style></style>
