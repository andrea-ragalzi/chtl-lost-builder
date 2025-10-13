// WillpowerTrack.tsx (Definitivo)

import { Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
// Aggiorna l'import per usare l'azione corretta
import { updateCurrentWillpower } from '../../../shared/stores/willpowerSlice';
import { DotRating } from './DotRating';
import React from 'react';

export const WillpowerTrack: React.FC = () => {
    const dispatch = useAppDispatch();


    const { resolve, composure } = useAppSelector(state => state.character.attributes.individual);
    const maxWillpower = resolve + composure;

    const currentWillpower = useAppSelector((state) => state.character.willpower.current);

    const handleWillpowerChange = (newValue: number) => {
        if (newValue >= 0 && newValue <= maxWillpower) {
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