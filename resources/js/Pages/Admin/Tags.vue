<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import TextInput from "@/Components/Elements/Form/TextInput.vue";
import {ref} from "vue";
import Modal from "@/Components/Elements/Modal/Modal.vue";
import InputError from "@/Components/Elements/Form/InputError.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Misc/Card.vue";
import Toast from "@/Components/Misc/Toast.vue";
import Icon from "@/Components/Misc/Icon.vue";
import ActionButton from "@/Components/Elements/Button/ActionButton.vue";
import formService from "@/Services/form.service.js";
import ActionModal from "@/Components/Elements/Modal/ActionModal.vue";


defineProps({
    tags: {
        type: Array
    },
})
const form = useForm({
    name: null
})

const addTag = () => {
    form.post(route('admin.tag.create'), {
        preserveScroll: true,
        onSuccess: () => closeModal('create'),
        onFinish: () => form.reset(),
    });
};

const editTag = (item) => {
    form.post(route('admin.tag.update', item.id), {
        preserveScroll: true,
        onSuccess: () => closeModal('edit', item),
        onFinish: () => form.reset(),
    });
};

const deleteTag = (item) => {
    form.delete(route('admin.tag.destroy', item.id), {
        preserveScroll: true,
        onSuccess: () => closeModal('delete', item),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout title="Tags">
        <div class="flex justify-end mb-4">
            <button class="btn btn-primary" @click="formService.openModal('createTag')">Ajouter un tag</button>
        </div>

        <Card title="Nombres de tags" :is-link="false" has-background>
            {{ tags.length }}
        </Card>

        <Table
            :headers="['Nom']"
            :items="tags"
            :properties="['name']"
            has-action
            has-background
        >
            <template #name="{ name }">
                {{ name.en }}
            </template>
            <template #actions="item">
                <ActionButton
                    type="edit"
                    @click="formService.openModal('deleteTag', item)"
                />

                <!-- Edit tag modal -->
                <Modal :id="`editTagModal${item.id}`" :title="`Éditer le tag ${item.name.en}`">
                    <form @submit.prevent="editTag(item)">
                        <TextInput
                            v-model="form.name"
                        />

                        <InputError :message="form.errors.name" />

                        <div class="mt-4">
                            <button class="btn btn-primary" :disabled="form.processing">
                                Éditer le tag
                            </button>
                        </div>
                    </form>
                </Modal>

                <ActionButton
                    type="delete"
                    @click="formService.openModal('deleteTag', item)"
                />

                <ActionModal
                    name="deleteTag"
                    route="admin.tag"
                    :item="item"
                    :form="form"
                    @deleting="deleteTag(item)"
                    type="delete"
                >

                </ActionModal>

                <!--                &lt;!&ndash; Delete tag modal &ndash;&gt;
                                <Modal :id="`deleteTagModal${item.id}`" title="Supprimer le tag">
                                    <template #description>
                                        Êtes-vous sûr de supprimer le tag {{ item.name.en }} ?
                                    </template>
                                    <form @submit.prevent="deleteTag(item)">
                                        <button class="btn btn-error" :disabled="form.processing">
                                            Supprimer le tag
                                        </button>
                                    </form>
                                </Modal>-->
            </template>
        </Table>

        <!-- Create tag -->
        <ActionModal :form="form" route="admin.tag" name="createTag" type="create">
            <TextInput
                v-model="form.name"
            />

            <InputError :message="form.errors.name" />
        </ActionModal>

<!--        <Modal id="createTagModal" title="Ajouter un tag">

        </Modal>-->
    </AdminDashboardLayout>
</template>
