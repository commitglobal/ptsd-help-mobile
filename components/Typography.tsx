import { SizableText } from "tamagui";

type TypographyProps = {
  preset?: "default" | "heading" | "subheading" | "helper";
  children: React.ReactNode;
} & React.ComponentProps<typeof SizableText>;

export const Typography = ({
  preset = "default",
  children,
  ...props
}: TypographyProps) => {
  const presetStyles = {
    default: {
      fontSize: 16,
      lineHeight: 24,
    },
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      lineHeight: 32,
    },
    subheading: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 26,
    },
    helper: {
      fontSize: 14,
      color: "$gray11",
      lineHeight: 20,
    },
  };

  return (
    <SizableText {...presetStyles[preset]} {...props}>
      {children}
    </SizableText>
  );
};
