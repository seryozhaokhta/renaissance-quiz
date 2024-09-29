<!-- components/DropZoneItem.vue -->

<template>
    <div class="drop-zone-item" ref="dropZoneRef" @drop="onDrop" @dragover.prevent @dragenter="onDragEnter"
        @dragleave="onDragLeave">
        <h4 class="drop-zone-item__title">{{ period.name }}</h4>
        <div class="drop-zone-item__artworks">
            <div class="drop-zone-item__artwork" v-for="artwork in droppedArtworks" :key="artwork.id" draggable="true"
                @dragstart="onArtworkDragStart(artwork, $event)">
                <img class="drop-zone-item__image" :src="artwork.imageUrl" :alt="artwork.title" loading="lazy" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';
import type { Period, Artwork } from '~/types/quiz';

const props = defineProps<{
    period: Period;
    droppedArtworks: Artwork[];
}>();

const emit = defineEmits<{
    (e: 'dropPeriod', payload: { artworkId: string; periodId: string }): void;
    (e: 'removeArtwork', artworkId: string): void;
    (e: 'dragStart', artwork: Artwork): void;
}>();

const isHovering = ref(false);
const dragCounter = ref(0);
const dropZoneRef = ref<HTMLElement | null>(null);

const onDragEnter = () => {
    dragCounter.value += 1;
    if (dragCounter.value === 1) {
        isHovering.value = true;
        if (dropZoneRef.value) {
            gsap.to(dropZoneRef.value, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power1.out',
            });
        }
    }
};

const onDragLeave = () => {
    dragCounter.value -= 1;
    if (dragCounter.value === 0) {
        isHovering.value = false;
        if (dropZoneRef.value) {
            gsap.to(dropZoneRef.value, {
                scale: 1,
                duration: 0.2,
                ease: 'power1.in',
            });
        }
    }
};

const onDrop = (event: DragEvent) => {
    const artworkId = event.dataTransfer?.getData('text/plain');
    if (artworkId) {
        emit('dropPeriod', { artworkId, periodId: props.period.id });

        if (dropZoneRef.value) {
            gsap.to(dropZoneRef.value, {
                scale: 1,
                backgroundColor: 'hsla(220, 15%, 20%, 1)',
                duration: 0.3,
                ease: 'power1.out',
                onComplete: () => {
                    gsap.to(dropZoneRef.value!, {
                        backgroundColor: 'hsla(220, 15%, 15%, 1)',
                        duration: 0.3,
                        delay: 0.5,
                    });
                },
            });
        }
    }
    dragCounter.value = 0;
    isHovering.value = false;
};

const onArtworkDragStart = (artwork: Artwork, event: DragEvent) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', artwork.id);
        event.dataTransfer.setData('source', 'dropzone');
        event.dataTransfer.effectAllowed = 'move';
    }
    emit('dragStart', artwork);
};
</script>

<style scoped>
.drop-zone-item {
    border: 1px dashed rgba(255, 255, 255, 0.5);
    padding: 15px;
    margin: 10px;
    min-width: 200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-color: hsla(220, 15%, 15%, 1);
    transition: background-color 0.3s;
}

.drop-zone-item__title {
    margin-bottom: 10px;
    font-size: 1.2em;
    text-align: center;
    color: hsla(0, 0%, 90%, 1);
}

.drop-zone-item__artworks {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.drop-zone-item__artwork {
    margin-bottom: 10px;
    cursor: grab;
}

.drop-zone-item__image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

@media (max-width: 600px) {
    .drop-zone-item {
        min-width: 150px;
        min-height: 200px;
        padding: 10px;
        margin: 5px;
    }

    .drop-zone-item__title {
        font-size: 1em;
    }

    .drop-zone-item__artwork {
        margin-bottom: 5px;
    }

    .drop-zone-item__image {
        max-width: 80%;
    }
}
</style>
