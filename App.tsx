import React, { useEffect } from 'react';
import {Navigations} from './src/navigators';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ttsService } from './src/utils';

const _queryClient = new QueryClient();

function App(): React.JSX.Element {
  useEffect(() => {
    // Initialize TTS service when app starts
    ttsService.initialize();
  }, []);

  return (
    <>
      <QueryClientProvider client={_queryClient}>
        <Navigations />
      </QueryClientProvider>
    </>
  );
}

export default App;
