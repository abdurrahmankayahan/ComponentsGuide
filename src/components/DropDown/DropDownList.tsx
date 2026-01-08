import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from '../Layout/Box';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../theme/ThemeContext';
import Text from '../Text/Text';
import InputText from '../InputText/InputText';

export type DropDownListItem = {
  id: string;
  title: string;
  icon?: ReactNode;
};

export type DropDownProps = {
  id?: string;
  grupKey?: string;
  multiselected?: boolean;
  title?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onPress?: () => void;
  onRemove?: (key: string) => void;
  onChangeSelected?: (key: DropDownListItem | undefined) => void;
  children?: ReactElement<DropDownItemProp> | ReactElement<DropDownItemProp>[];
};

const DropDownList = ({
  id,
  title,
  iconLeft,
  iconRight,
  onPress,
  onRemove,

  onChangeSelected,
  children,
}: DropDownProps) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownListItem|undefined>({
    id: id!,
    title: title!,
    icon: iconLeft,
  });

  useEffect(() => {
if(!selected)
{

    setSelectedItem({
      id: id!,
      title: title!,
      icon: iconLeft,
    });
}
  

  }, [title, iconLeft,selected]);

  const handleSelect = (value: DropDownListItem) => {

    setSelectedItem(value);
    onChangeSelected && onChangeSelected(value?.title!=""?value:undefined);
    setSelected(true);
    setShow(false);

  };

  return (
    <Box
      style={[
        styles.container,
        {
          zIndex: show ? 999 : 1,
        },
      ]}
    >
      <InputText
      placeHolder='Seçiniz...'
        value={selectedItem!.title || ''}
        iconLeft={
          iconLeft&&selectedItem?.icon && (
            <Box style={styles.iconLeftContainer}>{selectedItem!.icon}</Box>
          )
        }
        iconRight={
          <Icon
            name={show ? 'angle-up' : 'angle-down'}
            size={16}
            color={theme.onBackground}
          />
        }
        rightIconOnPress={() => {
          setShow(!show);
        }}
      />

      {show && (
        <Box
          style={[styles.dropDownContainer, { backgroundColor: theme.surface }]}
        >
          <DropDownListItem
            item={{
              id: '-1',
              title: 'Seçiniz..',
              icon: iconLeft,
            }}
            onPress={() =>
              handleSelect({
                id: '-1',
                title: '',
                icon: iconLeft,
              })
            }
          />
          {React.Children.map(children, child =>
            React.cloneElement(child!, {
              onPress: () => {
                child?.props.onPress && child.props.onPress(),
                  handleSelect(child?.props.item!);
              },
            }),
          )}

          {/* {children} */}

          {/* {filters?.map((item,index) => (
            <ChipFilterItem
            key={"filterItem"+index+ new Date().toISOString}
              item={item}
              onPress={() => {
                setSelected(item);
                setShow(!show)
              }}
            />
          ))} */}
        </Box>
      )}
    </Box>
  );
};

interface DropDownItemProp {
  item: DropDownListItem;
  onPress?: () => void;
}

export const DropDownListItem = ({ item, onPress }: DropDownItemProp) => {
  return (
    <Pressable onPress={onPress}>
      <Box style={styles.dropDownItem} flexDirection="row">
        {item.icon && <Box style={styles.iconLeftContainer}>{item.icon}</Box>}
        <Text style={styles.text}>{item.title}</Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    justifyContent: 'center',
  },
  iconLeftContainer: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRightContainer: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 8,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  dropDownContainer: {
    borderWidth: 1,
    position: 'absolute',
    width: '90%',
    zIndex: 999, // iOS
    elevation: 999, //android

    padding: 8,
    borderRadius: 8,
    top: 45,
    right: '5%',
    backgroundColor: '#999',
  },
  dropDownItem: {
    borderWidth: 1,
    padding: 4,
    margin: 4,
    flex: 1,
    borderRadius: 8,
  },
});

export default DropDownList;
