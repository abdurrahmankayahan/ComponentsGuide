import React from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { componentRegistry, groupByCategory } from '../components/component';
const ComponentsScreen = () => {
  const theme = useTheme().theme;

  const sections = Object.entries(groupByCategory(componentRegistry)).map(
    ([title, data]) => ({
      title,
      data,
    }),
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <View>
        <SectionList
          style={styles.sectionList}
          sections={sections}
          keyExtractor={item => item.id + item.name}
          renderSectionHeader={({ section }) => (
            <Text
              key={section.title + '_Section'}
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginVertical: 12,
                backgroundColor: theme.secondary,
                color: theme.onSecondary,
              }}
            >
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => (
            <View
              key={item.name + '_View'}
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: theme.surface,
                marginBottom: 8,
              }}
            >
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

              {/* PREVIEW */}
              <item.Preview />

              {item.getAvailableProps
                ? Object.entries(item.getAvailableProps).map(
                    ([key, { require, value }]) => (
                 
                      <View
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
                      </View>
                   
                  ),
                  )
                : null}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    flex: 1,
    width: '100%',
  },
});

export default ComponentsScreen;
