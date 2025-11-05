import { Box, Fieldset, Group } from '@mantine/core';
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
        <Fieldset legend="Wyrd" style={{ overflow: 'hidden' }} mb="md">
            <Box style={{ maxWidth: '100%' }}>
                <Group align="start">
                    <DotRating
                        rating={wyrd}
                        max={maxWyrd}
                        onChange={handleWyrdChange}
                    />
                </Group>
            </Box>
        </Fieldset>
    );
};