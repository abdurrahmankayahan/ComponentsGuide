import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Box from '../../components/Layout/Box';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import InputText from '../../components/InputText/InputText';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Divider from '../../components/Divider/Divider';

const COUNTER_TIME = 10;

const ChangePasswordPage = () => {
  const { theme, spacing } = useTheme();

  const timer = useRef<ReturnType<typeof setInterval>>(null);

  const [counter, setCounter] = useState(COUNTER_TIME);
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
          {'Şifre Değiştir'}
        </Text>
        <Box style={{ paddingVertical: spacing.sm }}>
          <InputText
            iconLeft={<Icon name="circle-check" size={30} color={theme.onBackground}/>}
            placeHolder="Doğrulama Kodu"
            descriptionText={counter <= 0 ?"Kodu Tekrar Gönder...":counter + ' sn. kaldı.'}
            fullWidth={true}
            {...(counter <= 0 && {
              iconRight: <Icon name="repeat" size={20} color={theme.onBackground}/>,
            })}
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
          />
       
        </Box>
        <Divider size="xs" color={theme.primary} />
        <Box style={{ paddingVertical: spacing.lg }}>
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
            title={'Şifre Değiştir'}
            fullWidth={true}
            loadingPosition="right"
            loading={login}
            onPress={() => {
              clearInterval(timer.current!);
              setLogin(true);
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

export default ChangePasswordPage;
