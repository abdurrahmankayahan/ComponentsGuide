import React from 'react';

import { Button, ButtonPropsConfig } from './Button/Button';
import Text, { TextPorpsConfig, TextProps } from './Text/Text';
import { UserInterfaceStyle } from 'react-native-screens';
import Box, { BoxProps, BoxPropsConfig } from './Layout/Box';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, Spacing } from '../theme/themes';

// Utility function to generate prop definitions from component props interface
function generatePropDefinitions<T extends Record<string, any>>(
  propMap: Record<
    keyof T,
    {
      type: string;
      description?: string;
      required?: boolean;
      defaultValue?: any;
    }
  >,
): PropDefinition[] {
  return Object.entries(propMap).map(([name, config]) => ({
    name,
    type: config.type,
    description: config.description,
    required: config.required,
    defaultValue: config.defaultValue,
  }));
}

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: any;
  description?: string;
  required?: boolean;
}

export interface ComponentProps {
  [key: string]: any;
}

export type ComponentCategory =
  | 'Layout'
  | 'Text'
  | 'Buttons'
  | 'Cards'
  | 'Inputs'
  | 'Feedback';

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  Preview: React.ComponentType<any>;
  props?: ComponentProps;
  propDefinitions?: PropDefinition[];
  getAvailableProps?: object;
}

export const componentRegistry: ComponentItem[] = [
  //#region Box
  {
    id: 'box-layout',
    name: 'Box',
    description: 'Boş Kanvas',
    category: 'Layout',
    getAvailableProps: BoxPropsConfig,

    Preview: () => (
      <Box
        padding="xl"
        margin="xs"
        backgroundColor={lightTheme.primary}
        radius={Spacing.sm}
      >
        <Text>{'BOX'}</Text>
      </Box>
    ),
  },

  //#endregion

  //#region Button
  {
    id: 'button-primary',
    name: 'Primary Button',
    description: 'Ana aksiyon butonu',
    category: 'Buttons',

    getAvailableProps: ButtonPropsConfig,
    Preview: () => <Button label="Primary Button" />,
  },

  //#endregion

  {
    id: 'text-basic',
    name: 'Basic Text',
    description: 'Standart text bileşeni',
    category: 'Text',
    getAvailableProps: TextPorpsConfig,
    Preview: () => <Text >Bu bir örnek metindir</Text>,
  },
];

export const groupByCategory = (items: ComponentItem[]) => {
  return items.reduce<Record<string, ComponentItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};
