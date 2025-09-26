import { Paper, Title, Stack, Text, Group } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';

export const MeritsSection = () => {
    const merits = useAppSelector((state) => state.character.merits.selected);

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" tt="uppercase">Merits</Title>
            <Stack mt="sm">
                {Object.entries(merits).map(([name, level]) => (
                    <Group key={name} align="center">
                        <Text>{name}</Text>
                        <Group ml="auto">
                            {Array.from({ length: 5 }).map((_, index) => (
                                index < level ? <IconCircleFilled key={index} size={16} /> : <IconCircle key={index} size={16} />
                            ))}
                        </Group>
                    </Group>
                ))}
            </Stack>
        </Paper>
    );
};