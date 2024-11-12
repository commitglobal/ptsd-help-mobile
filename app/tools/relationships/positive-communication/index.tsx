import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import React from 'react';
import { Text } from 'tamagui';

const PositiveCommunication = () => {
  const { finishTool } = useToolManagerContext();

  return (
    <ScreenWithImageHeader
      onMainActionButtonPress={() => {
        finishTool();
      }}
      imageUrl="https://plus.unsplash.com/premium_photo-1730988915408-209c1ab59554?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      <Text>Positive Communication</Text>
    </ScreenWithImageHeader>
  );
};

export default PositiveCommunication;
