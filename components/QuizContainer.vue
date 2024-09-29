<!-- components/QuizContainer.vue -->

<template>
    <div class="quiz-container">
        <EraSelector :eras="eras" @selectEra="selectEra" />
        <div v-if="selectedEra">
            <div class="quiz-container__content">
                <!-- Колода карточек сверху -->
                <DraggableArea :artworks="remainingArtworks" @dragStart="onDragStart" @dragEnd="onDragEnd"
                    @returnArtwork="handleReturnArtwork" />
                <!-- Зоны перетаскивания снизу -->
                <DropZoneList :periods="selectedEra.periods" :droppedArtworks="droppedArtworks" @drop="handleDrop"
                    @removeArtwork="handleRemoveArtwork" @dragStart="onDragStart" />
            </div>
            <button v-if="isQuizComplete" class="quiz-container__button" @click="showResults">
                Показать результаты
            </button>
        </div>
        <div v-if="showResultModal">
            <ResultModal :results="results" :eras="erasMap" @restart="restartQuiz" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EraSelector from './EraSelector.vue';
import DraggableArea from './DraggableArea.vue';
import DropZoneList from './DropZoneList.vue';
import ResultModal from './ResultModal.vue';
import { eras } from '~/data/eras';
import type { Era, Artwork, Result } from '~/types/quiz';

const selectedEra = ref<Era | null>(null);
const results = ref<Result[]>([]);
const showResultModal = ref(false);

const erasMap = computed(() => {
    const map: Record<string, Era> = {};
    eras.forEach((era) => {
        map[era.id] = era;
    });
    return map;
});

const selectEra = (eraId: string) => {
    selectedEra.value = eras.find((era) => era.id === eraId) || null;
    if (selectedEra.value) {
        results.value = selectedEra.value.artworks.map((art) => ({
            artwork: art,
            selectedPeriodId: null,
            isCorrect: false,
        }));
    }
};

const handleDrop = ({
    artworkId,
    periodId,
}: {
    artworkId: string;
    periodId: string;
}) => {
    const artwork = selectedEra.value?.artworks.find(
        (art) => art.id === artworkId
    );
    if (artwork) {
        const isCorrect = artwork.correctPeriodId === periodId;
        const existingResultIndex = results.value.findIndex(
            (res) => res.artwork.id === artworkId
        );

        if (existingResultIndex !== -1) {
            results.value[existingResultIndex].selectedPeriodId = periodId;
            results.value[existingResultIndex].isCorrect = isCorrect;
        } else {
            results.value.push({
                artwork,
                selectedPeriodId: periodId,
                isCorrect,
            });
        }
    }
};

const handleRemoveArtwork = (artworkId: string) => {
    const result = results.value.find((res) => res.artwork.id === artworkId);
    if (result) {
        result.selectedPeriodId = null;
        result.isCorrect = false;
    }
};

const handleReturnArtwork = (artworkId: string) => {
    handleRemoveArtwork(artworkId);
};

const onDragStart = () => {
    // Дополнительная логика при начале перетаскивания, если необходимо
};

const onDragEnd = () => {
    // Дополнительная логика при окончании перетаскивания, если необходимо
};

const restartQuiz = () => {
    showResultModal.value = false;
    if (selectedEra.value) {
        results.value = selectedEra.value.artworks.map((art) => ({
            artwork: art,
            selectedPeriodId: null,
            isCorrect: false,
        }));
    }
};

const droppedArtworks = computed(() => {
    const map: Record<string, Artwork[]> = {};
    results.value.forEach((res) => {
        if (res.selectedPeriodId) {
            if (!map[res.selectedPeriodId]) {
                map[res.selectedPeriodId] = [];
            }
            map[res.selectedPeriodId].push(res.artwork);
        }
    });
    return map;
});

const remainingArtworks = computed(() => {
    if (!selectedEra.value) return [];
    return selectedEra.value.artworks.filter(
        (art) =>
            !results.value.some(
                (res) => res.artwork.id === art.id && res.selectedPeriodId
            )
    );
});

const isQuizComplete = computed(() => {
    return remainingArtworks.value.length === 0;
});

const showResults = () => {
    showResultModal.value = true;
};
</script>

<style scoped>
.quiz-container {
    padding: 20px;
}

.quiz-container__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.quiz-container__button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: hsla(200, 100%, 50%, 1);
    color: hsla(0, 0%, 100%, 1);
    border: none;
    border-radius: 4px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.quiz-container__button:hover {
    background-color: hsla(200, 100%, 60%, 1);
}
</style>
