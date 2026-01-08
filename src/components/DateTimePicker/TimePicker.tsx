import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from '../Layout/Box';
import Text from '../Text/Text';
import InputText from '../InputText/InputText';
import Icon from 'react-native-vector-icons/FontAwesome6';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/tr';
import Divider from '../Divider/Divider';
import { useTheme } from '../../theme/ThemeContext';
import Button from '../Button/Button';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale('tr');

const SUPPORTED_FORMATS = [
  'HH:mm', // 14:30
  'HH:mm:ss', // 14:30:45
  'H:mm', // 2:30
  'h:mm A', // 2:30 PM
  'h:mm a', // 2:30 pm
  'HH:mm A', // 14:30 PM
  'HH:mm a', // 14:30 pm
  'HH.mm', // 14.30
  'H.mm', // 2.30
  'h.mm A', // 2.30 PM
  'h.mm a', // 2.30 pm
];

const TIME_FORMAT = 'HH:mm';
const MIN_TIME = dayjs('00:00', TIME_FORMAT);
const MAX_TIME = dayjs('23:59', TIME_FORMAT);

const parseTimeValue = (
  value: Date | string | number | undefined,
): dayjs.Dayjs => {
  if (!value) return dayjs();

  if (value instanceof Date) {
    return dayjs(value);
  }

  if (typeof value === 'string') {
    for (const format of SUPPORTED_FORMATS) {
      const parsed = dayjs(value, format, true);
      if (parsed.isValid()) {
        return parsed;
      }
    }

    const isoParsed = dayjs(value);
    if (isoParsed.isValid()) {
      return isoParsed;
    }

    console.warn(
      `Invalid time format: ${value}. Supported formats:`,
      SUPPORTED_FORMATS,
    );
    return dayjs();
  }

  if (typeof value === 'number') {
    return dayjs(value);
  }

  return dayjs();
};

export const TimePickerPropsConfig = {
  variant: {
    require: false,
    value: "'Line' | 'Slide' ",
  },
  value: {
    require: false,
    value: 'Date | string',
  },
  descriptionText: {
    require: false,
    value: 'string',
  },
  minTime: {
    require: false,
    value: ' dayjs | string',
  },
  maxTime: {
    require: false,
    value: ' dayjs | string',
  },

  onChangeSelected: {
    require: false,
    value: ' (dayjs|Date|string) => void',
  },
  onChangeValue: {
    require: false,
    value: ' (dayjs|Date|string) => void',
  },
} as const;

export type TimePickerProps = {
  variant?: 'Line' | 'Slide'; //| 'Card'; //only textinput slide absolutebox  modal
  value?: Date | string | number;
  descriptionText?: string;

  minTime?: ReturnType<typeof dayjs> | string;
  maxTime?: ReturnType<typeof dayjs> | string;

  onChangeSelected?: (value: ReturnType<typeof dayjs> | Date | string) => void;
  onChangeValue?: (value: ReturnType<typeof dayjs> | Date | string) => void;
};

