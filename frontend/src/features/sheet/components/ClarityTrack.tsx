import { Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { DotRating } from './DotRating';
import { setClarity } from '../../../shared/stores/claritySlice';

export const ClarityTrack = () => {
    const dispatch = useAppDispatch();
    const clarity = useAppSelector((state) => state.character.clarity.current);
    const maxClarity = useAppSelector((state) => state.character.clarity.max);

    const handleClarityChange = (newValue: number) => {
        dispatch(setClarity(newValue));
    };

    return (
        <>
            <Text>Clarity:</Text>
            <DotRating rating={clarity} max={maxClarity} onChange={handleClarityChange} />
        </>
    );
};