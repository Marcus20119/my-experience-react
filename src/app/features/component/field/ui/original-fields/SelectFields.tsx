import { Form } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { TreeSelectProps } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { OriginalFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { AutoComplete, Card, Cascader, Select } from '@/shared/components';
import { FormTool } from '@/shared/utils';

const { filterOption, filterTreeNode } = FormTool;

function SelectFields() {
  const { t } = useTranslation();

  const selectOptions: DefaultOptionType[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      label: `Option ${index + 1}`,
      value: `${index + 1}`,
    }));

  const treeSelectOptions: TreeSelectProps['treeData'] = Array(10)
    .fill(null)
    .map((_, index) => ({
      children: Array(5)
        .fill(null)
        .map((_, childIndex) => ({
          label: `Child ${index + 1}-${childIndex + 1}`,
          value: `${index + 1}-${childIndex + 1}`,
        })),
      label: `Parent ${index + 1}`,
      value: `${index + 1}`,
    }));

  const cascaderOptions: DefaultOptionType[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      children: Array(10)
        .fill(null)
        .map((_, cityIndex) => ({
          children: Array(5)
            .fill(null)
            .map((_, districtIndex) => ({
              label: `District ${districtIndex + 1}`,
              value: `${index + 1}-${cityIndex + 1}-${districtIndex + 1}`,
            })),
          label: `City ${cityIndex + 1}`,
          value: `${index + 1}-${cityIndex + 1}`,
        })),
      label: `Country ${index + 1}`,
      value: `${index + 1}`,
    }));

  const autoCompleteOptions: DefaultOptionType[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      label: `Country ${index + 1}`,
      value: `Country ${index + 1}`,
    }));

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.singleSelect')}
          name="singleSelect"
        >
          <Select
            allowClear
            filterOption={filterOption}
            optionFilterProp="label"
            options={selectOptions}
            placeholder={t('component.placeholder.singleSelect')}
            showSearch
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.multipleSelect')}
          name="multiSelect"
        >
          <Select
            allowClear
            filterOption={filterOption}
            mode="multiple"
            optionFilterProp="label"
            options={selectOptions}
            placeholder={t('component.placeholder.multipleSelect')}
            showSearch
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.treeSelect')}
          name="treeSelect"
        >
          <Select.Tree
            allowClear
            filterTreeNode={filterTreeNode}
            placeholder={t('component.placeholder.treeSelect')}
            showCheckedStrategy="SHOW_PARENT"
            showSearch
            treeCheckable
            treeData={treeSelectOptions}
            treeLine
            treeNodeFilterProp="label"
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.cascader')}
          name="cascader"
        >
          <Cascader
            allowClear
            options={cascaderOptions}
            placeholder={t('component.placeholder.cascader')}
            showCheckedStrategy="SHOW_PARENT"
            showSearch
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.autocomplete')}
          name="autocomplete"
        >
          <AutoComplete
            allowClear
            filterOption={filterOption}
            optionFilterProp="label"
            options={autoCompleteOptions}
            placeholder={t('component.placeholder.autocomplete')}
          />
        </Form.Item>
      ),
      span: 8,
    },
  ];
  return <Card.Grid grids={grids} title={t('component.title.selectFields')} />;
}

export default SelectFields;
