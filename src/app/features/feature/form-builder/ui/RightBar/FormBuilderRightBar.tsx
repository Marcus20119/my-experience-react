import { FORM_BUILDER_SIZE } from '@/app/features/feature/form-builder/model';
import { Flex } from 'antd';

function FormBuilderRightBar() {
  return (
    <Flex
      className="h-full"
      style={{
        width: FORM_BUILDER_SIZE.rightBar,
      }}
    >
      Right bar
    </Flex>
  );
}

export default FormBuilderRightBar;
