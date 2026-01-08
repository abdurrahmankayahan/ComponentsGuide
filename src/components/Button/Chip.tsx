import React, {
  Children,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from '../Layout/Box';
import Text from '../Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../theme/ThemeContext';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';
export type ChipShape = 'round' | 'square';

export type FilterListItem = {
  title: string;
  icon?: ReactNode;
};

export const ChipButtonPropsConfig = {
  id: {
    require: false,
    value: 'string',
  },
  grupKey: {
    require: false,
    value: 'string',
  },
  multiselected: {
    require: false,
    value: 'boolean',
  },
  variant: {
    require: false,
    value: 'ChipVariant',
  },
  shape: {
    require: false,
    value: 'ChipShape',
  },
  title: {
    require: false,
    value: 'string',
  },
  iconLeft: {
    require: false,
    value: 'ReactNode',
  },
  iconRight: {
    require: false,
    value: 'ReactNode',
  },
  onPress: {
    require: false,
    value: '() => void',
  },
  onRemove: {
    require: false,
    value: '(key: string) => void',
  },
  onChangeSelected: {
    require: false,
    value: '(key: FilterListItem | undefined) => void',
  },
  children: {
    require: false,
    value:
      'ReactElement<ChipFilterItemProp> | ReactElement<ChipFilterItemProp>[]',
  },
} as const;

export type ChipButtonProps = {
  id?: string;
  grupKey?: string;
  multiselected?: boolean;
  variant?: ChipVariant;
  shape?: ChipShape;
  title?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onPress?: () => void;
  onRemove?: (key: string) => void;
  onChangeSelected?: (key: FilterListItem | undefined) => void;
  children?:
    | ReactElement<ChipFilterItemProp>
    | ReactElement<ChipFilterItemProp>[];
};

const Chip = ({
  id,
  grupKey,
  multiselected,
  //filters,
  variant = 'assist',
  shape = 'square',
  title,
  iconLeft,
  iconRight,
  onPress,
  onRemove,

  onChangeSelected,
  children,
}: ChipButtonProps) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FilterListItem | null>(null);
 


  const handleSelect = (value: FilterListItem) => {
    if (selectedItem && selectedItem.title === value.title) {
      // Aynı item tekrar seçildi, seçimi kaldır

      setSelectedItem(null);
      setSelected(false);
      onChangeSelected && onChangeSelected(undefined);
    } else {
      // Farklı item seçildi

      setSelectedItem(value);
      setSelected(true);
      onChangeSelected && onChangeSelected(value);
    }
    setShow(false);
  };

  //   const handleRemove = (key: string) => {
  //   setSelectedFilters(prev =>
  //     prev.filter(item => item.key !== key)
  //   );
  // };

  return grupKey ? (
    <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {React.Children.map(children, child => (
        <ChipGroupItem
          key={child?.props.item?.title}
          item={child?.props.item!}
          isSelected={selectedItem?.title === child?.props.item?.title}
          onPress={() => {
            child?.props.onPress && child.props.onPress();
            handleSelect(child?.props.item!);
          }}
        />
      ))}
    </Box>
  ) : (
    <Pressable
      style={[
        styles.container,
        {
          zIndex: show ? 999 : 1,
          borderRadius: shape === 'round' ? 100 : styles.container.borderRadius,
          backgroundColor: selected
            ? theme.primary.toString() + '55'
            : undefined,
        },
      ]}
      onPress={() =>
        onPress
          ? onPress()
          : variant === 'filter'
          ? selected
            ? (() => {
                setSelected(false);
                onChangeSelected && onChangeSelected(undefined);
              })()
            : (() => {
                setSelected(true);
                onChangeSelected &&
                  onChangeSelected(
                    selectedItem || { title: title || '', icon: iconLeft },
                  );
              })()
          : null
      }
    >
      {variant === 'filter' ? (
        selected ? (
          <Box style={styles.iconLeftContainer}>
            <Icon name="check" size={20} color={theme.accent} />
          </Box>
        ) : (
          (selectedItem?.icon || iconLeft) && (
            <Box style={styles.iconLeftContainer}>
              {selectedItem?.icon || iconLeft}
            </Box>
          )
        )
      ) : (
        (selectedItem?.icon || iconLeft) && (
          <Box style={styles.iconLeftContainer}>
            {selectedItem?.icon || iconLeft}
          </Box>
        )
      )}

      <Text style={styles.text}>{selectedItem?.title || title || 'Empty'}</Text>

      {variant === 'filter' ? (
        !grupKey &&
        children && (
          <Box style={styles.iconRightContainer}>
            {
              <Pressable
                onPress={e => {
                  e.stopPropagation();
                  setShow(!show);
                }}
              >
                <Icon
                  name={show ? 'angle-up' : 'angle-down'}
                  size={16}
                  color={theme.onBackground}
                />
              </Pressable>
            }
          </Box>
        )
      ) : variant === 'input' ? (
        <Box style={styles.iconRightContainer}>
          {
            <Pressable
              onPress={e => {
                e.stopPropagation();
                onRemove && onRemove(id!);
              }}
            >
              <Icon name={'xmark'} size={16} color={theme.onBackground} />
            </Pressable>
          }
        </Box>
      ) : (
        iconRight && <Box style={styles.iconRightContainer}>{iconRight}</Box>
      )}

      {show && (
        <Box
          style={[styles.filterContainer, { backgroundColor: theme.surface }]}
        >
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
    </Pressable>
  );
};

interface ChipFilterItemProp {
isSelected?: boolean 
  item: FilterListItem;
  onPress?: () => void;
}


export const ChipFilterItem = ({ item, onPress }: ChipFilterItemProp) => {
  return (
    <Pressable onPress={onPress}>
      <Box style={styles.filterItem} flexDirection="row">
        {item.icon && <Box style={styles.iconLeftContainer}>{item.icon}</Box>}
        <Text style={styles.text}>{item.title}</Text>
      </Box>
    </Pressable>
  );
};
export const ChipGroupItem = ({ item, onPress, isSelected }: ChipFilterItemProp) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Box style={[styles.groupItem, isSelected ? { backgroundColor: theme.primary.toString() + '55' } : {}]} flexDirection="row">
        {isSelected ? (
          <></>
          // <Box style={[styles.iconLeftContainer,]}>
          //   <Icon name="check" size={20} color={theme.accent} />
          // </Box>
        ) : (
          item.icon && <Box style={styles.iconLeftContainer}>{item.icon}</Box>
        )}
        <Text style={styles.text}>{item.title}</Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 2,
    alignSelf: 'center',
    alignItems: 'center',
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

  filterContainer: {
    borderWidth: 1,
    position: 'absolute',

    zIndex: 999, // iOS
    elevation: 999, //android

    padding: 8,
    borderRadius: 8,
    top: 35,
    backgroundColor: '#999',
  },
  filterItem: {
    borderWidth: 1,
    padding: 4,
    margin: 2,
    flex: 1,
    borderRadius: 8,
  },
    groupItem: {
    minWidth:"23%",
    justifyContent:"center",
    borderWidth: 1,
    padding: 4,
    margin: 2,
    flex: 1,
    borderRadius: 8,
  },
});

export default Chip;
