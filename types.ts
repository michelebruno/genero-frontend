import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Flow
 *
 *
 */
export interface Flow extends SanityDocument {
  _type: "flow";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Domini — `array`
   *
   *
   */
  fields?: Array<SanityKeyedReference<Field>>;

  /**
   * Description — `content`
   *
   *
   */
  description?: Content;

  /**
   * Preferito — `boolean`
   *
   *
   */
  favorite?: boolean;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * steps — `array`
   *
   *
   */
  steps?: Array<SanityKeyedReference<Step>>;

  /**
   * Cover — `image`
   *
   *
   */
  coverImg?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Network — `image`
   *
   *
   */
  networkImg?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * inputs — `array`
   *
   *
   */
  inputs?: Array<SanityKeyedReference<Input>>;

  /**
   * topics — `array`
   *
   *
   */
  topics?: Array<SanityKeyedReference<Topic>>;
}

/**
 * Step
 *
 *
 */
export interface Step extends SanityDocument {
  _type: "step";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Titolo breve — `string`
   *
   *
   */
  shortTitle?: string;

  /**
   * Description — `content`
   *
   *
   */
  content?: Content;

  /**
   * Label — `string`
   *
   * Used for optional steps
   */
  label?: string;

  /**
   * layout — `string`
   *
   *
   */
  layout?: "choose" | "text" | "know" | "section" | "options";

  /**
   * theme — `string`
   *
   *
   */
  theme?: "default" | "blue" | "green";

  /**
   * Illustrazione — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Note (interne) — `string`
   *
   *
   */
  note?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * toolsLabel — `string`
   *
   *
   */
  toolsLabel?: string;

  /**
   * tools — `array`
   *
   *
   */
  tools?: Array<SanityKeyed<Tool>>;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Item>>;

  /**
   * options — `array`
   *
   *
   */
  options?: Array<
    SanityKeyed<{
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Content — `content`
       *
       *
       */
      content?: Content;

      /**
       * step — `reference`
       *
       *
       */
      step?: SanityReference<Step>;
    }>
  >;

  /**
   * Requires — `array`
   *
   *
   */
  showIf?: Array<SanityKeyedReference<Item>>;

  /**
   * Nascondi se — `array`
   *
   *
   */
  hiddenIf?: Array<SanityKeyedReference<Item>>;
}

/**
 * item
 *
 *
 */
export interface Item extends SanityDocument {
  _type: "item";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Titolo breve — `string`
   *
   *
   */
  shortTitle?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Raccomandato — `boolean`
   *
   *
   */
  recommended?: boolean;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Content — `content`
   *
   *
   */
  content?: Content;

  /**
   * Requires — `array`
   *
   *
   */
  showIf?: Array<SanityKeyedReference<Item>>;

  /**
   * Nascondi se — `array`
   *
   *
   */
  hiddenIf?: Array<SanityKeyedReference<Item>>;
}

/**
 * Tool
 *
 *
 */
export interface Tool extends SanityDocument {
  _type: "tool";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  shortDescription?: string;

  /**
   * Link — `url`
   *
   *
   */
  link?: string;
}

/**
 * Input
 *
 *
 */
export interface Input extends SanityDocument {
  _type: "input";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;
}

/**
 * Topic
 *
 *
 */
export interface Topic extends SanityDocument {
  _type: "topic";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;
}

/**
 * Dominio
 *
 *
 */
export interface Field extends SanityDocument {
  _type: "field";

  /**
   * title — `string`
   *
   *
   */
  title?: string;
}

/**
 * Glossario
 *
 *
 */
export interface Glossary extends SanityDocument {
  _type: "glossary";

  /**
   * Word — `string`
   *
   *
   */
  word?: string;

  /**
   * Display — `string`
   *
   *
   */
  display?: string;

  /**
   * Descrizione — `content`
   *
   *
   */
  content?: Content;
}

export type Content = Array<SanityKeyed<SanityBlock>>;

export type Documents =
  | Flow
  | Step
  | Item
  | Tool
  | Input
  | Topic
  | Field
  | Glossary;
