import { Group, Box } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { updateDamageBox, setInitialDamage } from '../../../shared/stores/healthTrackSlice'; // Importa da healthTrackSlice
import { useEffect } from 'react';

interface HealthTrackProps {
    health: number;
}

const HealthTrackBox = ({ damageType, index }: { damageType: 'none' | 'bashing' | 'lethal' | 'aggravated', index: number }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(updateDamageBox(index));
    };

    let content = '';
    if (damageType === 'bashing') content = '/';
    if (damageType === 'lethal') content = 'X';
    if (damageType === 'aggravated') content = '#';

    return (
        <Box
            style={{
                width: '20px',
                height: '20px',
                border: '1px solid black',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            onClick={handleClick}
        >
            {content}
        </Box>
    );
};

export const HealthTrack = ({ health }: HealthTrackProps) => {
    const healthTrackState = useAppSelector((state) => state.character.healthTrack);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Inizializza lo stato della traccia di salute con il numero corretto di caselle
        const initialDamage = Array(health).fill('none');
        dispatch(setInitialDamage(initialDamage)); // Dispatcha un'azione per impostare lo stato iniziale
    }, [health, dispatch]);

    return (
        <Group gap={2} wrap="nowrap">
            {healthTrackState.damage.map((damageType, index) => (
                <HealthTrackBox key={index} damageType={damageType} index={index} />
            ))}
        </Group>
    );
};