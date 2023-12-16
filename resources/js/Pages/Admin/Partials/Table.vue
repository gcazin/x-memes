<script setup>
defineProps({
    headers: {
        type: Array,
        required: true,
    },
    items: {
        type: [Object, Array],
        required: true
    },
    properties: {
        type: Array,
        required: true,
    },
    hasAction: {
        type: Boolean,
        required: false,
        default: false
    },
    hasBackground: {
        type: Boolean,
        required: false,
    }
})
</script>
<template>
    <div class="overflow-x">
        <table class="table table-xs lg:table-lg" :class="{'bg-base-300': hasBackground}">
            <thead>
            <tr>
                <th
                    v-for="(header, index) in headers"
                    :key="index"
                >
                    {{ header }}
                </th>
                <th v-if="hasAction" class="text-right">
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-if="items.length"
                v-for="(item, index) in items"
            >
                <td v-if="properties" v-for="(property) in properties">
                    <slot v-if="property === 'increment'" :name="property" v-bind="item">
                        {{ index + 1 }}
                    </slot>
                    <slot v-else :name="property" v-bind="item">
                        {{ property in item ? item[property] : item }}
                    </slot>
                </td>
                <td v-else>
                    {{ item }}
                </td>
                <td v-if="hasAction" class="text-right">
                    <template v-if="properties">
                        <slot name="actions" v-bind="item" />
                    </template>
                    <template v-else>
                        <slot name="actions" v-bind="item" />
                    </template>
                </td>
            </tr>
            <tr v-else class="px-6 py-4">
                <td class="">
                    Aucune donnée à afficher.
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
