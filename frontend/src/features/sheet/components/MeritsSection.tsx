import { Paper, Title, Stack, Text } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';

export const MeritsSection = () => {
    const merits = useAppSelector((state) => state.character.merits.selected);

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" tt="uppercase">Merits</Title>
            <Stack mt="sm">
                {Object.entries(merits).map(([name, level]) => (
                    <Text key={name}>
                        {name} (Level: {level})
                    </Text>
                ))}
            </Stack>
        </Paper>
    );
};