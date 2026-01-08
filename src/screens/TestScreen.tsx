import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SlideBox from '../components/Layout/SlideBox';
import { FlatList } from 'react-native-gesture-handler';
import Box from '../components/Layout/Box';
import InputText from '../components/InputText/InputText';
import Divider from '../components/Divider/Divider';
import IconButton from '../components/Button/IconButton';
import Chip, {
  ChipFilterItem,
  FilterListItem,
} from '../components/Button/Chip';
import DateTimePicker from '../components/DateTimePicker/DatePicker';
import dayjs from 'dayjs';
import TimePicker from '../components/DateTimePicker/TimePicker';
import DropDownList, {
  DropDownListItem,
} from '../components/DropDown/DropDownList';

const TestScreen = () => {
  const theme = useTheme();
  const [val, setVal] = useState('');
  const [date, setDate] = useState<ReturnType<typeof dayjs> | Date | string>(
    '',
  );
  const [selected, setSelected] = useState('');
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <View style={styles.container}>
        <Text>{date.toString()}</Text>
        <DateTimePicker
          variant="Slide"
          descriptionText="Geçersiz tarih girdiniz"
        ></DateTimePicker>
        <Divider vertical={false} size={'xs'} color={theme.theme.primary} />

        <TimePicker variant="Slide" onChangeValue={setDate}></TimePicker>
        <Divider vertical={false} size={'xs'} color={theme.theme.primary} />

        <Box flexDirection="row">
          <Chip
            shape="square"
            title={date?.toString()}

            // iconRight={   <Icon name="circle-exclamation" color={'#911'} size={20} /> }
          ></Chip>
          <Chip
            shape="square"
            title="Araçlar"
            iconLeft={<Icon name="car" color={'#911'} size={20} />}
            // iconRight={   <Icon name="circle-exclamation" color={'#911'} size={20} /> }
          ></Chip>

          <Chip
            onChangeSelected={item => setVal(item ? item.title : '')}
            variant="filter"
            shape="square"
            title="Evler"
            iconLeft={<Icon name="house" color={'#911'} size={20} />}
            // filters={[
            //  { title: 'Evler',icon:<Icon name="house"color={'#911'} size={20}/> },
            //  { title: 'Araçlar',icon:<Icon name="car" color={'#911'} size={20}/> },
            //  { title: 'Arsalar',icon:<Icon name="file" color={'#911'} size={20}/> },
            // ]}
          >
            <ChipFilterItem
              item={{
                title: 'Evler',
                icon: <Icon name="house" color={'#911'} size={20} />,
              }}
            />

            <ChipFilterItem
              item={{
                title: 'Araçlar',
                icon: <Icon name="car" color={'#911'} size={20} />,
              }}
              onPress={() => {
                Alert.alert('aaaa');
              }}
            />
            <ChipFilterItem
              item={{
                title: 'Arsalar',
                icon: <Icon name="file" color={'#911'} size={20} />,
              }}
            />
          </Chip>

          <Chip
            id="asdf"
            variant="input"
            shape="square"
            title="Arsalar"
            iconLeft={<Icon name="file" color={'#911'} size={20} />}
            onRemove={k => Alert.alert('msj', k)}
            // iconRight={   <Icon name="circle-exclamation" color={'#911'} size={20} /> }
          ></Chip>
        </Box>

        <Divider vertical={false} size={'xs'} color={theme.theme.primary} />

        <DropDownList
         onChangeSelected={val=>setSelected(val?.title!)}
          iconLeft={<Icon name="list-ol" size={20} />}
        >
          <DropDownListItem
            item={{
              id: '1',
              icon: <Icon name="1" size={20} />,
              title: 'sssssss',
            }}
          />
          <DropDownListItem
            item={{
              id: '1',

              title: 'absda',
            }}
          />
          <DropDownListItem
            item={{
              id: '1',

              icon: <Icon name="3" size={20} />,
              title: 'keljdenkn',
            }}
          />
        </DropDownList>

        <Divider vertical={false} size={'xs'} color={theme.theme.primary} />

        <Button
          fullWidth={true}
          title="Log"
          onPress={() => {
            Alert.alert(selected || '', val);
          }}
        />

        <IconButton
          size="sm"
          shape="square"
          variant="elevated"
          onPress={() => {
            Alert.alert('Mesaj', 'val');
          }}
          icon={<Icon name="circle-exclamation" color={'#911'} size={24} />}
        />

        <IconButton
          size="md"
          variant="float"
          shape="round"
          onPress={() => {
            Alert.alert('Mesaj', 'val');
          }}
          icon={<Icon name="plus" color={theme.theme.onPrimary} size={32} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TestScreen;
