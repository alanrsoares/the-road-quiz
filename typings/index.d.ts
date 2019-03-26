declare module "react-native-really-awesome-button" {
  import { Color } from "csstype";
  import { ReactNode } from "react";
  import { ViewStyle } from "react-native";

  interface Props {
    children: string;

    /**
     * Button activity indicator color
     * @default #FFFFFF
     */
    activityColor?: Color;

    /**
     * Button active state opacity
     * @default 1
     */
    activeOpacity?: number;

    /**
     * Button active state background-color
     * @default #C0C0C0
     */
    backgroundActive?: Color;

    /**
     * Button content background-color
     * @default #FFFFFF
     */
    backgroundColor?: Color;

    /**
     * Button bottom-front-face background-color
     * @default #9F9F9F
     */
    backgroundDarker?: Color;

    /**
     * Button bottom shaddow background-color
     * @default #C0C0C0
     */
    backgroundShadow?: Color;

    /**
     * Button placeholder background-color
     * @default #C0C0C0
     */
    backgroundPlaceholder?: Color;

    /**
     * Button progress bar background-color
     * @default #C0C0C0
     */
    backgroundProgress?: Color;

    /**
     * Button border-color
     * @default null
     */
    borderColor?: Color;

    /**
     * Button border-radius
     * @default 4
     */
    borderRadius?: number;

    /**
     * Button border-width
     * @default 0
     */
    borderWidth?: number;

    /**
     * Button height
     * @default 50
     */
    height?: number;

    /**
     * Setting width to null mirrors an auto behaviour
     * @default null
     */
    width?: number;

    /**
     * Sets the button horizontal padding
     * @default 12
     */
    paddingHorizontal?: number;

    /**
     * Sets the button padding top
     * @default 0
     */
    paddingTop?: number;

    /**
     * Sets the button padding bottom
     * @default 0
     */
    paddingBottom?: number;

    /**
     * When set to true together with width set to null the button fills it's parent component width
     * @default false
     */
    stretch?: boolean;

    /**
     * Button disabled state: cancels animation and onPress func
     * @default false
     */
    disabled?: boolean;

    /**
     * Button 3D raise level
     * @default 4
     */
    raiseLevel?: number;

    /**
     * Renders a custom component inside the button content body
     * @default null
     */
    ExtraContent?: ReactNode;

    /**
     * Button uses spring on the release animation
     * @default true
     */
    springRelease?: boolean;

    /**
     * Button onPress function. It receives a next argument when the progress prop is set to true
     * @default null
     */
    onPress?: (progress?: number) => void;

    /**
     * Number in ms for the maximum progress bar animation time
     * @default 3000
     */
    progressLoadingTime?: number;

    /**
     * Button default label text color
     * @default #FFFFFF
     */
    textColor?: Color;

    /**
     * Button default label text line height
     * @default 20
     */
    textLineHeight?: number;

    /**
     * Button default label text font size
     * @default 16
     */
    textSize?: number;

    /**
     * Button default label text font family
     * @default null
     */
    textFamily?: string;

    /**
     * Button container custom styles
     */
    style?: ViewStyle;
  }

  export default function AwesomeButton(props: Props): JSX.Element;
}
