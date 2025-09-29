import { Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { DotRating } from './DotRating';
import { setWyrd } from '../../../shared/stores/wyrdSlice';

export const WyrdTrack = () => {
    const dispatch = useAppDispatch();
    const wyrd = useAppSelector((state) => state.character.wyrd.current);
    const maxWyrd = useAppSelector((state) => state.character.wyrd.max);

    const handleWyrdChange = (newValue: number) => {
        dispatch(setWyrd(newValue));
    };

    return (
        <>
            <Text>Wyrd:</Text>
            <DotRating rating={wyrd} max={maxWyrd} onChange={handleWyrdChange} />
        </>
    );
};