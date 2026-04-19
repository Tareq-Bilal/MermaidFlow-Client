export const TextVariants = {
  display: 'display',
  section: 'section',
  heading: 'heading',
  cardHeading: 'cardHeading',
  subheading: 'subheading',
  bodyLarge: 'bodyLarge',
  body: 'body',
  caption: 'caption',
  small: 'small',
} as const;

export const TextColors = {
  primary: 'primary',
  secondary: 'secondary',
  muted: 'muted',
  accent: 'accent',
} as const;

export const TextAligns = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;

export const TextWeights = {
  regular: 'regular',
  medium: 'medium',
  semibold: 'semibold',
} as const;

export const ButtonVariants = {
  primaryPill: 'primaryPill',
  secondary: 'secondary',
  ghost: 'ghost',
  cta: 'cta',
} as const;

export const CardVariants = {
  default: 'default',
  elevated: 'elevated',
  feature: 'feature',
} as const;

export const ContainerSizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: 'full',
} as const;

export const ImageFits = {
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
  none: 'none',
} as const;

export const ImageShapes = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: 'full',
} as const;

export const GridJustifies = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
} as const;

export const GridAligns = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
} as const;

export const FlexItemGrows = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
} as const;

export const FlexItemShrinks = {
  0: 0,
  1: 1,
} as const;

export const FlexDirections = {
  row: 'row',
  rowReverse: 'rowReverse',
  column: 'column',
  columnReverse: 'columnReverse',
} as const;

export const FlexJustifies = {
  start: 'start',
  end: 'end',
  center: 'center',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
} as const;

export const FlexAligns = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

export const FlexWraps = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  wrapReverse: 'wrapReverse',
} as const;

export const FlexGaps = {
  none: 'none',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
} as const;

export const GridColumns = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
} as const;

export const GridRows = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
} as const;

export const GridGaps = {
  none: 'none',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
} as const;

export type TextVariant = typeof TextVariants[keyof typeof TextVariants];
export type TextColor = typeof TextColors[keyof typeof TextColors];
export type TextAlign = typeof TextAligns[keyof typeof TextAligns];
export type TextWeight = typeof TextWeights[keyof typeof TextWeights];
export type ButtonVariant = typeof ButtonVariants[keyof typeof ButtonVariants];
export type CardVariant = typeof CardVariants[keyof typeof CardVariants];
export type ContainerSize = typeof ContainerSizes[keyof typeof ContainerSizes];
export type ImageFit = typeof ImageFits[keyof typeof ImageFits];
export type ImageShape = typeof ImageShapes[keyof typeof ImageShapes];
export type FlexDirection = typeof FlexDirections[keyof typeof FlexDirections];
export type FlexJustify = typeof FlexJustifies[keyof typeof FlexJustifies];
export type FlexAlign = typeof FlexAligns[keyof typeof FlexAligns];
export type FlexWrap = typeof FlexWraps[keyof typeof FlexWraps];
export type FlexGap = typeof FlexGaps[keyof typeof FlexGaps];
export type GridCols = typeof GridColumns[keyof typeof GridColumns];
export type GridRow = typeof GridRows[keyof typeof GridRows];
export type GridGap = typeof GridGaps[keyof typeof GridGaps];
export type GridJustify = typeof GridJustifies[keyof typeof GridJustifies];
export type GridAlign = typeof GridAligns[keyof typeof GridAligns];
export type FlexItemGrow = typeof FlexItemGrows[keyof typeof FlexItemGrows];
export type FlexItemShrink = typeof FlexItemShrinks[keyof typeof FlexItemShrinks];
export type NavVariant = 'default';