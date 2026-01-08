import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Box from '../../components/Layout/Box';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import InputText from '../../components/InputText/InputText';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Divider from '../../components/Divider/Divider';
import DatePicker from '../../components/DateTimePicker/DatePicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackNavigation';

const COUNTER_TIME = 10;
type PagesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;
const RegisterPage = () => {
    const navigation = useNavigation<PagesScreenNavigationProp>();
  
  const { theme, spacing } = useTheme();

  const timer = useRef<ReturnType<typeof setInterval>>(null);

  const [counter, setCounter] = useState(0);
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [login, setLogin] = useState(false);
  const isMatched = password === repassword && password.length > 6;

  useEffect(() => {
    const tmp = setTimeout(() => {
      setLogin(false);
    }, 2000);

    return () => {
      clearTimeout(tmp);
    };
  }, [login]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCounter(prev => {
        if (prev <= 0) {
          clearInterval(timer.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer.current!);
  }, []);

  return (
    <Box style={[styles.container, { backgroundColor: theme.background }]}>
      <Box flex={1} justifyContent="center" style={{ padding: spacing.lg }}>
        <Text style={[styles.title, { color: theme.onBackground }]}>
          {'Kayıt Ol'}
        </Text>
        <Box style={{ paddingVertical: spacing.sm }}></Box>
        <Divider size="xs" color={theme.primary} />
        <Box style={{ paddingVertical: spacing.lg }}>
          <InputText
            iconLeft={<Icon name="user" size={30} color={theme.onBackground}/>}
            placeHolder="Kullanıcı Adı"
            fullWidth={true}
          />
          <DatePicker
            variant="Slide"
            descriptionText="Doğum Tarihi (GG/AA/YYYY)"
          />
          <InputText
            iconLeft={<Icon name="phone" size={30} color={theme.onBackground} />}
            iconRight={<Icon name="paper-plane" size={20} color={theme.onBackground}/>}
            rightIconOnPress={() => {
              setCounter(COUNTER_TIME);
              timer.current = setInterval(() => {
                setCounter(prev => {
                  if (prev <= 0) {
                    clearInterval(timer.current!);
                    return 0;
                  }
                  return prev - 1;
                });
              }, 1000);
            }}
            descriptionText="Doğrulama kodu gönderilecek..."
            placeHolder="Telefon no"
            fullWidth={true}
          />

       {counter>0&&
    
         <InputText
            iconLeft={<Icon name="circle-check" size={30} color={theme.onBackground}/>}
            placeHolder="Doğrulama Kodu"
            descriptionText={
              counter <= 0 ? 'Kodu Tekrar Gönder...' : counter + ' sn. kaldı.'
            }
            fullWidth={true}
            {...(counter <= 0 && {
              iconRight: <Icon name="repeat" size={20} />,
            })}

          />}

          <InputText
            iconLeft={<Icon name="lock" size={30} color={theme.onBackground}/>}
            placeHolder="Şifre"
            value={password}
            onChangeText={setPassword}
            isSecure={true}
            fullWidth={true}
          />

          <InputText
            iconLeft={<Icon name="lock" size={30} color={theme.onBackground}/>}
            placeHolder="Şifre Tekrar"
            value={repassword}
            onChangeText={setRePassword}
            isSecure={true}
            fullWidth={true}
            descriptionText={
              password.length > 6
                ? isMatched
                  ? 'Şifreler Aynı'
                  : 'Şifreler Eşleşmiyor (min "6" karakter)'
                : ' (min "6" karakter)'
            }
          />
        </Box>

        <Box style={{ marginTop: spacing.lg }}>
          <Button
            disabled={!isMatched}
            title={'Kayıt Ol'}
            fullWidth={true}
            loadingPosition="right"
            loading={login}
            onPress={() => {
              clearInterval(timer.current!);
              setLogin(true);
            }}
          />
                  <Divider text="OR" size="xs" />
        <Button
          size="xs"
          title="Giriş Yap"
          variant="text"
          fullWidth={true}
          onPress={() => {
            navigation.navigate('Preview', {
              pageId: 'login-page',
              pageName: 'Login Page',
            });
          }}
        />
        </Box>
      </Box>
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
});

export default RegisterPage;
