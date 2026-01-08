import React from 'react';

import { Button, ButtonPropsConfig } from './Button/Button';
import Text, { TextPorpsConfig, TextProps } from './Text/Text';
import { UserInterfaceStyle } from 'react-native-screens';
import Box, { BoxProps, BoxPropsConfig } from './Layout/Box';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, Spacing } from '../theme/themes';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SlideBox, { SlideBoxPropsConfig } from './Layout/SlideBox';
import FloatTabbar from './Tabbars/FloatTabbar/FloatTabbar';
import InputText, { InputTextPropsConfig } from './InputText/InputText';
import Divider, { DividerPropsConfig } from './Divider/Divider';
import IconButton, { IconButtonPropsConfig } from './Button/IconButton';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { EdgeInsets } from 'react-native-safe-area-context';
import FloatButtonTabbar from './Tabbars/FloatButtonTabbar/FloatButtonTabbar';
import DatePicker, { DatePickerPropsConfig } from './DateTimePicker/DatePicker';
import Chip, { ChipButtonPropsConfig, ChipFilterItem } from './Button/Chip';
import TimePicker, { TimePickerPropsConfig } from './DateTimePicker/TimePicker';

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
  | 'Feedback'
  | 'Tabbars';

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
        <SlideBox title="Text">
          <Divider text="OR" textPosition="left" size={'md'} />
          <Divider text="OR" size={'md'} />
          <Divider text="OR" textPosition="right" size={'md'} />
        </SlideBox>
        <SlideBox title="Shape">
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
  {
    id: 'button-Icon',
    name: 'Icon Button',
    description: 'iconlu ve ekran üzerinde durabilen aksiyon buttonu',
    category: 'Buttons',

    getAvailableProps: IconButtonPropsConfig,
    Preview: () => (
      <Box>
        <SlideBox title="Size">
          <IconButton
            variant="filled"
            size="xs"
            icon={<Icon name="plus" size={20} />}
            onPress={() => {}}
          />

          <IconButton
            variant="filled"
            size="sm"
            icon={<Icon name="plus" size={24} />}
            onPress={() => {}}
          />
          <IconButton
            variant="filled"
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant="filled"
            size="lg"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant="filled"
            size="xl"
            icon={<Icon name="plus" size={40} />}
            onPress={() => {}}
          />
        </SlideBox>
        <SlideBox title="Variant">
          <IconButton
            variant={'elevated'}
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant="filled"
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant="tonal"
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant="outlined"
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />

          <IconButton
            variant="float"
            size="md"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
        </SlideBox>
        <SlideBox title="Shape">
          <IconButton
            variant={'elevated'}
            size="md"
            shape="round"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant={'elevated'}
            size="md"
            shape="square"
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
        </SlideBox>
        <SlideBox title="Others">
          <IconButton
            variant={'elevated'}
            size="md"
            shape="round"
            width={40}
            height={50}
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
          <IconButton
            variant={'elevated'}
            size="md"
            shape="round"
            width={50}
            height={40}
            icon={<Icon name="plus" size={32} />}
            onPress={() => {}}
          />
        </SlideBox>
      </Box>
    ),
  },

  {
    id: 'button-Chips',
    name: 'Chips Buttons',
    description:
      'Chips buttonlar bilgiverme seçim yapma filtreleme aksiyonlarını barındırır',
    category: 'Buttons',

    getAvailableProps: ChipButtonPropsConfig,
    Preview: () => (
      <Box>
        <SlideBox title="Variant">
          <Chip variant={'assist'} title="Assist" onPress={() => {}} />

          <Chip variant="filter" title="Filter" />
          <Chip
            variant="filter"
            shape="square"
            title="Evler"
            iconLeft={<Icon name="house" color={'#911'} size={20} />}
          >
            <ChipFilterItem
              item={{
                title: 'Filter1',
                icon: <Icon name="house" color={'#911'} size={20} />,
              }}
            />

            <ChipFilterItem
              item={{
                title: 'Filter2',
                icon: <Icon name="car" color={'#911'} size={20} />,
              }}
              onPress={() => {}}
            />
            <ChipFilterItem
              item={{
                title: 'Filter3',
                icon: <Icon name="file" color={'#911'} size={20} />,
              }}
            />
          </Chip>

          <Chip variant={'input'} title="Input" onPress={() => {}} />
          <Chip variant={'suggestion'} title="Suggestion" onPress={() => {}} />
        </SlideBox>
        <SlideBox title="Shape">
          <Chip shape="round" onPress={() => {}} />
          <Chip shape="square" onPress={() => {}} />
        </SlideBox>

        <SlideBox title="Others">
          <Chip
            iconLeft={<Icon name="house" size={20} />}
            variant={'assist'}
            title="Ev"
            onPress={() => {}}
          />
          <Chip
            iconRight={<Icon name="house" size={20} />}
            variant={'assist'}
            title="Ev"
            onPress={() => {}}
          />
          <Chip
            iconLeft={<Icon name="arrow-up" size={20} />}
            iconRight={<Icon name="arrow-down" size={20} />}
            variant={'assist'}
            title="OK"
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
  {
    id: 'Input-date-basic',
    name: 'Input Date',
    description: 'Kullanıcıdan Tarih alın',
    category: 'Inputs',
    getAvailableProps: DatePickerPropsConfig,
    Preview: () => (
      <Box>
        <DatePicker value="2025-12-25" variant="Line" />

        <DatePicker variant="Slide" />

        <DatePicker
          descriptionText="Buraya Not Ekleyebilirsin"
          variant="Line"
        />
      </Box>
    ),
  },
  {
    id: 'Input-time-basic',
    name: 'Input Time',
    description: 'Kullanıcıdan Saat alın',
    category: 'Inputs',
    getAvailableProps: TimePickerPropsConfig,
    Preview: () => (
      <Box>
        <TimePicker value="19:30" variant="Line" />

        <TimePicker variant="Slide" />

        <TimePicker
          descriptionText="Buraya Not Ekleyebilirsin"
          variant="Line"
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

  // //#region Tabbars

  // {
  //   id: 'tabbar-float',
  //   name: 'Tabbar Float',
  //   description: 'Tabbar Sabit buttonlu ada şeklinde görünüm',
  //   category: 'Tabbars',
  //   getAvailableProps: undefined,
  //   Preview: () => (
  //     <Box height={100}>

  //     <FloatTabbar
  //       insets={mockInsets}
  //       state={mockState}
  //       descriptors={mockDescriptors}
  //       navigation={mockNavigation}
  //       />
  //       </Box>
  //   ),
  // },
  //   {
  //   id: 'tabbar-float-Button',
  //   name: 'Tabbar Float Center Button',
  //   description: 'Orta yüzer buttonlu standart görünüm',
  //   category: 'Tabbars',
  //   getAvailableProps: undefined,
  //   Preview: () => (
  //     <Box height={100}>

  //     <FloatButtonTabbar
  //       insets={mockInsets}
  //       state={mockState}
  //       descriptors={mockDescriptors}
  //       navigation={mockNavigation}
  //       />
  //       </Box>
  //   ),
  // },

  // //#endregion
];

export const groupByCategory = (items: ComponentItem[]) => {
  return items.reduce<Record<string, ComponentItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

// const mockInsets: EdgeInsets = {
//   top: 0,
//   bottom: 20,
//   left: 0,
//   right: 0,
// };

// export const mockState: TabNavigationState<ParamListBase> = {
//   stale: false,
//   type: 'tab',
//   key: 'tab-nav',
//   routeNames: ['Home', 'Search', 'Profile'],
//   index: 0,
//   history: [{ type: 'route', key: 'home-key' }],
//   routes: [
//     { key: 'home-key', name: 'Home' },
//     { key: 'search-key', name: 'Search' },
//     { key: 'profile-key', name: 'Profile' },
//   ],
//   preloadedRouteKeys: [], // ❗️ Yeni zorunlu alan
// };

// export const mockDescriptors: any = {
//   'home-key': {
//     options: {
//       tabBarIcon: ({ focused, size, color }: any) => (
//         <Icon name="house" size={size} color={color} />
//       ),
//       tabBarLabel: 'Home',
//     },
//   },
//   'search-key': {
//     options: {
//       tabBarIcon: ({ focused, size, color }: any) => (
//         <Icon name="magnifying-glass" size={size} color={color} />
//       ),
//       tabBarLabel: 'Search',
//     },
//   },
//   'profile-key': {
//     options: {
//       tabBarIcon: ({ focused, size, color }: any) => (
//         <Icon name="user" size={size} color={color} />
//       ),
//       tabBarLabel: 'Profile',
//     },
//   },
// };

// export const mockNavigation: NavigationHelpers<ParamListBase> = {
//   navigate: () => console.log('navigate mock'),
//   dispatch: () => console.log('dispatch mock'),
//   goBack: () => console.log('back mock'),
//   reset: () => {},
//   // diğer zorunlu olmayanlar boş bırakılabilir
// } as any;