const TimePicker = ({
  variant = 'Slide',
  value,
  descriptionText,
  minTime,
  maxTime,
  onChangeSelected,
  onChangeValue,
}: TimePickerProps) => {
  const { theme } = useTheme();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState('');
  const [selected, setSelected] = useState(() => parseTimeValue(value));
  const [prevDate, setPrevDate] = useState(() => parseTimeValue(value));

  // Value prop'u değiştiğinde selected'i güncelle
  useEffect(() => {
    const newDate = parseTimeValue(value);
    setSelected(newDate);
    setPrevDate(newDate);
  }, [value]);

  const isValid = useRef<ReturnType<typeof isValidTime> | null>(null);

  isValid.current = isValidTime(
    dateText,
    typeof minTime === 'string' ? dayjs(minTime, TIME_FORMAT) : minTime,
    typeof maxTime === 'string' ? dayjs(maxTime, TIME_FORMAT) : maxTime,
  );
  useEffect(() => {
    setDateText(selected.format(TIME_FORMAT));
    if (onChangeSelected) {
      onChangeSelected(selected.format(TIME_FORMAT)); // veya formatted string
    }
  }, [selected]);

  useEffect(() => {
    isValid.current
      ? onChangeValue &&
        onChangeValue(dayjs(dateText, TIME_FORMAT).format(TIME_FORMAT))
      : null;
  }, [dateText]);

  return (
    <Box style={styles.container}>
      <InputText
        placeHolder={selected.format(TIME_FORMAT)}
        value={dateText}
        onChangeText={val => setDateText(maskTime(val))}
        descriptionText={
          !isValid.current ? descriptionText || TIME_FORMAT : descriptionText
        }
        iconLeft={<Icon name="clock" size={20} color={theme.onBackground} />}
        iconRight={
          variant === 'Slide' ? (
            <Icon name={show ? 'angle-up' : 'angle-down'} size={20} color={theme.onBackground}/>
          ) : variant === 'Line' ? (
            !isValid.current ? (
              <Icon
                name={'xmark'}
                size={30}
                color={!isValid.current ? 'red' : theme.onBackground}
              />
            ) : null
          ) : null
        }
        rightIconOnPress={() => {
          show ? setSelected(prevDate) : setPrevDate(selected);
          setShow(!show);
        }}
      />

      {show && (
        <Box style={[styles.dateContainer, { backgroundColor: theme.surface }]}>
          <Box flex={1} flexDirection="row">
            <Box style={styles.dtcMonthYearView}>
              <Text style={styles.dtcMonthYeartext}>{'Saat'}</Text>
              <Divider size="xs" color={theme.primary} />

              <Pressable
                onPress={() => {
                  setSelected(selected.add(1, 'hour'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(1, 'hour'));
                    },

                    200,
                  );
                }}
                onPressOut={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }}
              >
                <Icon name={'angle-up'} size={20} />
              </Pressable>

              <Text style={styles.dtcMonthYeartext}>{selected.hour()}</Text>

              <Pressable
                onPress={() => {
                  setSelected(selected.add(-1, 'hour'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(-1, 'hour'));
                    },

                    200,
                  );
                }}
                onPressOut={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }}
              >
                <Icon name={'angle-down'} size={20} />
              </Pressable>
            </Box>
            <Divider vertical={true} size="xs" color={theme.primary} />
            <Box style={styles.dtcMonthYearView}>
              <Text style={styles.dtcMonthYeartext}>{'Dakika'}</Text>
              <Divider size="xs" color={theme.primary} />
              <Pressable
                onPress={() => {
                  setSelected(selected.add(1, 'minutes'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(1, 'minutes'));
                    },

                    100,
                  );
                }}
                onPressOut={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }}
              >
                <Icon name={'angle-up'} size={20} />
              </Pressable>

              <Text style={styles.dtcMonthYeartext}>{selected.minute()}</Text>

              <Pressable
                onPress={() => {
                  setSelected(selected.add(-1, 'minutes'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(-1, 'minutes'));
                    },

                    100,
                  );
                }}
                onPressOut={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }}
              >
                <Icon name={'angle-down'} size={20} />
              </Pressable>
            </Box>
          </Box>
          <Divider size="xs" color={theme.primary} />

          <Box justifyContent="flex-end" flex={1} flexDirection="row">
            <Button
              size="xs"
              variant="text"
              title="İptal"
              onPress={() => {
                setShow(false);
                setSelected(prevDate);
              }}
            />
            <Button
              shape="round"
              size="xs"
              variant="elevated"
              title="Seç"
              onPress={() => {
                setShow(false);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateContainer: {
    width: '90%',
    minWidth: 320,
    maxHeight: 340,
    position: 'absolute',
    top: 45,
    zIndex: 15,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dtcMonthYearView: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  dtcMonthYeartext: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
    marginHorizontal: 12,
  },
});

export default TimePicker;

const maskTime = (input: string) => {
  let v = input.replace(/\D/g, ''); 
  if (v.length > 4) v = v.slice(0, 4);


  if (v.length >= 1 && parseInt(v.slice(0, 2)) > 23) v = '23' + v.slice(2);


  if (v.length >= 3 && parseInt(v.slice(2, 4)) > 59) v = v.slice(0, 2) + '59';

  if (v.length <= 2) return v;
  return v.replace(/(\d{2})(\d+)/, '$1:$2');
};

const isValidTime = (text: string, minTime = MIN_TIME, maxTime = MAX_TIME) => {
  if (text.length !== 5) return false; 
  const parsed = dayjs(text, TIME_FORMAT, true);

  if (!parsed.isValid()) return false;

 
  const hours = parsed.hour();
  const minutes = parsed.minute();

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return false;

  return parsed.isAfter(minTime) && parsed.isBefore(maxTime);
};
