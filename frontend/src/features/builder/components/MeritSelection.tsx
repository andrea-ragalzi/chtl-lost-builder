import { Box, Title, Text, Stack, Group, Paper, ThemeIcon, Switch, Spoiler, Badge } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setMeritRating } from '../../../shared/stores/meritSlice';
import { meritData } from '../../../shared/data/meritData'; // Assuming the original import is correct
import type { Merit } from '../../../shared/types/meritType';
import { IconCircle, IconCircleFilled } from '@tabler/icons-react';
import { useMemo, useCallback } from 'react';

const MAX_MERIT_POINTS = 10;

// Helper function to calculate the total cost for a specific rating of a merit
const calculateTotalCost = (merit: Merit, rating: number): number => {
    if (rating === 0) return 0;

    // Check if the merit has variable costs (e.g., [1, 2, 3] or [1, 2, 3, 4, 5])
    // If it is a multi-dot merit, the user wants the cost to be 1 point per dot (Total cost = rating)
    if (merit.cost.length > 1) {
        return rating; // 1 dot = 1 point, 3 dots = 3 points
    }

    // For single-cost merits (e.g., [2] or [3]), the cost is the fixed value
    // and only applies when rating is 1.
    if (merit.cost.length === 1 && rating > 0) {
        return merit.cost[0];
    }

    // Fallback/safety: should not be reached for properly defined merits
    return 0;
};

