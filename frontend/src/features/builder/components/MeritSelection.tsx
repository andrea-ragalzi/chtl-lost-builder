import { Box, Title, Text, Stack, Group, Paper, ThemeIcon, Switch, Spoiler, Badge } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setMeritRating } from '../../../shared/stores/meritSlice';
import { meritData } from '../../../shared/data/meritData';
import type { Merit } from '../../../shared/types/meritType';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';
import { useMemo } from 'react';

const MAX_MERIT_POINTS = 7;

// Helper component for a single Merit row
const MeritRow = ({ merit, currentRating, onRatingChange, canAfford }: { merit: Merit, currentRating: number, onRatingChange: (newRating: number) => void, canAfford: (cost: number) => boolean }) => {
    const isMultiLevel = merit.cost.length > 1;

    const handleDotClick = (dotIndex: number) => {
        const newRating = dotIndex + 1;
        onRatingChange(newRating === currentRating ? 0 : newRating);
    };

    const handleSwitchChange = (checked: boolean) => {
        onRatingChange(checked ? 1 : 0);
    };

    return (
        <Paper withBorder p="md" radius="sm">
            <Group justify="space-between" align="flex-start">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Group align="center" gap="sm">
                        <Text fw={700} size="lg">{merit.name}</Text>
                        <Badge variant="light">{merit.category}</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        Cost: {isMultiLevel ? merit.cost.join(' / ') : merit.cost[0]} points
                    </Text>

                    {merit.prerequisites && (
                        <Text size="sm" c="dimmed">
                            prerequisites: {merit.prerequisites}
                        </Text>
                    )}

                    <Spoiler maxHeight={50} showLabel="Show more" hideLabel="Hide">
                        <Text size="sm">{merit.effect}</Text>
                    </Spoiler>
                </Stack>

                {isMultiLevel ? (
                    // Dot system for multi-level merits
                    <Group gap="xs">
                        {merit.cost.map((cost, i) => {
                            const rating = i + 1;
                            const isFilled = rating <= currentRating;
                            const canClick = isFilled || canAfford(cost);
                            return (
                                <ThemeIcon
                                    key={i}
                                    variant="subtle"
                                    color={isFilled ? 'blue' : 'gray'}
                                    onClick={() => canClick && handleDotClick(i)}
                                    style={{ cursor: canClick ? 'pointer' : 'not-allowed', opacity: canClick ? 1 : 0.5 }}
                                >
                                    {isFilled ? <IconCircleFilled size={20} /> : <IconCircle size={20} />}
                                </ThemeIcon>
                            );
                        })}
                    </Group>
                ) : (
                    // Switch for single-cost merits
                    <Switch
                        checked={currentRating > 0}
                        onChange={(event) => handleSwitchChange(event.currentTarget.checked)}
                        disabled={currentRating === 0 && !canAfford(merit.cost[0])}
                    />
                )}
            </Group>
        </Paper>
    );
};

export const MeritSelection = () => {
    const dispatch = useAppDispatch();
    const selectedMerits = useAppSelector((state) => state.character.merits.selected);

    const totalPointsSpent = useMemo(() => {
        return Object.entries(selectedMerits).reduce((sum, [name, rating]) => {
            const merit = meritData.find(m => m.name === name);
            if (!merit || rating === 0) return sum;
            // Correctly calculate cost for multi-level merits
            let cost = 0;
            for (let i = 0; i < rating; i++) {
                cost += merit.cost[i] || 0;
            }
            return sum + cost;
        }, 0);
    }, [selectedMerits]);


    const pointsRemaining = MAX_MERIT_POINTS - totalPointsSpent;

    const canAfford = (meritName: string, newRating: number) => {
        const merit = meritData.find(m => m.name === meritName);
        if (!merit) return false;

        const currentRating = selectedMerits[meritName] || 0;

        // Calculate cost of current selection
        let currentCost = 0;
        for (let i = 0; i < currentRating; i++) {
            currentCost += merit.cost[i] || 0;
        }

        // Calculate cost of new selection
        let newCost = 0;
        for (let i = 0; i < newRating; i++) {
            newCost += merit.cost[i] || 0;
        }

        const costDifference = newCost - currentCost;
        return pointsRemaining >= costDifference;
    };

    const handleRatingChange = (name: string, rating: number) => {
        if (canAfford(name, rating)) {
            dispatch(setMeritRating({ name, rating }));
        }
    };

    // This function is passed to the MeritRow to check if a single dot can be afforded
    const canAffordSingleCost = (costChange: number) => {
        return pointsRemaining >= costChange;
    }

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>6. Add Your Merits</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Merits are special advantages your character has developed. You have 7 Merit points to spend.
                </Text>
            </Stack>

            <Paper withBorder p="md" mb="xl">
                <Group justify="center">
                    <Text fw={700}>Points Remaining:</Text>
                    <Text size="xl" fw={700} c={pointsRemaining < 0 ? 'red' : 'blue'}>
                        {pointsRemaining}
                    </Text>
                </Group>
            </Paper>

            <Stack>
                {meritData.map(merit => (
                    <MeritRow
                        key={merit.name}
                        merit={merit}
                        currentRating={selectedMerits[merit.name] || 0}
                        onRatingChange={(newRating) => handleRatingChange(merit.name, newRating)}
                        canAfford={canAffordSingleCost}
                    />
                ))}
            </Stack>
        </Box>
    );
};