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
   * Description — `string`
   *
   *
   */
  description?: string;

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
  type?: "choose" | "text" | "know";

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

export type Content = Array<SanityKeyed<SanityBlock>>;

export type Documents = Input | Topic | Item | Flow | Step | Field;
