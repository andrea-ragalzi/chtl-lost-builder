import { Fieldset, TextInput, Group, NumberInput, Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { updateMortalName, updateFaeName, updatePlayerName, updateApparentAge, updateGender, updateProfession } from '../../../shared/stores/profileSlice';

export const MortalDetailsSection = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.character.profile);

    return (
        <Fieldset legend="Mortal Identity & Status" mb="md">
            <TextInput
                label="Mortal Name (Mask)"
                placeholder="Name before Arcadia..."
                value={profile.mortalName || ''}
                onChange={(e) => dispatch(updateMortalName(e.target.value))}
                mb="xs"
            />
            <TextInput
                label="Fae Name (True Name)"
                placeholder="Name in the Fae world..."
                value={profile.faeName || ''}
                onChange={(e) => dispatch(updateFaeName(e.target.value))}
                mb="xs"
            />
            <TextInput
                label="Player"
                placeholder="Your name..."
                value={profile.playerName || ''}
                onChange={(e) => dispatch(updatePlayerName(e.target.value))}
                mb="xs"
            />
            <Group grow mb="xs">
                <NumberInput
                    label="Apparent Age"
                    placeholder="25"
                    value={profile.apparentAge || ''}
                    onChange={(value) => dispatch(updateApparentAge(Number(value)))}
                />
                <Select
                    label="Gender"
                    placeholder="Select..."
                    data={['Male', 'Female', 'Non-binary', 'Other']}
                    value={profile.gender || ''}
                    onChange={(value) => dispatch(updateGender(value || ''))}
                />
            </Group>
            <TextInput
                label="Profession"
                placeholder="Artist, Detective, Barista..."
                value={profile.profession || ''}
                onChange={(e) => dispatch(updateProfession(e.target.value))}
            />
        </Fieldset>
    );
};