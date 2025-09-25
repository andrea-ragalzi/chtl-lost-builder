import { Title, Stack, Group, Text } from '@mantine/core';
import { DotRating } from './DotRating';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { updateAttribute } from '../../../shared/stores/attributeSlice';

type IndividualAttribute = "intelligence" | "wits" | "resolve" | "strength" | "dexterity" | "stamina" | "presence" | "manipulation" | "composure";

interface AttributeGroupProps {
    groupKey: string;
    attrs: string[];
    individual: Record<string, number>;
    priority: number;
}

export const AttributeGroup = ({ groupKey, attrs, individual, priority }: AttributeGroupProps) => {
    const dispatch = useAppDispatch();

    const handleAttributeChange = (attribute: string, value: number) => {
        dispatch(updateAttribute({ attribute: attribute as IndividualAttribute, value }));
    };

    return (
        <>
            <Group justify="space-between" align="center">
                <Title order={6} tt="capitalize">{groupKey}</Title>
                <Text size="sm" c="dimmed">({priority})</Text>
            </Group>
            <Stack gap="xs" mt="xs">
                {attrs.map(attr => (
                    <DotRating
                        key={attr}
                        label={attr}
                        rating={individual[attr]}
                        max={5}
                        onChange={(value: number) => handleAttributeChange(attr, value)}
                    />
                ))}
            </Stack>
        </>
    );
};