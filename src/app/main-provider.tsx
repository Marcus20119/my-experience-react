import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, Spin } from 'antd';
import type { FormConfig } from 'antd/es/config-provider/context';
import type { Locale } from 'antd/es/locale';
import type { ThemeConfig } from 'antd/lib';
import dayjs from 'dayjs';
import { CloseCircle } from 'iconsax-react';
import { Suspense, useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { theme as defaultTheme } from '@/lib/antd';
import { i18nFormConfig } from '@/lib/antd/form';
import enUS from '@/lib/antd/locale/en_US';
import viVN from '@/lib/antd/locale/vi_VN';
import { apolloClient } from '@/lib/apollo-client';
import i18n from '@/lib/i18next';
import { queryClient } from '@/lib/tanstack-client';
import { COLOR } from '@/shared/assets/styles/constants';
import { useLocalStore } from '@/shared/stores/local.store';
import { ThemeTool } from '@/shared/utils';

import { routes } from './routes';

function AntProvider() {
  const { language, primaryColor, secondaryColor } = useLocalStore();

  const locale: Locale = useMemo(() => {
    if (language === 'en') {
      return enUS;
    }

    return viVN;
  }, [language]);

  const formConfig: FormConfig = useMemo(() => {
    if (language === 'en') {
      return i18nFormConfig.en;
    }

    return i18nFormConfig.vi;
  }, [language]);

  useEffect(() => {
    i18n.changeLanguage(language);
    dayjs.locale(language);
  }, [language]);

  const theme: ThemeConfig = useMemo(() => {
    if (!primaryColor || !secondaryColor) {
      return defaultTheme;
    }

    const secondaryLightColor = ThemeTool.getHexColorVariant(
      secondaryColor,
      0.2,
    );

    return {
      components: {
        ...defaultTheme.components,
        ['Button']: {
          ...defaultTheme.components.Button,
          primaryColor: secondaryColor ?? undefined,
        },
        ['Cascader']: {
          ...defaultTheme.components.Cascader,
          optionSelectedBg: secondaryLightColor,
        },
        ['DatePicker']: {
          ...defaultTheme.components.DatePicker,
          cellActiveWithRangeBg: secondaryLightColor,
          cellHoverWithRangeBg: secondaryLightColor,
        },
        ['Select']: {
          ...defaultTheme.components.Select,
          optionSelectedBg: secondaryLightColor,
        },
        ['TreeSelect']: {
          ...defaultTheme.components.TreeSelect,
          nodeSelectedBg: secondaryLightColor,
        },
      },
      token: {
        ...defaultTheme.token,
        colorPrimary: primaryColor,
      },
    };
  }, [secondaryColor, primaryColor]);

  useEffect(() => {
    if (primaryColor) {
      COLOR.primary = primaryColor;
      COLOR.primaryLight = ThemeTool.getHexColorVariant(primaryColor, 0.2);
    }

    if (secondaryColor) {
      COLOR.secondary = secondaryColor;
      COLOR.secondaryLight = ThemeTool.getHexColorVariant(secondaryColor, 0.2);
    }

    //map colors variables for root
    const root = document.documentElement;

    const setProperties = <T extends object>(obj: T, prefix = ''): void => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          setProperties(value, `${prefix}${key}-`);
        } else if (typeof value === 'string') {
          root.style.setProperty(`--${prefix}${key}-color`, value);
        }
      });
    };

    setProperties(COLOR);
  }, [secondaryColor, primaryColor]);

  return (
    <ConfigProvider
      componentSize="small"
      form={formConfig}
      input={{
        allowClear: {
          clearIcon: (
            <CloseCircle
              color={COLOR.neutral['400']}
              size="18"
              variant="Bold"
            />
          ),
        },
        autoComplete: 'off',
      }}
      locale={locale}
      theme={theme}
    >
      <Suspense fallback={<Spin fullscreen size="large" spinning={false} />}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </ConfigProvider>
  );
}

function MainProvider() {
  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AntProvider />
          <ReactQueryDevtools initialIsOpen={false} position="right" />
        </QueryClientProvider>
      </ApolloProvider>
    </I18nextProvider>
  );
}

export default MainProvider;
