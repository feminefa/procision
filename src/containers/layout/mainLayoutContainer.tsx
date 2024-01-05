import MainLayout from "~/components/layout/main";
import { ThemeContext } from '~/context/ThemeProvider';
import { ConfigProvider,  } from 'antd/lib';
import { AppTheme } from '~/_shared/theme';
import { useContext, type ReactNode } from "react";

export default function MainLayoutContainer({ children }: { children?: ReactNode}) {
    const { themeType } = useContext(ThemeContext);
  return (
      <>
         
        <ConfigProvider theme={AppTheme[themeType] ?? AppTheme.light}>
          <MainLayout  >{children}</MainLayout>
        </ConfigProvider>
    </>
  );
}


