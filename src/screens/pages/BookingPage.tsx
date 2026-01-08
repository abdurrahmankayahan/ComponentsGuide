import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import Box from '../../components/Layout/Box';
import { useTheme } from '../../theme/ThemeContext';
import Text from '../../components/Text/Text';
import Divider from '../../components/Divider/Divider';
import Chip, {
  ChipFilterItem,
  ChipGroupItem,
  FilterListItem,
} from '../../components/Button/Chip';
import SlideBox from '../../components/Layout/SlideBox';
import DatePicker from '../../components/DateTimePicker/DatePicker';
import TimePicker from '../../components/DateTimePicker/TimePicker';
import Button from '../../components/Button/Button';
import dayjs from 'dayjs';
import DropDownList, { DropDownListItem } from '../../components/DropDown/DropDownList';
import Icon  from 'react-native-vector-icons/FontAwesome6';

const BookingPage = () => {
  const { theme, spacing } = useTheme();

  // State'ler
  const [selectedDoctor, setSelectedDoctor] = useState<
    FilterListItem | undefined
  >();
  const [selectedDate, setSelectedDate] = useState<
    dayjs.Dayjs | Date | string
  >();
  const [selectedTime, setSelectedTime] = useState<
    dayjs.Dayjs | Date | string
  >();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  // Doktor listesi
  const doctors: DropDownListItem[] = [
    { id:"00", title: 'Dr. Ahmet Yılmaz', icon: <Icon name="user" size={20}/> },
    { id:"01", title: 'Dr. Ayşe Kaya', icon: <Icon name="user" size={20}/> },
    { id:"02", title: 'Dr. Mehmet Demir', icon: <Icon name="user" size={20}/> },
    { id:"03", title: 'Dr. Fatma Çelik', icon: <Icon name="user" size={20}/> },
  ];

  // Randevu saatleri
  const timeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  const handleDoctorSelect = (doctor: FilterListItem | undefined) => {
    setSelectedDoctor(doctor);
  };

  const handleDateSelect = (date: dayjs.Dayjs | Date | string) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTimeSlot) {
      Alert.alert(
        'Randevu Oluşturuldu!',
        `Doktor: ${selectedDoctor.title}\nTarih: ${selectedDate}\nSaat: ${selectedTimeSlot}`,
        [{ text: 'Tamam' }],
      );
    } else {
      Alert.alert('Uyarı', 'Lütfen tüm bilgileri doldurunuz!', [
        { text: 'Tamam' },
      ]);
    }
  };

  return (
    <Box style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={{ flex: 1 }}>
        <Box style={{ padding: spacing.lg }}>
          {/* Başlık */}
          <Box style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
            <Text style={[styles.title, { color: theme.onBackground }]}>
              {'Randevu Al'}
            </Text>
          </Box>


    
              <DropDownList
                onChangeSelected={handleDoctorSelect}
              >
                {doctors.map((doctor, index) => (
                  <DropDownListItem key={"DDItem"+index} item={doctor} />
                ))}
              </DropDownList>
     

          
            <DatePicker
              variant="Slide"
              value={
                selectedDate
                  ? dayjs(selectedDate).format("DD/MM/YYYY")
                  : undefined
              }
              onChangeValue={handleDateSelect}
              descriptionText={dayjs().format("DD/MM/YYYY")+"-"+dayjs().add(29, 'day').format("DD/MM/YYYY")}
              minDate={dayjs().format("DD/MM/YYYY")}
              maxDate={dayjs().add(30, 'day').format("DD/MM/YYYY")}
            />


          {/* Saat Seçimi */}
          <SlideBox title="Saat Seçiniz" isShow={true}>
            <Box
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: spacing.sm,
              }}
            >

                  <Chip
                  key={"saat1"}
                  grupKey='saat'
                  variant="filter"
                  onChangeSelected={(val)=>{
                    handleTimeSlotSelect(val?.title||"")
                  }}
                  shape="round"
                >
              {timeSlots.map((timeSlot, index) => (
              <ChipGroupItem key={"GroupItem"+timeSlot} onPress={()=>
                 //handleTimeSlotSelect(timeSlot)
                 null
              } item={{title:timeSlot}}/>
              ))}
              </Chip>
            </Box>
          </SlideBox>

 

          {/* Seçilen Bilgiler Özeti */}
          {(selectedDoctor || selectedDate || selectedTimeSlot) && (
            <SlideBox title="Seçilen Bilgiler" isShow={true}>
              <Box style={{ gap: spacing.sm }}>
                {selectedDoctor && (
                  <Text style={{ color: theme.onSurface }}>
                    👨‍⚕️ Doktor: {selectedDoctor.title}
                  </Text>
                )}
                {selectedDate && (
                  <Text style={{ color: theme.onSurface }}>
                    📅 Tarih: {selectedDate.toString()}
                  </Text>
                )}
                {selectedTimeSlot && (
                  <Text style={{ color: theme.onSurface }}>
                    🕐 Saat: {selectedTimeSlot}
                  </Text>
                )}
              </Box>
            </SlideBox>
          )}

          {/* Randevu Al Butonu */}
          <Box style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
            <Button
              title="Randevu Al"
              onPress={handleBooking}
              variant="elevated"
              size="lg"
              disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryBox: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default BookingPage;
