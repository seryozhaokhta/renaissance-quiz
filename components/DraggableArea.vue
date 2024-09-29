<!-- components/DraggableArea.vue -->

<template>
    <div class="draggable-area" @drop="onDrop" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave">
        <div v-for="(artwork, index) in visibleArtworks" :key="artwork.id" class="draggable-area__artwork"
            :style="getCardStyle(index)" :class="{
                'draggable-area__artwork--top': index === 0,
                'draggable-area__artwork--dragging':
                    isDragging && currentDraggingArtwork?.id === artwork.id,
            }" draggable="true" @dragstart="onDragStart(artwork, $event)" @dragend="onDragEnd">
            <img class="draggable-area__image" :src="artwork.imageUrl" :alt="artwork.title" loading="lazy" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { gsap } from 'gsap';
import type { Artwork } from '~/types/quiz';

const props = defineProps<{
    artworks: Artwork[];
}>();

const emit = defineEmits<{
    (e: 'dragStart', artwork: Artwork): void;
    (e: 'dragEnd'): void;
    (e: 'returnArtwork', artworkId: string): void;
}>();

const isDragging = ref(false);
const currentDraggingArtwork = ref<Artwork | null>(null);

const isHovering = ref(false);
const dragCounter = ref(0);

const maxVisibleCards = 3; // Количество видимых карточек в колоде

// Отображаемые произведения
const visibleArtworks = computed(() => {
    return props.artworks.slice(0, maxVisibleCards);
});

const onDragStart = async (artwork: Artwork, event: DragEvent) => {
    isDragging.value = true;
    currentDraggingArtwork.value = artwork;

    await nextTick();
    const element = event.target as HTMLElement;
    gsap.to(element, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power1.out',
    });

    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', artwork.id);
        event.dataTransfer.setData('source', 'draggable');
        event.dataTransfer.effectAllowed = 'move';
    }

    emit('dragStart', artwork);
};

const onDragEnd = (event: DragEvent) => {
    isDragging.value = false;
    currentDraggingArtwork.value = null;

    const element = event.target as HTMLElement;
    gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'power1.in',
    });

    emit('dragEnd');
};

const onDragEnter = () => {
    dragCounter.value += 1;
    if (dragCounter.value === 1) {
        isHovering.value = true;
    }
};

const onDragLeave = () => {
    dragCounter.value -= 1;
    if (dragCounter.value === 0) {
        isHovering.value = false;
    }
};

const onDrop = (event: DragEvent) => {
    const artworkId = event.dataTransfer?.getData('text/plain');
    const source = event.dataTransfer?.getData('source');
    if (artworkId && source === 'dropzone') {
        emit('returnArtwork', artworkId);
    }
    isHovering.value = false;
    dragCounter.value = 0;
};

const getCardStyle = (index: number) => {
    const offsetX = index * 20; // Горизонтальное смещение
    const offsetY = index * 10; // Вертикальное смещение
    const scale = 1 - index * 0.05;
    return {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        zIndex: maxVisibleCards - index,
    };
};
</script>

<style scoped>
.draggable-area {
    position: relative;
    width: 250px;
    height: 350px;
    margin: 0 auto;
    border: 2px dashed transparent;
    transition: border-color 0.3s;
}

.draggable-area.drag-over {
    border-color: hsla(200, 100%, 50%, 1);
}

.draggable-area__artwork {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid hsla(220, 10%, 25%, 1);
    border-radius: 8px;
    background-color: hsla(220, 15%, 15%, 1);
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.draggable-area__artwork--dragging {
    opacity: 0.6;
    border-color: hsla(200, 100%, 50%, 1);
}

.draggable-area__image {
    max-width: 90%;
    max-height: 90%;
    border-radius: 4px;
}

@media (max-width: 600px) {
    .draggable-area {
        width: 200px;
        height: 280px;
    }

    .draggable-area__artwork {
        border-width: 1px;
    }

    .draggable-area__image {
        max-width: 80%;
        max-height: 80%;
    }
}
</style>
