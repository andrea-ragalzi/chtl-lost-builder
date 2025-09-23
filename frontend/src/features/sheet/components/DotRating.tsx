import { Group, Text } from '@mantine/core';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';

interface DotRatingProps {
  label: string;
  rating: number;
  max?: number;
}

export const DotRating = ({ label, rating, max = 5 }: DotRatingProps) => (
  <Group justify="space-between" wrap="nowrap">
    <Text size="sm" tt="capitalize" style={{ flexShrink: 0 }}>{label}</Text>
    <Group gap={4} wrap="nowrap">
      {Array.from({ length: max }).map((_, i) =>
        i < rating ? <IconCircleFilled key={i} size={14} /> : <IconCircle key={i} size={14} />
      )}
    </Group>
  </Group>
);