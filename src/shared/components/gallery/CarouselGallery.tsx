import { Carousel, Flex, Image, Typography } from 'antd';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useRef, useState } from 'react';

import { useElementSize } from '@/shared/hooks';

import { Thumbnail } from '../thumbnail';

const { Text } = Typography;

interface Props {
  gallery?: null | string[];
  showCount?: boolean;
}

function CarouselGallery({ gallery, showCount }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { size } = useElementSize({
    elementRef: wrapperRef,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full flex-1" ref={wrapperRef}>
      <div className="absolute inset-0">
        {!gallery?.length ? <Thumbnail.Empty /> : null}

        {gallery?.length === 1 ? (
          <Flex className="h-full w-full" justify="center">
            <Image
              className="object-cover"
              height="100%"
              preview={false}
              src={gallery[0]}
              width="100%"
            />
          </Flex>
        ) : null}

        {gallery?.length && gallery?.length > 1 ? (
          <>
            <Carousel
              afterChange={current => {
                setCurrentIndex(current);
              }}
              arrows
              autoplay
              dots
              nextArrow={<ArrowRight2 />}
              prevArrow={<ArrowLeft2 />}
            >
              {gallery.map((image, index) => (
                <div key={index}>
                  <Image
                    className="object-cover"
                    height={size.height}
                    preview={false}
                    src={image}
                    width={size.width}
                  />
                </div>
              ))}
            </Carousel>

            {showCount ? (
              <Text className="absolute bottom-3 right-3 block min-w-14 rounded-full bg-slate-50/80 px-3 py-1 text-center font-bold">{`${currentIndex + 1} / ${gallery?.length}`}</Text>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default CarouselGallery;
