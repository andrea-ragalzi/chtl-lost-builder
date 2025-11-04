import { Box } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addTouchstone, removeTouchstone, updateTouchstone } from '../../../shared/stores/touchstonesSlice';
import { SimpleList } from './SimpleList';

export const TouchstonesSection = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.character.touchstones.list);

    return (
        <Box mb="md">
            <SimpleList
                title="Touchstones"
                items={items}
                onAdd={(text) => dispatch(addTouchstone(text))}
                onRemove={(index) => dispatch(removeTouchstone(index))}
                onUpdate={(index, text) => dispatch(updateTouchstone({ index, text }))}
            />
        </Box>
    );
};