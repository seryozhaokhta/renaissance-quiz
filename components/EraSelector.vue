<!-- components/EraSelector.vue -->

<template>
    <div class="era-selector">
        <label class="era-selector__label" for="era-select">Выберите эпоху:</label>
        <select id="era-select" class="era-selector__select" v-model="selectedEraId" @change="emitEra">
            <option disabled value="">-- Выберите эпоху --</option>
            <option v-for="era in eras" :key="era.id" :value="era.id">
                {{ era.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { Era } from '~/types/quiz';

const props = defineProps<{
    eras: Era[];
}>();

const emit = defineEmits<{
    (e: 'selectEra', eraId: string): void;
}>();

const selectedEraId = ref('');

const emitEra = () => {
    if (selectedEraId.value) {
        emit('selectEra', selectedEraId.value);
    }
};
</script>

<style scoped>
.era-selector {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.era-selector__label {
    margin-right: 10px;
    font-weight: bold;
}

.era-selector__select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
}

.era-selector__select:focus {
    border-color: #007BFF;
    outline: none;
}
</style>
