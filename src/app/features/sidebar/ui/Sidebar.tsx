import { Flex } from 'antd';

import MainSideBar from './MainSideBar';
import SubSideBar from './SubSideBar';

function Sidebar() {
  return (
    <Flex className="sticky left-0 top-0 z-sidebar h-screen flex-shrink-0">
      <MainSideBar />
      <SubSideBar />
    </Flex>
  );
}

export default Sidebar;
