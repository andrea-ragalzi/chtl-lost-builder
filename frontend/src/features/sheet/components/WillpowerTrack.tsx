// WillpowerTrack.tsx (Definitivo)

import { Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { updateWillpower } from '../../../shared/stores/willpowerSlice';
import { DotRating } from './DotRating';

export const WillpowerTrack = () => {
    const dispatch = useAppDispatch();

    // 1. CALCOLO DINAMICO DEL MASSIMALE
    const { resolve, composure } = useAppSelector(state => state.character.attributes.individual);
    const maxWillpower = resolve + composure; // Si aggiorna ad ogni cambio di Resolve/Composure

    // 2. Lettura del Corrente
    const currentWillpower = useAppSelector((state) => state.character.willpower.current);

    const handleWillpowerChange = (newValue: number) => {
        // Applichiamo la validazione sul massimale DINAMICO
        if (newValue >= 0 && newValue <= maxWillpower) {
            dispatch(updateWillpower(newValue));
        }
    };

    return (
        <Group align="start">
            <DotRating
                label=""
                rating={currentWillpower}
                max={maxWillpower}
                onChange={handleWillpowerChange}
            />
        </Group>
    );
};