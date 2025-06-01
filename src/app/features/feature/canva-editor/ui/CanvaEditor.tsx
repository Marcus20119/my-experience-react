import { Flex } from 'antd';
import type { CanvaEditorExternalContextProps } from '../context';
import { CanvaEditorProvider } from '../context';
import { CANVA_SIZE } from '../model';
import { CanvaFooter } from './Footer';
import { CanvaHeader } from './Header';
import { CanvaSidebar } from './Sidebar';
import { CanvaWorkspace } from './Workspace';

interface RequiredContextProps
  extends Pick<CanvaEditorExternalContextProps, 'height' | 'width'> {}

interface OptionalContextProps
  extends Pick<CanvaEditorExternalContextProps, 'asset' | 'initialItems'> {}

interface Props extends RequiredContextProps, OptionalContextProps {}

function CanvaEditor({ asset, height, initialItems, width }: Props) {
  return (
    <CanvaEditorProvider
      asset={asset}
      height={height}
      initialItems={initialItems}
      width={width}
    >
      <Flex
        className="transition-all duration-300"
        style={{
          height,
          width,
        }}
      >
        <Flex
          className="flex-shrink-0 transition-all duration-500"
          style={{
            height,
            width: CANVA_SIZE.sidebarWidth,
          }}
        >
          <CanvaSidebar />
        </Flex>
        <Flex
          className="flex-1 border-0 border-l border-solid border-neutral-200 bg-neutral-100 transition-all duration-300"
          style={{
            height,
          }}
          vertical
        >
          <CanvaHeader />
          <CanvaWorkspace />
          <CanvaFooter />
        </Flex>
      </Flex>
    </CanvaEditorProvider>
  );
}

export default CanvaEditor;
