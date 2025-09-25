import { Paper, Title, Stack, Grid } from '@mantine/core';
import { DotRating } from './DotRating';

interface SkillsProps {
  skills: Record<string, number>;
  specialties: Record<string, string>;
  onChange: (path: string, value: number) => void;
}

const MENTAL_SKILLS = ['academics', 'computer', 'crafts', 'investigation', 'medicine', 'occult', 'politics', 'science'];
const PHYSICAL_SKILLS = ['athletics', 'brawl', 'drive', 'firearms', 'larceny', 'stealth', 'survival', 'weaponry'];
const SOCIAL_SKILLS = ['animal ken', 'empathy', 'expression', 'intimidation', 'persuasion', 'socialize', 'streetwise', 'subterfuge'];

export const SkillsSection = ({ skills, onChange }: SkillsProps) => (
  <Paper withBorder p="md" mt="md">
    <Title order={4} ta="center" tt="uppercase">Skills</Title>
    <Grid mt="sm">
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title order={6}>MENTAL</Title>
        <Stack gap="xs" mt="xs">
          {MENTAL_SKILLS.map(skill => <DotRating key={skill} label={skill} rating={skills[skill] || 0} onChange={(value) => onChange(`skills.points.${skill}`, value)} />)}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title order={6}>PHYSICAL</Title>
        <Stack gap="xs" mt="xs">
          {PHYSICAL_SKILLS.map(skill => <DotRating key={skill} label={skill} rating={skills[skill] || 0} onChange={(value) => onChange(`skills.points.${skill}`, value)} />)}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title order={6}>SOCIAL</Title>
        <Stack gap="xs" mt="xs">
          {SOCIAL_SKILLS.map(skill => <DotRating key={skill} label={skill} rating={skills[skill] || 0} onChange={(value) => onChange(`skills.points.${skill}`, value)} />)}
        </Stack>
      </Grid.Col>
    </Grid>
  </Paper>
);