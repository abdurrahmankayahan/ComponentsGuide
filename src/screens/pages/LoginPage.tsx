import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Box from '../../components/Layout/Box';
import Button from '../../components/Button/Button';
import InputText from '../../components/InputText/InputText';
import Icon from 'react-native-vector-icons/FontAwesome6';

const LoginPage = () => {
  const { theme, spacing } = useTheme();
const [user, setUser] = useState("")
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Box flex={1} justifyContent='center' style={{ padding: spacing.lg }}>
        <Text style={[styles.title, { color: theme.onBackground }]}>
          Giriş Yap
        </Text>

        <Box style={{ marginTop: spacing.lg }}>
          <InputText
            iconLeft={<Icon name="user" size={30} />}
            placeHolder="Kullanıcı Adı"
            fullWidth={true}
          />
        </Box>

        <Box style={{ marginTop: spacing.md }}>
          <InputText
            iconLeft={<Icon name="lock" size={30} />}
            placeHolder="Şifre"
            isSecure={true}
            fullWidth={true}
          />
        </Box>

        <Box style={{ marginTop: spacing.lg }}>
          <Button
            title={login?"Yükleniyor":"Giriş Yap"}
            fullWidth={true}
            loading={login}
            loadingPosition='left'
            onPress={() => {
              setLogin(true);
            }}
          />
        </Box>

        <Box style={{ marginTop: spacing.md }}>
          <Button  title="Şifremi Unuttum" variant="text" fullWidth={true} />
        </Box>
      </Box>
    </View>
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
