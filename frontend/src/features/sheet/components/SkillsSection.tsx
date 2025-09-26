import { Paper, Title, Grid } from '@mantine/core';
import { SkillsGroup } from './SkillsGroup.tsx';
import { useAppSelector } from '../../../shared/hooks/hooks.ts';

const SKILL_GROUPS = {
  mental: ['academics', 'computer', 'crafts', 'investigation', 'medicine', 'occult', 'politics', 'science'],
  physical: ['athletics', 'brawl', 'drive', 'firearms', 'larceny', 'stealth', 'survival', 'weaponry'],
  social: ['animal ken', 'empathy', 'expression', 'intimidation', 'persuasion', 'socialize', 'streetwise', 'subterfuge'],
};

export const SkillsSection = () => {
  const { points, priorities } = useAppSelector((state) => state.character.skills);


  return (
    <Paper withBorder p="md" mt="md">
      <Title order={4} ta="center" tt="uppercase">Skills</Title>
      <Grid mt="sm">
        {Object.entries(SKILL_GROUPS).map(([groupKey, skills]) => {
        const priorityValue = priorities[groupKey as keyof typeof priorities] || 0;
          return (
            <Grid.Col key={groupKey} span={{ base: 12, md: 4 }}>
              <SkillsGroup
                groupKey={groupKey}
                skills={skills}
                individual={points}
                priority={priorityValue}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Paper>
  );
};
