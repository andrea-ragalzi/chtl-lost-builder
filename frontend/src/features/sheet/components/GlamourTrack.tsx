import { Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { DotRating } from './DotRating';
import { spendGlamour, regainGlamour } from '../../../shared/stores/glamourSlice';

export const GlamourTrack = () => {
    const dispatch = useAppDispatch();
    const glamour = useAppSelector((state) => state.character.glamour.current);
    const maxGlamour = useAppSelector((state) => state.character.glamour.max);

    const handleGlamourChange = (newValue: number) => {
        if (newValue > glamour) {
            dispatch(regainGlamour(newValue - glamour));
        } else if (newValue < glamour) {
            dispatch(spendGlamour(glamour - newValue));
        }
    };

    return (
        <>
            <Text>Glamour:</Text>
            <DotRating rating={glamour} max={maxGlamour} onChange={handleGlamourChange} />
        </>
    );
};