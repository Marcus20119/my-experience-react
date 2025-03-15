import { FORM_BUILDER_SIZE } from '@/app/features/feature/form-builder/model';
import { Flex } from 'antd';

function FormBuilderLeftBar() {
  return (
    <Flex
      className="h-full"
      style={{
        width: FORM_BUILDER_SIZE.leftBar,
      }}
    >
      Left bar
    </Flex>
  );
}

export default FormBuilderLeftBar;
