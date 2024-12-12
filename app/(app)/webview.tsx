import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';

export default function WebViewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  if (!url) {
    return <Typography>No URL provided</Typography>;
  }

  return (
    <Screen
      headerProps={{
        title: 'External',
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <WebView style={styles.container} source={{ uri: url }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});
