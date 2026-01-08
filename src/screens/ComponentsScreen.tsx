import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import {
  ComponentItem,
  componentRegistry,
  groupByCategory,
} from '../components/component';
import SlideBox from '../components/Layout/SlideBox';
import Box from '../components/Layout/Box';
import { FlatList } from 'react-native-gesture-handler';
import Button from '../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome6';
import InputText from '../components/InputText/InputText';
import Divider from '../components/Divider/Divider';

const ComponentsScreen = () => {
  const all = useTheme();
  const theme = all.theme;
  const spacing = all.spacing;
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const [searchText, setSearchText] = useState('');
  const [sections, setSections] = useState<
    { title: string; data: ComponentItem[] }[]
  >([]);

  useEffect(() => {
    let filteredComponents = componentRegistry;

    if (searchText.trim()) {
      filteredComponents = componentRegistry.filter(
        component =>
          component.name.toLowerCase().includes(searchText.toLowerCase()) ||
          component.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          component.category.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const grouped = groupByCategory(filteredComponents);

    const section = Object.entries(grouped).map(([title, data]) => ({
      title,
      data: collapsedSections[title] ? data : [],
    }));

    setSections(section);
  }, [searchText, collapsedSections]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <Box style={[styles.container, { padding: spacing.md }]}>
        <InputText
          placeHolder="Search"
          value={searchText}
          onChangeText={setSearchText}
          iconLeft={
            <Icon
              name="magnifying-glass"
              size={30}
              color={theme.onBackground}
            />
          }
          iconRight={
            <Icon
              name={searchText ? 'xmark' : ''}
              size={20}
              color={theme.onBackground}
            />
          }
          rightIconOnPress={() => {
            setSearchText('');
          }}
        />
        <Divider text="Componets" lenght={'35%'} size="sm" />
        <SectionList
          style={[styles.sectionList]}
          sections={sections}
          keyExtractor={item => item.id + item.name}
          renderSectionHeader={
            ({ section }) => {
              const isCollapsed = collapsedSections[section.title];
              return (
                <Box>
                  <Button
                    variant="elevated"
                    shape="round"
                    fullWidth={true}
                    title={section.title}
                    size="sm"
                    iconRight={
                      <Icon
                        name={isCollapsed ? 'angle-up' : 'angle-down'}
                        size={24}
                        color={theme.onSecondary}
                      />
                    }
                    onPress={() =>
                      setCollapsedSections(prev => ({
                        ...prev,
                        [section.title]: !prev[section.title],
                      }))
                    }
                    style={{
                      marginVertical: spacing.xs,
                      backgroundColor: theme.secondary,
                    }}
                  ></Button>
                  {/* <Divider color={theme.secondary} size="xs" /> */}
                </Box>
              );
            }

            // <Text
            //   key={section.title + '_Section'}
            //   style={{
            //     fontSize: 18,
            //     fontWeight: '700',
            //     marginVertical: 12,
            //     backgroundColor: theme.secondary,
            //     color: theme.onSecondary,
            //   }}
            // >
            //   {section.title}
            // </Text>
          }
          renderItem={({ item, index }) => (
            <SlideBox title={item.name}>
              <Box
                key={item.name + '_View'}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: theme.surface,
                  marginBottom: 8,
                }}
              >
                <Box>
                  <Text
                    key={item.name}
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.onSurface,
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    key={item.name + '_description'}
                    style={{
                      fontSize: 13,
                      color: theme.onSurface,
                      opacity: 0.7,
                      marginBottom: 8,
                    }}
                  >
                    {item.description}
                  </Text>
                </Box>

                {/* PREVIEW */}
                <SlideBox title="Preview" isShow={true} textPosition="center">
                  <item.Preview />
                </SlideBox>

                <SlideBox textPosition="center" title="Porps" isShow={false}>
                  {item.getAvailableProps
                    ? Object.entries(item.getAvailableProps).map(
                        ([key, { require, value }]) => (
                          <Box key={item.name + '_ViewCol_' + key}>
                            <Box
                              padding="sm"
                              key={item.name + '_TextView_' + key}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Text
                                key={item.name + '_' + key}
                                style={{
                                  color: theme.onSurface,
                                }}
                              >{`${key} ${require ? '*' : '?'}`}</Text>

                              <Text
                                key={item.name + '_' + key + '_' + value}
                                style={{
                                  color: theme.onSurface,
                                }}
                              >{`${value}`}</Text>
                            </Box>
                            <Divider size="xs" />
                          </Box>
                        ),
                      )
                    : null}
                </SlideBox>
              </Box>
              <Divider size="sm" />
            </SlideBox>
          )}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    overflow: 'scroll',
    flex: 1,
    width: '100%',
  },
});

export default ComponentsScreen;
