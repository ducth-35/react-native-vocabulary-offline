import React, {useEffect} from 'react';
import {Navigations} from './src/navigators';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ttsService} from './src/utils';
import {StatusBar} from 'react-native';

const _queryClient = new QueryClient();

function App(): React.JSX.Element {
  useEffect(() => {
    ttsService.initialize();
  }, []);

  return (
    <>
      <QueryClientProvider client={_queryClient}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Navigations />
      </QueryClientProvider>
    </>
  );
}

export default App;
