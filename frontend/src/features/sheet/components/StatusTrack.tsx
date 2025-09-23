import { Group, Text, Box } from '@mantine/core';

interface StatusTrackProps {
  label: string;
  count: number;
}

export const StatusTrack = ({ label, count }: StatusTrackProps) => (
  <div>
    <Text size="sm" fw={700} mb={4}>{label}</Text>
    <Group gap={2} wrap="nowrap">
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} w={12} h={12} style={{ border: '1px solid black' }} />
      ))}
    </Group>
  </div>
);