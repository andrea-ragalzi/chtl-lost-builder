import { Group, Text, Box } from '@mantine/core';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';

interface DotRatingProps {
  label: string;
  rating: number;
  max?: number;
  onChange?: (newValue: number) => void;
}

export const DotRating = ({ label, rating, max = 5, onChange }: DotRatingProps) => {
  const handleClick = (index: number) => {
    onChange?.(index + 1);
  };

  return (
    <Group justify="space-between" wrap="nowrap">
      <Text size="sm" tt="capitalize" style={{ flexShrink: 0 }}>{label}</Text>
      <Group gap={4} wrap="nowrap">
        {Array.from({ length: max }).map((_, i) => (
          <Box
            key={i}
            onClick={() => handleClick(i)}
            style={{ cursor: 'pointer' }}
          >
            {i < rating ? <IconCircleFilled size={14} /> : <IconCircle size={14} />}
          </Box>
        ))}
      </Group>
    </Group>
  );
};