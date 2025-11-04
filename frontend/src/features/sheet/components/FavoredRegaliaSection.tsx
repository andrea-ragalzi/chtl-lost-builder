import { Box } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { SimpleList } from './SimpleList';

export const FavoredRegaliaSection = () => {
    const items = useAppSelector((state) => state.character.favoredRegalia.list);

    return (
        <Box mb="md">
            <SimpleList
                title="Favored Regalia"
                items={items}
            />
        </Box>
    );
};