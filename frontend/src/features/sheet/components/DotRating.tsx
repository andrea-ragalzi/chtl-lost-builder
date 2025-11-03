import { Group, Text, Box, Stack } from '@mantine/core';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';

interface DotRatingProps {
  label?: string;
  rating: number;
  max?: number;
  wrap?: boolean;
  onChange?: (newValue: number) => void;
}

export const DotRating = ({ label, rating, max = 5, wrap = false, onChange }: DotRatingProps) => {
  const handleClick = (index: number) => {
    onChange?.(index + 1);
  };

  const dots = (
    <Group gap={4} wrap={wrap ? "wrap" : "nowrap"} style={{ maxWidth: '100%' }}>
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
  );

  if (!label) {
    return dots;
  }

  if (wrap) {
    return (
      <Stack gap="xs">
        <Text size="sm" tt="capitalize">{label}</Text>
        {dots}
      </Stack>
    );
  }

  return (
    <Group justify="space-between" wrap="nowrap" gap="xs" align="flex-start">
      <Box
        style={{
          flexShrink: 1,
          minWidth: 0,
          overflow: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'thin',
        }}
      >
        <Text size="sm" tt="capitalize">{label}</Text>
      </Box>
      {dots}
    </Group>
  );
};