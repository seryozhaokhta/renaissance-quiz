// types/quiz.ts

export interface Period {
    id: string;
    name: string;
}

export interface Artwork {
    id: string;
    imageUrl: string;
    correctPeriodId: string;
    title: string;
    artist: string;
}

export interface Era {
    id: string;
    name: string;
    periods: Period[];
    artworks: Artwork[];
}

export interface Result {
    artwork: Artwork;
    selectedPeriodId: string | null;
    isCorrect: boolean;
}
