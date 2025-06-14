import { Flex } from 'antd';
import { useMemo } from 'react';
import { Layer, Stage } from 'react-konva';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { CanvaItemType } from '@/app/features/feature/canva-editor/model';

import Item from '../items';
import CanvaItemActions from './CanvaItemActions';
import GridLayer from './GridLayer';

function CanvaWorkspace() {
  const {
    items,
    setSelectedItem,
    stageRef,
    stageSize,
    workspaceRef,
    workspaceSize,
  } = useCanvaEditorContext();

  const sortedItems = useMemo(
    () => items?.sort((a, b) => a.zIndex - b.zIndex),
    [items],
  );

  return (
    <Flex
      align="center"
      className="overflow-auto transition-all"
      ref={workspaceRef}
      style={{
        height: workspaceSize.height,
        width: workspaceSize.width,
      }}
    >
      <div
        className="relative m-auto flex-shrink-0 bg-neutral-0 shadow-card-lg"
        // Add cursor style
        onDragOver={e => {
          e.preventDefault();
        }}
        style={{
          height: stageSize.height,
          width: stageSize.width,
        }}
      >
        <GridLayer zIndex={0} />
        <Stage
          className="absolute z-10"
          height={stageSize.height}
          onClick={() => setSelectedItem(null)}
          onTap={() => setSelectedItem(null)}
          ref={stageRef}
          width={stageSize.width}
        >
          <Layer>
            {sortedItems.map((item, index) => {
              if (item.type === CanvaItemType.Image) {
                return <Item.CanvaImage item={item} key={index} />;
              }

              if (item.type === CanvaItemType.Shape) {
                return <Item.CanvaShape item={item} key={index} />;
              }

              return null;
            })}
          </Layer>
        </Stage>
        <CanvaItemActions zIndex={20} />
      </div>
    </Flex>
  );
}

export default CanvaWorkspace;
