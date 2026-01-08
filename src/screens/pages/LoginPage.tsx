import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Box from '../../components/Layout/Box';
import Button from '../../components/Button/Button';
import InputText from '../../components/InputText/InputText';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Text from '../../components/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackNavigation';
import Divider from '../../components/Divider/Divider';

type PagesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

const LoginPage = () => {
  const navigation = useNavigation<PagesScreenNavigationProp>();
  const { theme, spacing } = useTheme();
  const [user, setUser] = useState('');
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const tmp = setTimeout(() => {
      setLogin(false);
    }, 2000);

    return () => {
      clearTimeout(tmp);
    };
  }, [login]);

  return (
    <Box style={[styles.container, { backgroundColor: theme.background }]}>
      <Box flex={1} justifyContent="center" style={{ padding: spacing.lg }}>
        <Box style={{ paddingVertical: spacing.xl }}>
          <Text style={[styles.title, { color: theme.onBackground }]}>
            {'Giriş Yap'}
          </Text>
        </Box>

        <InputText
          iconLeft={<Icon name="user" size={30} color={theme.onBackground} />}
          placeHolder="Kullanıcı Adı"
          fullWidth={true}
        />

        <InputText
          iconLeft={<Icon name="lock" size={30} color={theme.onBackground} />}
          placeHolder="Şifre"
          isSecure={true}
          fullWidth={true}
        />
        <Button
          title="Şifremi Unuttum"
          variant="text"
          size="xs"
          fullWidth={true}
          onPress={() => {
            navigation.navigate('Preview', {
              pageId: 'change-password-page',
              pageName: 'Change Password Page',
            });
          }}
        />

        <Button
          title={login ? 'Yükleniyor' : 'Giriş Yap'}
          fullWidth={true}
          loading={login}
          loadingPosition="right"
          iconRight={
            <Icon name="right-to-bracket" size={20} color={theme.onPrimary} />
          }
          onPress={() => {
            setLogin(true);
          }}
        />
        <Divider text="OR" size="xs" />
        <Button
          size="xs"
          title="Kayıt Ol"
          variant="text"
          fullWidth={true}
          onPress={() => {
            navigation.navigate('Preview', {
              pageId: 'register-page',
              pageName: 'Register Page',
            });
          }}
        />
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

export default LoginPage;