// Helper component for a single Merit row
const MeritRow = ({ merit, currentRating, onRatingChange, checkAffordabilityForTarget }: { merit: Merit, currentRating: number, onRatingChange: (newRating: number) => void, checkAffordabilityForTarget: (targetRating: number) => boolean }) => {
    const isMultiLevel = merit.cost.length > 1;

    // Logic for clicking a dot: sets the rating to that dot level (1, 2, 3...)
    const handleDotClick = (dotIndex: number) => {
        const targetRating = dotIndex + 1;
        let newRating = targetRating;

        // If clicking on the currently selected highest dot, set rating to 0 (unselect all)
        if (targetRating === currentRating) {
            newRating = 0;
        } else if (targetRating < currentRating) {
            // If clicking on a dot lower than the current rating, set the new rating to that lower dot.
            // e.g., current is 5, click 3rd dot, new rating is 3.
            newRating = targetRating;
        }

        onRatingChange(newRating);
    };

    // Logic for the switch: sets rating to 1 (on) or 0 (off)
    const handleSwitchChange = (checked: boolean) => {
        onRatingChange(checked ? 1 : 0);
    };

    const isAffordableToIncrease = (targetRating: number): boolean => {
        // If the target rating is 0 (turning off) or less than current (reducing rating), it's always affordable.
        if (targetRating <= currentRating) return true;

        // Check if we can afford the full cost of the target rating compared to the current rating
        return checkAffordabilityForTarget(targetRating);
    };

    // Determine the max number of dots to display (based on cost array length)
    const maxDots = isMultiLevel ? merit.cost.length : 1;

    return (
        <Paper withBorder p="md" radius="sm">
            <Group justify="space-between" align="flex-start">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Group align="center" gap="sm">
                        <Text fw={700} size="lg">{merit.name}</Text>
                        {merit.category && <Badge variant="light">{merit.category}</Badge>}
                    </Group>

                    <Text size="sm" c="dimmed">
                        Costo: {isMultiLevel ? '1 punto per dot' : `${merit.cost[0]} punti (costo fisso)`}
                    </Text>

                    {merit.prerequisites && (
                        <Text size="sm" c="dimmed">
                            Prerequisiti: {merit.prerequisites}
                        </Text>
                    )}

                    <Spoiler maxHeight={50} showLabel="Mostra di più" hideLabel="Nascondi">
                        <Text size="sm">{merit.effect}</Text>
                    </Spoiler>
                </Stack>

                {isMultiLevel ? (
                    // Dot system for multi-level merits
                    <Group gap="xs">
                        {Array.from({ length: maxDots }).map((_, i) => {
                            const rating = i + 1;
                            const isFilled = rating <= currentRating;
                            // Check if affordable to click to this rating (either reducing/maintaining OR affordably increasing)
                            const canAffordTarget = isAffordableToIncrease(rating);

                            // Can click if it's currently filled (to reduce or reset) OR if we can afford to set it to this rating.
                            const canClick = canAffordTarget || rating <= currentRating;

                            // Visual cue: if we can't afford, the dot should look disabled, UNLESS it's already filled (to allow refunds).
                            const visualDisabled = !canAffordTarget && !isFilled;

                            return (
                                <ThemeIcon
                                    key={i}
                                    variant="subtle"
                                    color={isFilled ? 'blue' : 'gray'}
                                    onClick={() => canClick && handleDotClick(i)}
                                    style={{
                                        cursor: canClick ? 'pointer' : 'not-allowed',
                                        opacity: visualDisabled ? 0.5 : 1
                                    }}
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
                        // Disable if turning ON and cannot afford the cost[0]
                        disabled={currentRating === 0 && !isAffordableToIncrease(1)}
                    />
                )}
            </Group>
        </Paper>
    );
};

export const MeritSelection = () => {
    const dispatch = useAppDispatch();
    const selectedMerits: { [key: string]: number } = useAppSelector((state) => state.character.merits.selected);

    // Memoize the cost calculation helper
    const memoizedCalculateTotalCost = useCallback(calculateTotalCost, []);

    // 1. FIXED: Correctly calculate the total points spent
    const totalPointsSpent = useMemo(() => {
        return Object.entries(selectedMerits).reduce((sum, [name, rating]) => {
            const merit = meritData.find(m => m.name === name);
            if (!merit || rating === 0) return sum;

            // Use the helper to calculate the correct cumulative cost
            return sum + memoizedCalculateTotalCost(merit, rating);
        }, 0);
    }, [selectedMerits, memoizedCalculateTotalCost]);


    const pointsRemaining = MAX_MERIT_POINTS - totalPointsSpent;

    // 2. FIXED: Reworked affordability check to calculate net cost change
    const checkAffordability = useCallback((meritName: string, targetRating: number): boolean => {
        const merit = meritData.find(m => m.name === meritName);
        if (!merit) return false;

        const currentRating = selectedMerits[meritName] || 0;

        // Calculate the total cost of the merit at the current rating
        const currentCost = memoizedCalculateTotalCost(merit, currentRating);

        // Calculate the total cost of the merit at the target rating
        const targetCost = memoizedCalculateTotalCost(merit, targetRating);

        // Calculate the net difference in cost (positive for expense, negative for refund)
        const netCostChange = targetCost - currentCost;

        // Check if the remaining points can cover the expense (only if it's an expense)
        return netCostChange <= 0 || pointsRemaining >= netCostChange;
    }, [selectedMerits, pointsRemaining, memoizedCalculateTotalCost]);

    // This is the primary function called by MeritRow to update the state
    const handleRatingChange = useCallback((name: string, rating: number) => {
        // Only dispatch if the change is affordable (or a reduction, which is always affordable)
        if (checkAffordability(name, rating)) {
            dispatch(setMeritRating({ name, rating }));
        }
    }, [checkAffordability, dispatch]);

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>6. Aggiungi i tuoi Meriti</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    I Meriti sono vantaggi speciali. Hai **{MAX_MERIT_POINTS} punti Merito** da spendere.
                </Text>
            </Stack>

            <Paper withBorder p="md" mb="xl">
                <Group justify="center">
                    <Text fw={700}>Punti Rimanenti:</Text>
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
                        // Pass the affordability checker directly, as it needs the target rating, not just a cost change
                        checkAffordabilityForTarget={(targetRating) => checkAffordability(merit.name, targetRating)}
                    />
                ))}
            </Stack>
        </Box>
    );
};
