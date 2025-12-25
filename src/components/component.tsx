import React from 'react';

import { Button, ButtonPropsConfig } from './Button/Button';
import Text, { TextPorpsConfig, TextProps } from './Text/Text';
import { UserInterfaceStyle } from 'react-native-screens';
import Box, { BoxProps, BoxPropsConfig } from './Layout/Box';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, Spacing } from '../theme/themes';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SlideBox, { SlideBoxPropsConfig } from './Layout/SlideBox';
import InputText, { InputTextPropsConfig } from './InputText/InputText';
import Divider, { DividerPropsConfig } from './Divider/Divider';

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
  | 'Buttons'
  | 'Inputs'
  | 'Text'
  | 'Cards'
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
  //#region layout
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
  {
    id: 'slide-box-layout',
    name: 'Slide Box',
    description: 'Katlanabilir Kanvas',
    category: 'Layout',
    getAvailableProps: SlideBoxPropsConfig,

    Preview: () => (
      <SlideBox title=" Bu bir Slide Box">
        <Text>{'Slide Box içerik kısmı'}</Text>
      </SlideBox>
    ),
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'Nesneleri ayırmak için kullanılır',
    category: 'Layout',
    getAvailableProps: DividerPropsConfig,

    Preview: () => (
      <Box>
        <SlideBox title="Size">
          <Divider size={'xs'} />
          <Divider size={'sm'} />
          <Divider size={'md'} />
          <Divider size={'lg'} />
          <Divider size={'xl'} />
        </SlideBox>
        <SlideBox title="Lenght">
          <Divider lenght={'50%'} size={'md'} />
          <Divider lenght={'70%'} size={'md'} />
          <Divider lenght={'80%'} size={'md'} />
          <Divider lenght={'90%'} size={'md'} />
          <Divider lenght={'100%'} size={'md'} />
        </SlideBox>

        <SlideBox title="Shape" >
          <Divider shape="round" lenght={'90%'} size={'xl'} />
          <Divider shape="square" lenght={'90%'} size={'xl'} />
        </SlideBox>
        <SlideBox title="Others">
          <Divider color="red" size={'md'} />
          <Box justifyContent="center" flexDirection="row" height={50}>
            <Divider vertical={true} lenght={'50%'} size={'md'} />
            <Divider vertical={true} lenght={'60%'} size={'md'} />
            <Divider vertical={true} lenght={'70%'} size={'md'} />
            <Divider vertical={true} lenght={'80%'} size={'md'} />
          </Box>
          <Divider color="blue" size={'md'} />
        </SlideBox>
      </Box>
    ),
  },

  //#endregion

  //#region Buttons
  {
    id: 'button-primary',
    name: 'Primary Button',
    description: 'Ana aksiyon butonu',
    category: 'Buttons',

    getAvailableProps: ButtonPropsConfig,
    Preview: () => (
      <Box>
        <SlideBox title="Size">
          <Button
            title="Extra Small XS"
            variant="filled"
            size="xs"
            onPress={() => {}}
          />

          <Button
            title="Small SM"
            variant="filled"
            size="sm"
            onPress={() => {}}
          />
          <Button
            title="Medium MD"
            variant="filled"
            size="md"
            onPress={() => {}}
          />
          <Button
            title="Large LG"
            variant="filled"
            size="lg"
            onPress={() => {}}
          />
          <Button
            title="Extra Large XL"
            variant="filled"
            size="xl"
            onPress={() => {}}
          />
        </SlideBox>
        <SlideBox title="Variant">
          <Button
            title="Elevated"
            variant="elevated"
            size="md"
            onPress={() => {}}
          />
          <Button
            title="Filled"
            variant="filled"
            size="md"
            onPress={() => {}}
          />
          <Button title="Tonal" variant="tonal" size="md" onPress={() => {}} />
          <Button
            title="Outlined"
            variant="outlined"
            size="md"
            onPress={() => {}}
          />
          <Button title="Text" variant="text" size="md" onPress={() => {}} />
        </SlideBox>
        <SlideBox title="Shape">
          <Button
            title="Round"
            shape="round"
            variant="elevated"
            size="md"
            onPress={() => {}}
          />
          <Button
            title="Square"
            shape="square"
            variant="elevated"
            size="md"
            onPress={() => {}}
          />
        </SlideBox>

        <SlideBox title="Others">
          <Button
            title="Left Icon"
            variant="filled"
            size="sm"
            iconLeft={<Icon name="house" size={20} />}
            onPress={() => {}}
          />

          <Button
            title="Double Icon"
            variant="filled"
            size="sm"
            iconLeft={<Icon name="person" size={20} />}
            iconRight={<Icon name="house" size={20} />}
            onPress={() => {}}
          />
          <Button
            title="Right Icon"
            variant="filled"
            size="sm"
            iconRight={<Icon name="fly" size={20} />}
            onPress={() => {}}
          />

          <Button
            title="Left Load"
            variant="outlined"
            size="sm"
            loading={true}
            loadingPosition="left"
            onPress={() => {}}
          />
          <Button
            title="Right Load"
            variant="outlined"
            size="sm"
            loading={true}
            loadingPosition="right"
            onPress={() => {}}
          />
          <Button
            title="Button"
            variant="outlined"
            size="sm"
            loading={true}
            onPress={() => {}}
          />
        </SlideBox>
      </Box>
    ),
  },

  //#endregion

  //#region Inputs
  {
    id: 'Input-text-basic',
    name: 'Input Text',
    description: 'Kullanıcıdan verileri alın',
    category: 'Inputs',
    getAvailableProps: InputTextPropsConfig,
    Preview: () => (
      <Box>
        <InputText
        //descriptionText="Kullanıcı adınız yanlıs"
        />
        <InputText
          iconLeft={<Icon name="user" size={30} />}
          placeHolder="User Name"
        />
        <InputText
          iconLeft={<Icon name="user" size={30} />}
          placeHolder="User Name"
          iconRight={<Icon name="arrow-right" size={30} />}
        />
        <InputText
          iconLeft={<Icon name="user" size={30} />}
          placeHolder="User Name"
          iconRight={
            <Icon name="circle-exclamation" color={'#911'} size={30} />
          }
          descriptionText="Kullanıcı adınız yanlış!!"
        />
      </Box>
    ),
  },
  //#endregion

  //#region Text
  {
    id: 'text-basic',
    name: 'Basic Text',
    description: 'Standart text bileşeni',
    category: 'Text',
    getAvailableProps: TextPorpsConfig,
    Preview: () => <Text>Bu bir örnek metindir</Text>,
  },
  //#endregion
];

export const groupByCategory = (items: ComponentItem[]) => {
  return items.reduce<Record<string, ComponentItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};
