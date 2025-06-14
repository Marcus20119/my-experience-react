import { Col, Flex, Image, Row } from 'antd';

import { cn } from '@/lib/tailwind';

import CarouselGallery from './CarouselGallery';

interface Props {
  gallery?: null | string[];
  height?: number | string;
  layout: '1:2' | '1:4';
}

function GridGallery({ gallery, height, layout }: Props) {
  if (!gallery?.length) {
    return (
      <Flex
        className="w-full overflow-hidden rounded-xl"
        style={{
          height,
        }}
      >
        <CarouselGallery gallery={gallery} showCount />
      </Flex>
    );
  }

  if (layout === '1:2') {
    return (
      <Flex
        className="w-full"
        style={{
          height,
        }}
      >
        <Image.PreviewGroup>
          <Row className="m-0 h-full w-full" gutter={12}>
            <Col className="h-full pl-0" span={16}>
              <Image
                className="object-cover"
                height="100%"
                rootClassName="overflow-hidden rounded-xl"
                src={gallery[0]}
                width="100%"
              />
            </Col>

            <Col className="h-full pr-0" span={8}>
              <Row className="h-full" gutter={[12, 12]}>
                {gallery.slice(1).map((image, index) => (
                  <Col
                    className={cn(
                      'h-[calc((100%-12px)/2)]',
                      index >= 2 ? 'hidden' : '',
                    )}
                    key={index}
                    span={24}
                  >
                    <Image
                      className="object-cover"
                      height="100%"
                      preview={
                        index === 1 && gallery.length > 3
                          ? {
                              mask: `+${gallery.length - 3}`,
                              maskClassName: 'opacity-100 text-3xl',
                            }
                          : undefined
                      }
                      rootClassName="overflow-hidden rounded-xl"
                      src={image}
                      width="100%"
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Image.PreviewGroup>
      </Flex>
    );
  }

  if (layout === '1:4') {
    return (
      <Flex
        className="w-full"
        style={{
          height,
        }}
      >
        <Image.PreviewGroup>
          <Row className="m-0 h-full w-full" gutter={12}>
            <Col className="h-full pl-0" span={14}>
              <Image
                className="object-cover"
                height="100%"
                rootClassName="overflow-hidden rounded-xl"
                src={gallery[0]}
                width="100%"
              />
            </Col>

            <Col className="h-full pr-0" span={10}>
              <Row className="h-full" gutter={[12, 12]}>
                {gallery.slice(1).map((image, index) => (
                  <Col
                    className={cn(
                      'h-[calc((100%-12px)/2)]',
                      index >= 4 ? 'hidden' : '',
                    )}
                    key={index}
                    span={12}
                  >
                    <Image
                      className="object-cover"
                      height="100%"
                      preview={
                        index === 3 && gallery.length > 5
                          ? {
                              mask: `+${gallery.length - 5}`,
                              maskClassName: 'opacity-100 text-3xl',
                            }
                          : undefined
                      }
                      rootClassName="overflow-hidden rounded-xl"
                      src={image}
                      width="100%"
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Image.PreviewGroup>
      </Flex>
    );
  }

  return null;
}

export default GridGallery;
