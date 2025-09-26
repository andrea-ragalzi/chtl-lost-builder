import { Paper, Title, Grid } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { AttributeGroup } from './AttributeGroup';

const ATTRIBUTE_GROUPS = {
    mental: ['intelligence', 'wits', 'resolve'],
    physical: ['strength', 'dexterity', 'stamina'],
    social: ['presence', 'manipulation', 'composure'],
};

export const AttributesSection = () => {
    const { individual, priorities } = useAppSelector((state) => state.character.attributes);

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" tt="uppercase">Attributes</Title>
            <Grid mt="sm">
                {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, attrs]) => {
                    const priorityValue = priorities[groupKey as keyof typeof priorities] || 0;
                    return (
                        <Grid.Col key={groupKey} span={{ base: 12, md: 4 }}>
                            <AttributeGroup
                                groupKey={groupKey}
                                attrs={attrs}
                                individual={individual}
                                priority={priorityValue}
                            />
                        </Grid.Col>
                    );
                })}
            </Grid>
        </Paper>
    );
};