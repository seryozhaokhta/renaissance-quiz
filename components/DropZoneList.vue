<!-- components/DropZoneList.vue -->

<template>
    <div class="drop-zone-list">
        <div class="drop-zone-list__wrapper" v-for="period in periods" :key="period.id">
            <DropZoneItem :period="period" :droppedArtworks="getDroppedArtworks(period.id)" @dropPeriod="handleDrop"
                @removeArtwork="removeArtwork" @dragStart="onDragStart" />
        </div>
    </div>
</template>

<script setup lang="ts">
import DropZoneItem from './DropZoneItem.vue';
import type { Period, Artwork } from '~/types/quiz';

const props = defineProps<{
    periods: Period[];
    droppedArtworks: Record<string, Artwork[]>;
}>();

const emit = defineEmits<{
    (e: 'drop', payload: { artworkId: string; periodId: string }): void;
    (e: 'removeArtwork', artworkId: string): void;
    (e: 'dragStart'): void;
}>();

const handleDrop = (payload: { artworkId: string; periodId: string }) => {
    emit('drop', payload);
};

const removeArtwork = (artworkId: string) => {
    emit('removeArtwork', artworkId);
};

const onDragStart = () => {
    emit('dragStart');
};

const getDroppedArtworks = (periodId: string): Artwork[] => {
    return props.droppedArtworks[periodId] || [];
};
</script>

<style scoped>
.drop-zone-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 800px;
}

.drop-zone-list__wrapper {
    min-width: 200px;
}

@media (max-width: 600px) {
    .drop-zone-list {
        gap: 10px;
    }

    .drop-zone-list__wrapper {
        min-width: 150px;
    }
}
</style>
