import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import Box from '../components/Layout/Box';
import InputText from '../components/InputText/InputText';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PagesItem, pagesRegistry } from './pages/pages';
import Button from '../components/Button/Button';
import { RootStackParamList } from '../navigation/RootStackNavigation';

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

interface PreviewScreenProps {
  navigation: any;
}

const PreviewScreen = ({ navigation }: PreviewScreenProps) => {
  const route = useRoute<PreviewScreenRouteProp>();
  const { pageId, pageName } = route.params;
  const all = useTheme();
  const theme = all.theme;
  const spacing = all.spacing;

  useEffect(() => {
    navigation.setOptions({ title: pageName });

    return () => {};
  }, []);

  const pageItem = pagesRegistry.find(page => page.id === pageId);
  if (!pageItem) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={[styles.container, { padding: spacing.md }]}>
          <Text
            style={{
              color: theme.accent || '#ff0000',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Sayfa bulunamadı: {pageId}
          </Text>
          <Button
            title="Geri Dön"
            onPress={() => navigation.goBack()}
            style={{ marginTop: spacing.md }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Box style={[styles.container, { padding: spacing.md }]}>
        <pageItem.Preview />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PreviewScreen;
