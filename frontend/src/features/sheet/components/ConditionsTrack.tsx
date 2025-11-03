import { Stack } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { ListSection } from './ListSection';

export const ConditionsTrack = () => {
    const conditions = useAppSelector((state) => state.character.conditions.list);

    return (
        <Stack gap="md" mb="md">

            <ListSection
                title="Conditions"
                listKey="conditions"
                items={conditions}
                withCheckbox={true}
            />
        </Stack>
    );
};