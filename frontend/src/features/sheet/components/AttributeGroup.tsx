import { Title, Stack, Group, Divider } from '@mantine/core';
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

export const AttributeGroup = ({ groupKey, attrs, individual }: AttributeGroupProps) => {
    const dispatch = useAppDispatch();

    const handleAttributeChange = (attribute: string, value: number) => {
        dispatch(updateAttribute({ attribute: attribute as IndividualAttribute, value }));
    };

    return (
        <>
            <Group justify="space-between" align="center">
                <Title order={4} tt="capitalize">{groupKey} Attributes</Title>
            </Group>
            <Divider size="md" mb="xs" />
            <Stack gap="xs">
                {attrs.map(attr => (
                    <>
                        <DotRating
                            key={attr}
                            label={attr}
                            rating={individual[attr]}
                            max={5}
                            onChange={(value: number) => handleAttributeChange(attr, value)}
                        />
                        {attrs.indexOf(attr) !== attrs.length - 1 && <Divider size="xs" />}
                    </>
                ))}
            </Stack>
        </>
    );
};