import { Stack } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { ListSection } from './ListSection';

export const TouchstoneSection = () => {
    const narrative = useAppSelector((state) => state.character.narrative);

    return (
        <Stack gap="md" mb="md">

            <ListSection
                title="Touchstones"
                listKey="touchstones"
                items={narrative.touchstones}
            />
        </Stack>
    );
};