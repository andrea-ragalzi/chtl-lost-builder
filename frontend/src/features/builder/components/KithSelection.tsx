import { Box, Text, Card, Image, Title, Stack, Blockquote, List } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setKith } from '../../../shared/stores/kithSlice';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useEffect } from 'react';
import { kithData } from '../../../shared/data/kithData';

export const KithSelection = () => {
    const dispatch = useAppDispatch();
    const selectedKith = useAppSelector((state) => state.character.kith.selected);

    useEffect(() => {
        if (!selectedKith && kithData.length > 0) {
            dispatch(setKith(kithData[0].value));
        }
    }, [dispatch, selectedKith]);

    const handleCarouselChange = (index: number) => {
        const newKith = kithData[index].value;
        dispatch(setKith(newKith));
    };

    const initialSlideIndex = selectedKith ? kithData.findIndex(k => k.value === selectedKith) : 0;

    const slides = kithData.map((kith) => (
        <Carousel.Slide key={kith.value}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Card.Section>
                    <Image src={kith.image} height={180} alt={kith.label} />
                </Card.Section>

                <Stack mt="md" gap="sm">
                    <Title order={3} ta="center">{kith.label}</Title>
                    <Blockquote fz="sm" ta="center" mt={0} p={0}>{kith.tagline}</Blockquote>
                    <Text size="sm" c="dimmed">{kith.description}</Text>

                    <List size="sm" spacing="xs" withPadding>
                        <List.Item><b>Blessing:</b> {kith.blessing}</List.Item>
                        <List.Item><b>Unique Power:</b> {kith.uniquePower}</List.Item>
                    </List>
                </Stack>
            </Card>
        </Carousel.Slide>
    ));

    return (
        <Box p="md">
            <Title order={2} style={{ textAlign: 'center' }} mb="md">6. Select your Kith</Title>
            <Carousel
                key={initialSlideIndex}
                slideSize="100%"
                slideGap="md"
                withControls
                withIndicators
                onSlideChange={handleCarouselChange}
                initialSlide={initialSlideIndex}
                emblaOptions={{
                    loop: true,
                    dragFree: false,
                    align: 'center'
                }}
            >
                {slides}
            </Carousel>
        </Box>
    );
};