import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { generateTheme } from '../utils/color';
import { useTheme } from '../theme/ThemeContext';
import { darkTheme, lightTheme, Theme, themeUsageGuide } from '../theme/themes';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Box from '../components/Layout/Box';
import SlideBox from '../components/Layout/SlideBox';

interface Palette {
  base: string;
  light: string;
  dark: string;
  accent: string;
  complementary: string;
}

const ColorScreen = () => {
  const [baseColor, setBaseColor] = useState('#ff0000');
  const [palette, setPalette] = useState<Palette | null>(null);
  const [lightTheme, setLightTheme] = useState<Theme | null>(null);
  const [darkTheme, setDarkTheme] = useState<Theme | null>(null);
  const [toggleTheme, setToggleTheme] = useState(false);

  const { theme, setCustomTheme } = useTheme();

  const handleColorChangeComplete = (color: string) => {
    setBaseColor(color);
    setPalette(generateTheme(color).palette);
    setLightTheme(generateTheme(color).light);
    setDarkTheme(generateTheme(color).dark);
  };

  const updatePaletteColor = (key: keyof Theme, value: string) => {
    // if (palette) {
    //   setPalette({ ...palette, [key]: value });
    // }

    // if (lightTheme) {
    //   setLightTheme({ ...lightTheme, [key]: value });
    // }

    toggleTheme
      ? lightTheme
        ? setLightTheme({ ...lightTheme, [key]: value })
        : null
      : darkTheme
      ? setDarkTheme({ ...darkTheme, [key]: value })
      : null;
  };

  const applyToTheme = () => {
    if (!palette) return;

    const customTheme: Theme = toggleTheme ? lightTheme! : darkTheme!;

    setCustomTheme(customTheme, toggleTheme ? 'ligth' : 'dark');
    Alert.alert('Başarılı', 'Renk paleti tema olarak uygulandı!');
  };
  const formatUsageText = (key: keyof typeof themeUsageGuide) => {
    const item = themeUsageGuide[key];

    if (!item) return 'Bilgi bulunamadı';

    return (
      `${item.description}\n\n` +
      `Kullanım Alanları:\n` +
      `-----------------------\n` +
      item.usage.map(u => `• ${u}`).join('\n')
    );
  };

  const renderColorBox = (color: string, label: string, key: keyof Theme) => (
    <TouchableOpacity
      key={label}
      onLongPress={() => {
        Alert.alert(label, formatUsageText(key));
      }}
    >
      <View key={label} style={styles.colorItem}>
        <View style={[styles.colorBox, { backgroundColor: color }]} />
        <Text style={styles.colorText}>{label}</Text>
        <TextInput
          style={styles.colorInput}
          value={color}
          onChangeText={value => updatePaletteColor(key, value)}
          placeholder="#000000"
          maxLength={7}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView>
        <Text style={[styles.title, { color: theme.onBackground }]}>
          Color Palette Generator
        </Text>
        <SlideBox
        isShow={true}
          textPosition="center"
          title={'Selected Color: ' + baseColor.toUpperCase()}
        >
          <Box
            style={[styles.pickerContainer, { backgroundColor: theme.surface }]}
          >
            <ColorPicker
              color={baseColor}
              onColorChange={setBaseColor}
              onColorChangeComplete={handleColorChangeComplete}
              thumbSize={40}
              sliderSize={30}
              noSnap={true}
              row={false}
              swatches={true}
            />
          </Box>
        </SlideBox>
        <SlideBox
        isShow={true}
        textPosition='center'
        title={  "Genereted Colors "}
        >
          {(toggleTheme ? lightTheme : darkTheme) && (
            <Box
              style={[
                styles.paletteContainer,
                { backgroundColor: theme.surface },
              ]}
            >
              <Box
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  margin: 4,
                  marginBottom: 20,
                  padding: 4,
                  backgroundColor: theme.background,
                }}
              >
                <Text
                  style={[styles.paletteTitle, { flex:1, color: theme.onBackground }]}
                >
                 {toggleTheme ? '(Light)' : '(Dark)'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setToggleTheme(!toggleTheme);
                  }}
                >
                  <Icon
                    name={toggleTheme ? 'moon' : 'sun'}
                    size={24}
                    color={theme.onBackground}
                  />
                </TouchableOpacity>
              </Box>

              <Box style={styles.paletteGrid}>
                {Object.entries(toggleTheme ? lightTheme! : darkTheme!).map(
                  ([key, color]) =>
                    renderColorBox(
                      color,
                      key.charAt(0).toUpperCase() + key.slice(1),
                      key as keyof Theme,
                    ),
                )}
              </Box>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: '#888',
                }}
                onPress={applyToTheme}
              >
                <Text>{'Uygula'}</Text>
              </TouchableOpacity>
            </Box>
          )}
        </SlideBox>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedColorText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  paletteContainer: {
    backgroundColor: '#fff',
    margin: 4,
    padding: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paletteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  colorItem: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 6,
    alignItems: 'center',
    marginBottom: 20,
    minWidth: '30%',
  },
  colorBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  colorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  colorHex: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  colorInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 4,
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
    width: 70,
    marginTop: 4,
  },
});

export default ColorScreen;
