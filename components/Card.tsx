import React from "react";
import {
  Card as TamaguiCard,
  CardProps as TamaguiCardProps,
  YStack,
} from "tamagui";

interface CardProps extends TamaguiCardProps {
  children: React.ReactNode;
  cardFooter?: React.ReactNode;
}

export const Card = ({ children, cardFooter, ...rest }: CardProps) => {
  return (
    <TamaguiCard
      backgroundColor="white"
      elevation={1}
      shadowColor="black"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={4}
      pressStyle={rest.onPress ? { opacity: 0.6 } : undefined}
      {...rest}
    >
      {children}
      {cardFooter && <YStack marginTop="auto">{cardFooter}</YStack>}
    </TamaguiCard>
  );
};
