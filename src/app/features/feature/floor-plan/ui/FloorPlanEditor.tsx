import { Flex } from 'antd';

import RoomMenu from './RoomMenu';
import { RoomEntity } from '../model';

function FloorPlanEditor() {
  const mockedRooms: RoomEntity[] = [
    {
      desks: [
        {
          id: 1,
          name: 'Desk 1',
        },
        {
          id: 2,
          name: 'Desk 2',
        },
        {
          id: 3,
          name: 'Desk 3',
        },
      ],
      id: 1,
      name: 'Room 101',
    },
    {
      desks: [
        {
          id: 1,
          name: 'Desk 1',
        },
        {
          id: 2,
          name: 'Desk 2',
        },
        {
          id: 3,
          name: 'Desk 3',
        },
      ],
      id: 1,
      name: 'Room 101',
    },
    {
      desks: [
        {
          id: 1,
          name: 'Desk 1',
        },
        {
          id: 2,
          name: 'Desk 2',
        },
        {
          id: 3,
          name: 'Desk 3',
        },
      ],
      id: 1,
      name: 'Room 101',
    },
  ];

  return (
    <Flex gap="1.5rem">
      <RoomMenu />
    </Flex>
  );
}

export default FloorPlanEditor;
