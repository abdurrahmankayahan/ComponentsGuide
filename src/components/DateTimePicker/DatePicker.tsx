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
  'DD/MM/YYYY',     // 25/12/2025
  'DD.MM.YYYY',     // 25.12.2025
  'YYYY-MM-DD',     // 2025-12-25
  'DD-MM-YYYY',     // 25-12-2025
  'MM/DD/YYYY',     // 12/25/2025
  'YYYY/MM/DD',     // 2025/12/25
  'DD MMM YYYY',    // 25 Ara 2025
  'MMM DD, YYYY',   // Ara 25, 2025
  'YYYY-MM-DDTHH:mm:ssZ', // ISO string
  'YYYY-MM-DDTHH:mm:ss.sssZ', // ISO with milliseconds
];

const DATE_FORMAT = 'DD/MM/YYYY';
const MIN_DATE = dayjs('01/01/1900', DATE_FORMAT);
const MAX_DATE = dayjs('31/12/2100', DATE_FORMAT);

const parseDateValue = (value: Date | string |number| undefined): dayjs.Dayjs => {
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

    console.warn(`Invalid date format: ${value}. Supported formats:`, SUPPORTED_FORMATS);
    return dayjs();
  }


  if (typeof value === 'number') {


    return dayjs(value);
   
  }


  return dayjs();
};

