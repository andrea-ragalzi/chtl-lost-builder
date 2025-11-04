import { Grid } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { AttributeGroup } from './AttributeGroup';

const ATTRIBUTE_GROUPS = {
    physical: ['strength', 'dexterity', 'stamina'],
    social: ['presence', 'manipulation', 'composure'],
    mental: ['intelligence', 'wits', 'resolve']
};

export const AttributesSection = () => {
    const { individual, priorities } = useAppSelector((state) => state.character.attributes);

    return (
        <Grid mb="md">
            {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, attrs]) => {
                const priorityValue = priorities[groupKey as keyof typeof priorities] || 0;
                return (
                    <Grid.Col key={groupKey} span={{ base: 12, md: 4 }} pb={0}>
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
    );
};