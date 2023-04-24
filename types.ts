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
   * Description — `string`
   *
   *
   */
  description?: string;

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
   * Description — `content`
   *
   *
   */
  content?: Content;

  /**
   * type — `string`
   *
   *
   */
  type?: "choose" | "text" | "know" | "section" | "options";

  /**
   * Illustrazione — `image`
   *
   *
   */
  Illustrazione?: {
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
       * item — `reference`
       *
       *
       */
      item?: SanityReference<Item>;
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

export type Documents = Flow | Step | Item | Input | Topic | Field | Glossary;
