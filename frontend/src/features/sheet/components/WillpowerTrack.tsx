// WillpowerTrack.tsx (Definitivo)

import { Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
// Aggiorna l'import per usare l'azione corretta
import { updateCurrentWillpower } from '../../../shared/stores/willpowerSlice';
import { DotRating } from './DotRating';
import React from 'react';

export const WillpowerTrack: React.FC = () => {
    const dispatch = useAppDispatch();

    // 1. CALCOLO DINAMICO DEL MASSIMALE
    // Assumiamo che il path sia: state.character.attributes.individual
    const { resolve, composure } = useAppSelector(state => state.character.attributes.individual);
    const maxWillpower = resolve + composure; // Max si aggiorna ad ogni cambio di Resolve/Composure

    // 2. Lettura del Corrente
    const currentWillpower = useAppSelector((state) => state.character.willpower.current);

    // Gestore per l'aggiornamento manuale tramite DotRating
    const handleWillpowerChange = (newValue: number) => {
        // Applichiamo la validazione sul massimale DINAMICO
        if (newValue >= 0 && newValue <= maxWillpower) {
            // Dispatchiamo l'azione corretta per l'aggiornamento manuale
            dispatch(updateCurrentWillpower(newValue));
        }
    };

    return (
        <Group align="start">
            <DotRating
                label="Willpower"
                rating={currentWillpower}
                max={maxWillpower}
                onChange={handleWillpowerChange}
            />
        </Group>
    );
};