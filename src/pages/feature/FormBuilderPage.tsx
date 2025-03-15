import { useHeaderStore, type BreadcrumbItem } from '@/app/features/header';
import {
  FORM_BUILDER_SIZE,
  FormBuilderHeader,
  FormBuilderLeftBar,
  FormBuilderProvider,
  FormBuilderRightBar,
} from '@/app/features/feature/form-builder';
import { ContentLayout } from '@/app/layout';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '@/shared/hooks';

function FormBuilderPage() {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const { getHeaderHeight } = useHeaderStore();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.formBuilder'),
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      contentNoPadding
      title={t('layout.title.formBuilder')}
    >
      <FormBuilderProvider>
        <Flex className="w-full" vertical>
          <FormBuilderHeader />
          <Flex
            style={{
              height:
                windowHeight - getHeaderHeight() - FORM_BUILDER_SIZE.header,
            }}
          >
            <FormBuilderLeftBar />
            <Flex className="flex-1 bg-neutral-100" justify="center">
              Canvas
            </Flex>
            <FormBuilderRightBar />
          </Flex>
        </Flex>
      </FormBuilderProvider>
    </ContentLayout>
  );
}

export default FormBuilderPage;
