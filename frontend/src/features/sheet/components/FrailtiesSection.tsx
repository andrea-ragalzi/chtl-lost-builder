import { Box } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { SimpleList } from './SimpleList';


export const FrailtiesSection = () => {
    const items = useAppSelector((state) => state.character.frailties.list);

    return (
        <Box mb="md">
            <SimpleList
                title="Frailties"
                items={items}
            />
        </Box>
    );
};