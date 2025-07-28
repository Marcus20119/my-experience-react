import { Flex } from 'antd';

import type { FloorPlanEditorExternalContextProps } from '../context';
import { FloorPlanEditorProvider } from '../context';
import { FLOOR_PLAN_EDITOR_SIZE } from '../model';
import { FloorPlanFooter } from './footer';
import { FloorPlanHeader } from './header';
import RoomMenu from './RoomMenu';
import { StyledRoomMenu } from './styles';
import { FloorPlanWorkspace } from './workspace';

interface RequiredContextProps
  extends Pick<
    FloorPlanEditorExternalContextProps,
    'floorPlanUrl' | 'height' | 'initialRooms' | 'width'
  > {}

interface Props extends RequiredContextProps {}

function FloorPlanEditor({ floorPlanUrl, height, initialRooms, width }: Props) {
  return (
    <FloorPlanEditorProvider
      floorPlanUrl={floorPlanUrl}
      height={height}
      initialRooms={initialRooms}
      width={width}
    >
      <Flex
        className="bg-neutral-100 transition-all duration-300"
        gap="1rem"
        style={{
          height,
          padding: FLOOR_PLAN_EDITOR_SIZE.padding,
          width,
        }}
      >
        <StyledRoomMenu>
          <RoomMenu />
        </StyledRoomMenu>
        <div
          className="flex-1 transition-all duration-300"
          style={{
            height: height - FLOOR_PLAN_EDITOR_SIZE.padding * 2,
          }}
        >
          <FloorPlanHeader />
          <FloorPlanWorkspace />
          <FloorPlanFooter />
        </div>
      </Flex>
    </FloorPlanEditorProvider>
  );
}

export default FloorPlanEditor;
