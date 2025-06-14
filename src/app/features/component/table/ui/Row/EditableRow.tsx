import { Form } from 'antd';

import { EditableContext } from '@/app/features/component/table';

interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
}

function EditableRow({ ...props }: Props) {
  const [form] = Form.useForm();

  return (
    <Form component={false} form={form}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}

export default EditableRow;
