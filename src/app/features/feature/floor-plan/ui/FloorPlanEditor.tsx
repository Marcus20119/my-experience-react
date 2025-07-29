import { Flex } from 'antd';
import { forwardRef } from 'react';

import { COLOR } from '@/shared/assets/styles/constants';

import type { FloorPlanEditorExternalContextProps } from '../context';
import { FloorPlanEditorProvider } from '../context';
import { FLOOR_PLAN_EDITOR_SIZE, type FloorPlanRef } from '../model';
import RoomMenu from './RoomMenu';
import { StyledRoomMenu } from './styles';
import { FloorPlanWorkspace } from './workspace';
import FloorPlanImperativeHandleBridge from './workspace/FloorPlanImperativeHandleBridge';

interface Props extends FloorPlanEditorExternalContextProps {}

function FloorPlanEditor(
  { height, width, ...props }: Props,
  ref: React.Ref<FloorPlanRef>,
) {
  return (
    <FloorPlanEditorProvider height={height} width={width} {...props}>
      <FloorPlanImperativeHandleBridge ref={ref} />
      <Flex
        className="relative transition-all duration-300"
        gap="1rem"
        style={{
          height,
          padding: FLOOR_PLAN_EDITOR_SIZE.padding,
          width,
        }}
      >
        <StyledRoomMenu softPrimaryColor={`${COLOR.primary}33`}>
          <RoomMenu />
        </StyledRoomMenu>
        <div
          className="flex-1 transition-all duration-300"
          style={{
            height: height - FLOOR_PLAN_EDITOR_SIZE.padding * 2,
          }}
        >
          <FloorPlanWorkspace />
        </div>
      </Flex>
    </FloorPlanEditorProvider>
  );
}

export default forwardRef<FloorPlanRef, Props>(FloorPlanEditor);
