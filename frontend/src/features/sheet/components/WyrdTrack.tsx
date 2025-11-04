import { Box, Group, Paper, Text } from '@mantine/core';
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
        <Paper mb="md" p="xs" withBorder style={{ overflow: 'hidden' }}>
            <Text fw={500} mb="xs" size="sm">Wyrd</Text>
            <Box style={{ maxWidth: '100%' }}>
                <Group align="start">
                    <DotRating
                        rating={wyrd}
                        max={maxWyrd}
                        onChange={handleWyrdChange}
                    />
                </Group>
            </Box>
        </Paper>
    );
};