export const DatePickerPropsConfig = {
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
  minDate: {
    require: false,
    value: ' dayjs | string',
  },
  maxDate: {
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

export type DatePickerProps = {
  variant?: 'Line' | 'Slide'; //| 'Card'; //only textinput slide absolutebox  modal
  value?:Date | string|number;
  descriptionText?: string;

  minDate?: ReturnType<typeof dayjs> | string;
  maxDate?: ReturnType<typeof dayjs> | string;

  onChangeSelected?: (value: ReturnType<typeof dayjs> | Date | string) => void;
  onChangeValue?: (value: ReturnType<typeof dayjs> | Date | string) => void;
};

const DatePicker = ({
  variant = 'Slide',
  value,
  descriptionText,
  minDate,
  maxDate,
  onChangeSelected,
  onChangeValue,
}: DatePickerProps) => {
  const { theme } = useTheme();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState('');
  const [selected, setSelected] = useState(() => parseDateValue(value));
  const [prevDate, setPrevDate] = useState(() => parseDateValue(value));

  // Value prop'u değiştiğinde selected'i güncelle
  useEffect(() => {
    const newDate = parseDateValue(value);
    setSelected(newDate);
    setPrevDate(newDate);
  }, [value]);

  const isValid = useRef<ReturnType<typeof isValidDate> | null>(null);

  isValid.current = isValidDate(
    dateText,
    typeof minDate === 'string' ? dayjs(minDate, DATE_FORMAT) : minDate,
    typeof maxDate === 'string' ? dayjs(maxDate, DATE_FORMAT) : maxDate,
  );
  useEffect(() => {
    
    setDateText(selected.format(DATE_FORMAT));
      isValid.current
      ?
    onChangeSelected &&
      onChangeSelected(selected.format(DATE_FORMAT))
      :null;
    
  }, [selected]);

  useEffect(() => {
    isValid.current
      ? onChangeValue &&
        onChangeValue(dayjs(dateText, DATE_FORMAT).format(DATE_FORMAT))
      : null;
  }, [dateText]);

  return (
    <Box style={styles.container}>
      <InputText
        placeHolder={selected.format(DATE_FORMAT)}
        value={dateText}
        onChangeText={val => setDateText(maskDate(val))}
        descriptionText={!isValid.current ? descriptionText || DATE_FORMAT : descriptionText }
        iconLeft={<Icon name="calendar" size={20} color={theme.onBackground} />}
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
        <Box
          style={[styles.dateContainer, { backgroundColor: theme.surface }]}
        >
          <Box flex={1} flexDirection="row">
            <Box style={styles.dtcMonthYearView}>
              <Pressable
                onPress={() => {
                  setSelected(selected.add(-1, 'month'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(-1, 'month'));
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
                <Icon name={'angle-left'} size={20} color={theme.onSurface}/>
              </Pressable>

              <Pressable style={styles.dtcMonthYeartext}>
                <Text align="center">{dayjs.months()[selected.month()]}</Text>
                {/* <Icon name={'caret-down'} size={20} /> */}
              </Pressable>

              <Pressable
                onPress={() => {
                  setSelected(selected.add(1, 'month'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(1, 'month'));
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
                <Icon name={'angle-right'} size={20} color={theme.onSurface}/>
              </Pressable>
            </Box>
            <Divider vertical={true} size="xs" color={theme.primary} />

            <Box style={styles.dtcMonthYearView}>
              <Pressable
                onPress={() => {
                  setSelected(selected.add(-1, 'year'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(-1, 'year'));
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
                <Icon name={'angle-left'} size={20} color={theme.onSurface}/>
              </Pressable>
              <Pressable style={styles.dtcMonthYeartext}>
                <Text>{selected.year()}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelected(selected.add(1, 'year'));
                }}
                onLongPress={() => {
                  timerRef.current = setInterval(
                    () => {
                      setSelected(prev => dayjs(prev).add(1, 'year'));
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
                <Icon name={'angle-right'} size={20} color={theme.onSurface}/>
              </Pressable>
            </Box>
          </Box>
          <Divider size="xs" color={theme.primary} />

          <Box style={styles.grid}>
            {dayjs.weekdaysShort().map(val => (
              <Text
                key={`title-${val}`}
                style={{
                  width: '14.28%', // 7 sütun
                  padding: 4,
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                {val}
              </Text>
            ))}
            <Divider size="xs" color={theme.primary} />

            {generateCalendar(selected).map((day, idx) => {
              const isCurrentMonth = day.month() === selected.month();
              const isSelected = day.isSame(selected, 'day');
              const isToday = day.isSame(dayjs(), 'day');

              return (
                <Pressable
                  key={idx}
                  onPress={() => {
                    // setShow(false);
                    setSelected(day);
                  }}
                  style={{
                    width: '14.28%', // 7 sütun
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: isToday ? 1 : 0,
                    borderColor: theme.primary,
                    backgroundColor: isSelected ? theme.accent : 'transparent',
                    opacity: isCurrentMonth ? 1 : 0.2,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? theme.onAccent : theme.onSurface,
                    }}
                  >
                    {day.date()}
                  </Text>
                </Pressable>
              );
            })}
          </Box>

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
    minWidth:320,
    maxHeight:340,
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
    flexDirection: 'row',
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

export default DatePicker;

const generateCalendar = (date: dayjs.Dayjs) => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');

  const startDate = startOfMonth.startOf('week'); // Pazardan başlatır
  const endDate = endOfMonth.endOf('week');

  const calendar = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate)) {
    calendar.push(current);
    current = current.add(1, 'day');
  }

  return calendar;
};

const maskDate = (input: string) => {
  let v = input.replace(/\D/g, ''); // Sadece rakam
  if (v.length > 8) v = v.slice(0, 8);

  // Gün limit: 01–31
  if (v.length >= 1 && parseInt(v.slice(0, 2)) > 31) v = '31' + v.slice(2);

  // Ay limit: 01–12
  if (v.length >= 3 && parseInt(v.slice(2, 4)) > 12)
    v = v.slice(0, 2) + '12' + v.slice(4);

  if (v.length <= 2) return v;
  if (v.length <= 4) return v.replace(/(\d{2})(\d+)/, '$1/$2');
  return v.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
};

const isValidDate = (text: string, minDate = MIN_DATE, maxDate = MAX_DATE) => {
  if (text.length !== 10) return false;
  const parsed = dayjs(text, DATE_FORMAT, true);

  if (!parsed.isValid()) return false;
  // Aralık kontrolü
  //   const miDate = dayjs('01/01/1900', DATE_FORMAT);
  //   const maDate = dayjs('31/12/2100', DATE_FORMAT);
 
  return parsed.isAfter(minDate) && parsed.isBefore(maxDate);
};

//dorpdown list
//slideNumberCard
//formatText Input
