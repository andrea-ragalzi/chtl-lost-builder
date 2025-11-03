import { Grid } from '@mantine/core';
import { SkillsGroup } from './SkillsGroup.tsx';
import { useAppSelector } from '../../../shared/hooks/hooks.ts';

const SKILL_GROUPS = {
  physical: ['athletics', 'brawl', 'drive', 'firearms', 'larceny', 'stealth', 'survival', 'weaponry'],
  social: ['animal ken', 'empathy', 'expression', 'intimidation', 'persuasion', 'socialize', 'streetwise', 'subterfuge'],
  mental: ['academics', 'computer', 'crafts', 'investigation', 'medicine', 'occult', 'politics', 'science']
};

export const SkillsSection = () => {
  const { points } = useAppSelector((state) => state.character.skills);
  const specialties = useAppSelector((state) => state.character.specialties.specialties);


  return (
      <Grid>
        {Object.entries(SKILL_GROUPS).map(([groupKey, skills]) => {
          return (
            <Grid.Col key={groupKey} span={{ base: 12, md: 4 }}>
              <SkillsGroup
                groupKey={groupKey}
                skills={skills}
                individual={points}
                specialties={specialties}
              />
            </Grid.Col>
          );
        })}
      </Grid>
  );
};
