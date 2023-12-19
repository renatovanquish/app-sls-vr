/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email?: string | null,
  phone?: string | null,
  status?: UserStatus | null,
  active?: boolean | null,
  avatar?: string | null,
  search?: string | null,
  createdAt?: string | null,
  profile?: Profile | null,
  groups?: ModelGroupUserConnection | null,
  logs?: ModelLogConnection | null,
  addresses?: ModelAddressConnection | null,
  payMethods?: ModelPayMethodConnection | null,
  relationsLink?: ModelRelationLinkConnection | null,
  carts?: ModelCartConnection | null,
  ordersByCreatedAt?: ModelOrderConnection | null,
  ordersByStatusCreatedAt?: ModelOrderConnection | null,
  updatedAt: string,
};

export enum UserStatus {
  DEFAULT = "DEFAULT",
  PREREGISTER = "PREREGISTER",
  SUSPENDED = "SUSPENDED",
  ACTIVE = "ACTIVE",
}


export type Profile = {
  __typename: "Profile",
  userID: string,
  user?: User | null,
  doc?: string | null,
  docType?: DocTypes | null,
  docProfession?: string | null,
  profession?: string | null,
  specialties?: string | null,
  subSpecialties?: string | null,
  bio?: string | null,
  gender?: GenderOptions | null,
  birth?: string | null,
  birthDay?: string | null,
  notes?: string | null,
  urlUserName?: string | null,
  urlEnable?: boolean | null,
  allowViewEmail?: boolean | null,
  allowViewPhone?: boolean | null,
  allowCookiesPreference?: boolean | null,
  allowCookiesStatistic?: boolean | null,
  pix?: string | null,
  zipCodeCoverage?: Array< string | null > | null,
  schedulesSunday?: Array< string | null > | null,
  schedulesMonday?: Array< string | null > | null,
  schedulesTuesday?: Array< string | null > | null,
  schedulesWednesday?: Array< string | null > | null,
  schedulesThursday?: Array< string | null > | null,
  schedulesFriday?: Array< string | null > | null,
  schedulesSaturday?: Array< string | null > | null,
  customerPagarmeID?: string | null,
  uuid?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum DocTypes {
  CPF = "CPF",
  CNPJ = "CNPJ",
  PASSPORT = "PASSPORT",
}


export enum GenderOptions {
  M = "M",
  F = "F",
  UNKNOWN = "UNKNOWN",
}


export type ModelGroupUserConnection = {
  __typename: "ModelGroupUserConnection",
  items:  Array<GroupUser | null >,
  nextToken?: string | null,
};

export type GroupUser = {
  __typename: "GroupUser",
  id: string,
  group: string,
  userID: string,
  user?: User | null,
  profileID: string,
  profile?: Profile | null,
  createdAt?: string | null,
  updatedAt: string,
};

export type ModelLogConnection = {
  __typename: "ModelLogConnection",
  items:  Array<Log | null >,
  nextToken?: string | null,
};

export type Log = {
  __typename: "Log",
  id: string,
  userID: string,
  tag: string,
  source: LogSource,
  notes?: string | null,
  message?: string | null,
  page?: string | null,
  manufacturer?: string | null,
  model?: string | null,
  osName?: string | null,
  osVersion?: string | null,
  platform?: string | null,
  uuid?: string | null,
  ip?: string | null,
  city?: string | null,
  region?: string | null,
  country?: string | null,
  provider?: string | null,
  lat?: number | null,
  lng?: number | null,
  createdAt?: string | null,
  user?: User | null,
  updatedAt: string,
};

export enum LogSource {
  APP = "APP",
}


export type ModelAddressConnection = {
  __typename: "ModelAddressConnection",
  items:  Array<Address | null >,
  nextToken?: string | null,
};

export type Address = {
  __typename: "Address",
  id: string,
  userID: string,
  name?: string | null,
  reference?: string | null,
  street?: string | null,
  number?: string | null,
  complement?: string | null,
  zipcode?: string | null,
  neighborhood?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  addressPagarmeID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPayMethodConnection = {
  __typename: "ModelPayMethodConnection",
  items:  Array<PayMethod | null >,
  nextToken?: string | null,
};

export type PayMethod = {
  __typename: "PayMethod",
  id: string,
  userID: string,
  method: PaymentMethods,
  number?: string | null,
  holderName?: string | null,
  holderDocument?: string | null,
  expMonth?: number | null,
  expYear?: number | null,
  cvv?: string | null,
  brand?: string | null,
  label?: string | null,
  cardPagarmeID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum PaymentMethods {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
  PIX = "PIX",
  ONDELIVERY = "ONDELIVERY",
}


export type ModelRelationLinkConnection = {
  __typename: "ModelRelationLinkConnection",
  items:  Array<RelationLink | null >,
  nextToken?: string | null,
};

export type RelationLink = {
  __typename: "RelationLink",
  id: string,
  userID: string,
  user?: User | null,
  relationID: string,
  relation?: Relation | null,
  type: string,
  notify: number,
  updatedAt?: string | null,
  search?: string | null,
  percentage?: number | null,
  createdAt: string,
};

export type Relation = {
  __typename: "Relation",
  id: string,
  type: string,
  mode: RelationModes,
  name?: string | null,
  description?: string | null,
  avatar?: string | null,
  reference?: string | null,
  members: Array< string >,
  admins: Array< string >,
  updatedAt?: string | null,
  status: string,
  search?: string | null,
  config?: string | null,
  relationsLink?: ModelRelationLinkConnection | null,
  messages?: ModelMessageConnection | null,
  schedules?: ModelScheduleConnection | null,
  documents?: ModelDocumentConnection | null,
  restrictedContents?: ModelRestrictedContentConnection | null,
  createdAt: string,
};

export enum RelationModes {
  PRIVATE = "PRIVATE",
  GROUP = "GROUP",
}


export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  relationID?: string | null,
  relation?: Relation | null,
  restrictedContentID?: string | null,
  restrictedContent?: RestrictedContent | null,
  userID: string,
  user?: User | null,
  type: MessagesTypes,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  status?: string | null,
  updatedAt: string,
};

export type RestrictedContent = {
  __typename: "RestrictedContent",
  id: string,
  relationID: string,
  order: number,
  group?: string | null,
  subGroup?: string | null,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  type: RestrictedContentTypes,
  isAWSVDO?: boolean | null,
  thumbnail?: string | null,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  lifetime?: string | null,
  start?: string | null,
  expiration?: string | null,
  percentage?: number | null,
  video?: VideoObject | null,
  relation?: Relation | null,
  view?: ModelRestrictedContentViewConnection | null,
  messages?: ModelMessageConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum RestrictedContentTypes {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  PDF = "PDF",
}


export type VideoObject = {
  __typename: "VideoObject",
  id: string,
  token?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelRestrictedContentViewConnection = {
  __typename: "ModelRestrictedContentViewConnection",
  items:  Array<RestrictedContentView | null >,
  nextToken?: string | null,
};

export type RestrictedContentView = {
  __typename: "RestrictedContentView",
  id: string,
  restrictedContentID: string,
  userID: string,
  percentage?: number | null,
  rating?: number | null,
  restrictedContent?: RestrictedContent | null,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
};

export enum MessagesTypes {
  ALERT = "ALERT",
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  LOCATION = "LOCATION",
  PDF = "PDF",
  FORM = "FORM",
}


export type ModelScheduleConnection = {
  __typename: "ModelScheduleConnection",
  items:  Array<Schedule | null >,
  nextToken?: string | null,
};

export type Schedule = {
  __typename: "Schedule",
  id: string,
  relationID: string,
  userID: string,
  dateTime?: string | null,
  title?: string | null,
  description?: string | null,
  link?: string | null,
  frequency?: ScheduleFrequencies | null,
  createdAt?: string | null,
  viewType?: string | null,
  user?: User | null,
  relation?: Relation | null,
  updatedAt: string,
};

export enum ScheduleFrequencies {
  NONE = "NONE",
  WEEK = "WEEK",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMIANNUAL = "SEMIANNUAL",
  ANNUAL = "ANNUAL",
}


export type ModelDocumentConnection = {
  __typename: "ModelDocumentConnection",
  items:  Array<Document | null >,
  nextToken?: string | null,
};

export type Document = {
  __typename: "Document",
  id: string,
  relationID: string,
  ownerID: string,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  conclusion?: string | null,
  content?: string | null,
  fileKey?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  relation?: Relation | null,
  owner?: User | null,
};

export type ModelRestrictedContentConnection = {
  __typename: "ModelRestrictedContentConnection",
  items:  Array<RestrictedContent | null >,
  nextToken?: string | null,
};

export type ModelCartConnection = {
  __typename: "ModelCartConnection",
  items:  Array<Cart | null >,
  nextToken?: string | null,
};

export type Cart = {
  __typename: "Cart",
  id: string,
  userID: string,
  productID: string,
  product?: Product | null,
  options?: ModelCartOptionConnection | null,
  qty?: number | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Product = {
  __typename: "Product",
  id: string,
  alias: string,
  status: PageStatus,
  category: string,
  categoryProps?: Category | null,
  subCategory: string,
  subCategoryProps?: Category | null,
  type?: string | null,
  relationID?: string | null,
  preparationTime?: number | null,
  code?: string | null,
  name: string,
  description?: string | null,
  contentTitle?: string | null,
  contentTitle2?: string | null,
  contentTitle3?: string | null,
  content?: string | null,
  content2?: string | null,
  content3?: string | null,
  tags?: Array< string | null > | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  price_of?: number | null,
  price: number,
  qty?: number | null,
  stockControl?: boolean | null,
  photo1?: string | null,
  photo2?: string | null,
  photo3?: string | null,
  photo4?: string | null,
  photo5?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  titlePadX?: string | null,
  titlePadY?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
  hideInSearch?: boolean | null,
  options?: ModelOptionConnection | null,
  updatedAt: string,
};

export enum PageStatus {
  ON = "ON",
  OFF = "OFF",
}


export type Category = {
  __typename: "Category",
  id: string,
  alias: string,
  order: number,
  title?: string | null,
  description?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  hide?: boolean | null,
  isSub?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export enum PageChangeFreq {
  NEVER = "NEVER",
  YEARLY = "YEARLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
  HOURLY = "HOURLY",
  ALWAYS = "ALWAYS",
}


export enum PagePriority {
  P0 = "P0",
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
  P5 = "P5",
  P6 = "P6",
  P7 = "P7",
  P8 = "P8",
  P9 = "P9",
  P10 = "P10",
}


export enum PageOptionTitle {
  L = "L",
  R = "R",
  C = "C",
  N = "N",
}


export enum PageSideColumn {
  L = "L",
  R = "R",
  N = "N",
}


export enum PageOptionSideColumn {
  CART_CONTENT_TAGS = "CART_CONTENT_TAGS",
  CART_CONTENT = "CART_CONTENT",
  CONTENT_CART = "CONTENT_CART",
  MENU_CONTENT_TAGS = "MENU_CONTENT_TAGS",
  MENU_CONTENT = "MENU_CONTENT",
  TAGS_CONTENT = "TAGS_CONTENT",
  CONTENT_MENU_TAGS = "CONTENT_MENU_TAGS",
  CONTENT_MENU = "CONTENT_MENU",
  CONTENT_TAGS = "CONTENT_TAGS",
  CONTENT_BACK = "CONTENT_BACK",
  BACK_CONTENT = "BACK_CONTENT",
}


export type ModelOptionConnection = {
  __typename: "ModelOptionConnection",
  items:  Array<Option | null >,
  nextToken?: string | null,
};

export type Option = {
  __typename: "Option",
  id: string,
  productID: string,
  name?: string | null,
  price?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCartOptionConnection = {
  __typename: "ModelCartOptionConnection",
  items:  Array<CartOption | null >,
  nextToken?: string | null,
};

export type CartOption = {
  __typename: "CartOption",
  id: string,
  cartID: string,
  optionID: string,
  option?: Option | null,
  createdAt: string,
  updatedAt: string,
  userID?: string | null,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
  nextToken?: string | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  userID: string,
  user?: User | null,
  status: OrderStatus,
  createdAt?: string | null,
  items?: ModelOrderItemConnection | null,
  couponID?: string | null,
  couponName?: string | null,
  couponDiscount?: number | null,
  deliveryPrice?: number | null,
  total?: number | null,
  rating?: number | null,
  ratingNotes?: string | null,
  orderPagarmeID?: string | null,
  addressReference?: string | null,
  addressStreet?: string | null,
  addressNumber?: string | null,
  addressComplement?: string | null,
  addressZipcode?: string | null,
  addressNeighborhood?: string | null,
  addressCity?: string | null,
  addressState?: string | null,
  addressCountry?: string | null,
  notes?: string | null,
  qrCodePix?: string | null,
  qrCodePixUrl?: string | null,
  payMethod?: PaymentMethods | null,
  updatedAt: string,
};

export enum OrderStatus {
  STANDBY = "STANDBY",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
  IN_PREPARATION = "IN_PREPARATION",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}


export type ModelOrderItemConnection = {
  __typename: "ModelOrderItemConnection",
  items:  Array<OrderItem | null >,
  nextToken?: string | null,
};

export type OrderItem = {
  __typename: "OrderItem",
  id: string,
  orderID: string,
  productID: string,
  product?: Product | null,
  optionsItem?: ModelOrderItemOptionConnection | null,
  qty: number,
  code?: string | null,
  name: string,
  description?: string | null,
  price: number,
  photo1?: string | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
  changeNameAdmin?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelOrderItemOptionConnection = {
  __typename: "ModelOrderItemOptionConnection",
  items:  Array<OrderItemOption | null >,
  nextToken?: string | null,
};

export type OrderItemOption = {
  __typename: "OrderItemOption",
  id: string,
  orderItemID: string,
  optionID: string,
  option?: Option | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelRelationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  mode?: ModelRelationModesInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  reference?: ModelStringInput | null,
  members?: ModelStringInput | null,
  admins?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  status?: ModelStringInput | null,
  search?: ModelStringInput | null,
  config?: ModelStringInput | null,
  and?: Array< ModelRelationFilterInput | null > | null,
  or?: Array< ModelRelationFilterInput | null > | null,
  not?: ModelRelationFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRelationModesInput = {
  eq?: RelationModes | null,
  ne?: RelationModes | null,
};

export type ModelRelationConnection = {
  __typename: "ModelRelationConnection",
  items:  Array<Relation | null >,
  nextToken?: string | null,
};

export type ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyConditionInput = {
  eq?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
  le?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
  lt?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
  ge?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
  gt?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
  between?: Array< ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput | null,
};

export type ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyInput = {
  mode?: RelationModes | null,
  updatedAt?: string | null,
};

export type ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyConditionInput = {
  eq?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
  le?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
  lt?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
  ge?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
  gt?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
  between?: Array< ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput | null,
};

export type ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyInput = {
  status?: string | null,
  updatedAt?: string | null,
};

export type ModelLogFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  tag?: ModelStringInput | null,
  source?: ModelLogSourceInput | null,
  notes?: ModelStringInput | null,
  message?: ModelStringInput | null,
  page?: ModelStringInput | null,
  manufacturer?: ModelStringInput | null,
  model?: ModelStringInput | null,
  osName?: ModelStringInput | null,
  osVersion?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  uuid?: ModelStringInput | null,
  ip?: ModelStringInput | null,
  city?: ModelStringInput | null,
  region?: ModelStringInput | null,
  country?: ModelStringInput | null,
  provider?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelLogFilterInput | null > | null,
  or?: Array< ModelLogFilterInput | null > | null,
  not?: ModelLogFilterInput | null,
};

export type ModelLogSourceInput = {
  eq?: LogSource | null,
  ne?: LogSource | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelLogLogsByUserTagCreatedAtCompositeKeyConditionInput = {
  eq?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
  le?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
  lt?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
  ge?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
  gt?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
  between?: Array< ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelLogLogsByUserTagCreatedAtCompositeKeyInput | null,
};

export type ModelLogLogsByUserTagCreatedAtCompositeKeyInput = {
  tag?: string | null,
  createdAt?: string | null,
};

export type Page = {
  __typename: "Page",
  id: string,
  alias: string,
  status: PageStatus,
  type: PageType,
  menu: string,
  menuProps?: Menu | null,
  order: number,
  title: string,
  titlePadX?: string | null,
  titlePadY?: string | null,
  description?: string | null,
  content?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  tags?: Array< string | null > | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
  blocks?: ModelBlockConnection | null,
  updatedAt: string,
};

export enum PageType {
  CONTENT = "CONTENT",
  COMMERCE = "COMMERCE",
}


export type Menu = {
  __typename: "Menu",
  id: string,
  alias: string,
  order: number,
  title?: string | null,
  description?: string | null,
  orderDesc?: boolean | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  showDescriptionPage?: string | null,
  showThumbnailPage?: string | null,
  hide?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelBlockConnection = {
  __typename: "ModelBlockConnection",
  items:  Array<Block | null >,
  nextToken?: string | null,
};

export type Block = {
  __typename: "Block",
  id: string,
  pageID: string,
  order: number,
  component: string,
  content: string,
  config?: string | null,
  page?: Page | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPageFilterInput = {
  id?: ModelIDInput | null,
  alias?: ModelStringInput | null,
  status?: ModelPageStatusInput | null,
  type?: ModelPageTypeInput | null,
  menu?: ModelIDInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  titlePadX?: ModelStringInput | null,
  titlePadY?: ModelStringInput | null,
  description?: ModelStringInput | null,
  content?: ModelStringInput | null,
  contentPadX?: ModelStringInput | null,
  contentPadY?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  changeFreq?: ModelPageChangeFreqInput | null,
  priority?: ModelPagePriorityInput | null,
  optionTitle?: ModelPageOptionTitleInput | null,
  sideColumn?: ModelPageSideColumnInput | null,
  sideColumnPadX?: ModelStringInput | null,
  sideColumnPadY?: ModelStringInput | null,
  sideColumnContent?: ModelStringInput | null,
  optionSideColumn?: ModelPageOptionSideColumnInput | null,
  footerSm?: ModelStringInput | null,
  footerLg?: ModelStringInput | null,
  hideInMenu?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelPageFilterInput | null > | null,
  or?: Array< ModelPageFilterInput | null > | null,
  not?: ModelPageFilterInput | null,
};

export type ModelPageStatusInput = {
  eq?: PageStatus | null,
  ne?: PageStatus | null,
};

export type ModelPageTypeInput = {
  eq?: PageType | null,
  ne?: PageType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelPageChangeFreqInput = {
  eq?: PageChangeFreq | null,
  ne?: PageChangeFreq | null,
};

export type ModelPagePriorityInput = {
  eq?: PagePriority | null,
  ne?: PagePriority | null,
};

export type ModelPageOptionTitleInput = {
  eq?: PageOptionTitle | null,
  ne?: PageOptionTitle | null,
};

export type ModelPageSideColumnInput = {
  eq?: PageSideColumn | null,
  ne?: PageSideColumn | null,
};

export type ModelPageOptionSideColumnInput = {
  eq?: PageOptionSideColumn | null,
  ne?: PageOptionSideColumn | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelPageConnection = {
  __typename: "ModelPageConnection",
  items:  Array<Page | null >,
  nextToken?: string | null,
};

export type ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput = {
  eq?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
  le?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
  lt?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
  ge?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
  gt?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
  between?: Array< ModelPagePagesByStatusMenuOrderCompositeKeyInput | null > | null,
  beginsWith?: ModelPagePagesByStatusMenuOrderCompositeKeyInput | null,
};

export type ModelPagePagesByStatusMenuOrderCompositeKeyInput = {
  menu?: string | null,
  order?: number | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  alias?: ModelStringInput | null,
  status?: ModelPageStatusInput | null,
  category?: ModelIDInput | null,
  subCategory?: ModelIDInput | null,
  type?: ModelStringInput | null,
  relationID?: ModelIDInput | null,
  preparationTime?: ModelIntInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  contentTitle?: ModelStringInput | null,
  contentTitle2?: ModelStringInput | null,
  contentTitle3?: ModelStringInput | null,
  content?: ModelStringInput | null,
  content2?: ModelStringInput | null,
  content3?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  changeFreq?: ModelPageChangeFreqInput | null,
  priority?: ModelPagePriorityInput | null,
  price_of?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  qty?: ModelIntInput | null,
  stockControl?: ModelBooleanInput | null,
  photo1?: ModelStringInput | null,
  photo2?: ModelStringInput | null,
  photo3?: ModelStringInput | null,
  photo4?: ModelStringInput | null,
  photo5?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  titlePadX?: ModelStringInput | null,
  titlePadY?: ModelStringInput | null,
  contentPadX?: ModelStringInput | null,
  contentPadY?: ModelStringInput | null,
  optionTitle?: ModelPageOptionTitleInput | null,
  sideColumn?: ModelPageSideColumnInput | null,
  sideColumnPadX?: ModelStringInput | null,
  sideColumnPadY?: ModelStringInput | null,
  sideColumnContent?: ModelStringInput | null,
  optionSideColumn?: ModelPageOptionSideColumnInput | null,
  footerSm?: ModelStringInput | null,
  footerLg?: ModelStringInput | null,
  hideInMenu?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  hideInSearch?: ModelBooleanInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput = {
  eq?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
  le?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
  lt?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
  ge?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
  gt?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
  between?: Array< ModelProductProductsByStatusCategoryNameCompositeKeyInput | null > | null,
  beginsWith?: ModelProductProductsByStatusCategoryNameCompositeKeyInput | null,
};

export type ModelProductProductsByStatusCategoryNameCompositeKeyInput = {
  category?: string | null,
  name?: string | null,
};

export type ModelCartFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  changeName?: ModelStringInput | null,
  changeDescription?: ModelStringInput | null,
  changeQtyBlend?: ModelIntInput | null,
  changePriceAdjustment?: ModelStringInput | null,
  blendID?: ModelIDInput | null,
  and?: Array< ModelCartFilterInput | null > | null,
  or?: Array< ModelCartFilterInput | null > | null,
  not?: ModelCartFilterInput | null,
};

export type ModelProductProductsByCategorySubCategoryNameCompositeKeyConditionInput = {
  eq?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
  le?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
  lt?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
  ge?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
  gt?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
  between?: Array< ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null > | null,
  beginsWith?: ModelProductProductsByCategorySubCategoryNameCompositeKeyInput | null,
};

export type ModelProductProductsByCategorySubCategoryNameCompositeKeyInput = {
  subCategory?: string | null,
  name?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  status?: ModelUserStatusInput | null,
  active?: ModelBooleanInput | null,
  avatar?: ModelStringInput | null,
  search?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserStatusInput = {
  eq?: UserStatus | null,
  ne?: UserStatus | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelGroupUserFilterInput = {
  id?: ModelIDInput | null,
  group?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  profileID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelGroupUserFilterInput | null > | null,
  or?: Array< ModelGroupUserFilterInput | null > | null,
  not?: ModelGroupUserFilterInput | null,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  status?: ModelOrderStatusInput | null,
  createdAt?: ModelStringInput | null,
  couponID?: ModelIDInput | null,
  couponName?: ModelStringInput | null,
  couponDiscount?: ModelFloatInput | null,
  deliveryPrice?: ModelFloatInput | null,
  total?: ModelFloatInput | null,
  rating?: ModelIntInput | null,
  ratingNotes?: ModelStringInput | null,
  orderPagarmeID?: ModelStringInput | null,
  addressReference?: ModelStringInput | null,
  addressStreet?: ModelStringInput | null,
  addressNumber?: ModelStringInput | null,
  addressComplement?: ModelStringInput | null,
  addressZipcode?: ModelStringInput | null,
  addressNeighborhood?: ModelStringInput | null,
  addressCity?: ModelStringInput | null,
  addressState?: ModelStringInput | null,
  addressCountry?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  qrCodePix?: ModelStringInput | null,
  qrCodePixUrl?: ModelStringInput | null,
  payMethod?: ModelPaymentMethodsInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelOrderStatusInput = {
  eq?: OrderStatus | null,
  ne?: OrderStatus | null,
};

export type ModelPaymentMethodsInput = {
  eq?: PaymentMethods | null,
  ne?: PaymentMethods | null,
};

export type ModelDataBaseItemFilterInput = {
  id?: ModelIDInput | null,
  dataBaseID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  data?: ModelStringInput | null,
  status?: ModelDataBaseItemStatusInput | null,
  search?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDataBaseItemFilterInput | null > | null,
  or?: Array< ModelDataBaseItemFilterInput | null > | null,
  not?: ModelDataBaseItemFilterInput | null,
};

export type ModelDataBaseItemStatusInput = {
  eq?: DataBaseItemStatus | null,
  ne?: DataBaseItemStatus | null,
};

export enum DataBaseItemStatus {
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
  STANDBY = "STANDBY",
}


export type ModelDataBaseItemConnection = {
  __typename: "ModelDataBaseItemConnection",
  items:  Array<DataBaseItem | null >,
  nextToken?: string | null,
};

export type DataBaseItem = {
  __typename: "DataBaseItem",
  id: string,
  dataBaseID: string,
  userID: string,
  user?: User | null,
  data: string,
  status: DataBaseItemStatus,
  search?: string | null,
  notes?: string | null,
  createdAt?: string | null,
  updatedAt: string,
};

export type ModelDeliveryOrderFilterInput = {
  id?: ModelIDInput | null,
  orderID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  deliveryUserID?: ModelIDInput | null,
  status?: ModelDeliveryStatusInput | null,
  and?: Array< ModelDeliveryOrderFilterInput | null > | null,
  or?: Array< ModelDeliveryOrderFilterInput | null > | null,
  not?: ModelDeliveryOrderFilterInput | null,
};

export type ModelDeliveryStatusInput = {
  eq?: DeliveryStatus | null,
  ne?: DeliveryStatus | null,
};

export enum DeliveryStatus {
  FORESEEN = "FORESEEN",
  NEEDS_ACTION = "NEEDS_ACTION",
  CONFIRMED = "CONFIRMED",
  BLOCKED = "BLOCKED",
}


export type ModelDeliveryOrderConnection = {
  __typename: "ModelDeliveryOrderConnection",
  items:  Array<DeliveryOrder | null >,
  nextToken?: string | null,
};

export type DeliveryOrder = {
  __typename: "DeliveryOrder",
  id: string,
  orderID: string,
  order?: Order | null,
  date: string,
  deliveryUserID: string,
  deliveryUser?: User | null,
  status: DeliveryStatus,
  createdAt: string,
  updatedAt: string,
};

export type ModelCouponUsedFilterInput = {
  id?: ModelIDInput | null,
  couponID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  and?: Array< ModelCouponUsedFilterInput | null > | null,
  or?: Array< ModelCouponUsedFilterInput | null > | null,
  not?: ModelCouponUsedFilterInput | null,
};

export type ModelCouponUsedConnection = {
  __typename: "ModelCouponUsedConnection",
  items:  Array<CouponUsed | null >,
  nextToken?: string | null,
};

export type CouponUsed = {
  __typename: "CouponUsed",
  id: string,
  couponID: string,
  coupon?: Coupon | null,
  userID: string,
  user?: User | null,
  qty?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type Coupon = {
  __typename: "Coupon",
  id: string,
  name: string,
  description?: string | null,
  code: string,
  start?: string | null,
  expiration?: string | null,
  discountPercentage?: number | null,
  discountValue?: number | null,
  qtyLimit?: number | null,
  qtyUsed?: number | null,
  qtyProduct?: number | null,
  qtyProductUsed?: number | null,
  search?: string | null,
  products?: ModelCouponProductConnection | null,
  couponUsed?: ModelCouponUsedConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCouponProductConnection = {
  __typename: "ModelCouponProductConnection",
  items:  Array<CouponProduct | null >,
  nextToken?: string | null,
};

export type CouponProduct = {
  __typename: "CouponProduct",
  id: string,
  couponID: string,
  productID: string,
  price?: number | null,
  limit?: number | null,
  product?: Product | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyConditionInput = {
  eq?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
  le?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
  lt?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
  ge?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
  gt?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
  between?: Array< ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput | null,
};

export type ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyInput = {
  type?: string | null,
  notify?: number | null,
  updatedAt?: string | null,
};

export type ModelRelationLinkFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  notify?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  percentage?: ModelIntInput | null,
  and?: Array< ModelRelationLinkFilterInput | null > | null,
  or?: Array< ModelRelationLinkFilterInput | null > | null,
  not?: ModelRelationLinkFilterInput | null,
};

export type ModelCouponFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  code?: ModelStringInput | null,
  start?: ModelStringInput | null,
  expiration?: ModelStringInput | null,
  discountPercentage?: ModelIntInput | null,
  discountValue?: ModelFloatInput | null,
  qtyLimit?: ModelIntInput | null,
  qtyUsed?: ModelIntInput | null,
  qtyProduct?: ModelIntInput | null,
  qtyProductUsed?: ModelIntInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelCouponFilterInput | null > | null,
  or?: Array< ModelCouponFilterInput | null > | null,
  not?: ModelCouponFilterInput | null,
};

export type ModelCouponConnection = {
  __typename: "ModelCouponConnection",
  items:  Array<Coupon | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  restrictedContentID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  type?: ModelMessagesTypesInput | null,
  content?: ModelStringInput | null,
  search?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelMessagesTypesInput = {
  eq?: MessagesTypes | null,
  ne?: MessagesTypes | null,
};

export type ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyConditionInput = {
  eq?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
  le?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
  lt?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
  ge?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
  gt?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
  between?: Array< ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput | null,
};

export type ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyInput = {
  relationID?: string | null,
  createdAt?: string | null,
};

export type CreateGroupUserInput = {
  id?: string | null,
  group: string,
  userID: string,
  profileID: string,
  createdAt?: string | null,
};

export type ModelGroupUserConditionInput = {
  group?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  profileID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelGroupUserConditionInput | null > | null,
  or?: Array< ModelGroupUserConditionInput | null > | null,
  not?: ModelGroupUserConditionInput | null,
};

export type DeleteGroupUserInput = {
  id: string,
};

export type DeleteAddressInput = {
  id: string,
};

export type ModelAddressConditionInput = {
  userID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  reference?: ModelStringInput | null,
  street?: ModelStringInput | null,
  number?: ModelStringInput | null,
  complement?: ModelStringInput | null,
  zipcode?: ModelStringInput | null,
  neighborhood?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  country?: ModelStringInput | null,
  addressPagarmeID?: ModelStringInput | null,
  and?: Array< ModelAddressConditionInput | null > | null,
  or?: Array< ModelAddressConditionInput | null > | null,
  not?: ModelAddressConditionInput | null,
};

export type DeletePayMethodInput = {
  id: string,
};

export type ModelPayMethodConditionInput = {
  userID?: ModelIDInput | null,
  method?: ModelPaymentMethodsInput | null,
  number?: ModelStringInput | null,
  holderName?: ModelStringInput | null,
  holderDocument?: ModelStringInput | null,
  expMonth?: ModelIntInput | null,
  expYear?: ModelIntInput | null,
  cvv?: ModelStringInput | null,
  brand?: ModelStringInput | null,
  label?: ModelStringInput | null,
  cardPagarmeID?: ModelStringInput | null,
  and?: Array< ModelPayMethodConditionInput | null > | null,
  or?: Array< ModelPayMethodConditionInput | null > | null,
  not?: ModelPayMethodConditionInput | null,
};

export type CreateConfigInput = {
  id?: string | null,
  validationMode: ConfigValidationModes,
  googleAnalyticsID?: string | null,
  googleSiteVerification?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  infoFooter?: string | null,
  minValueOrder?: number | null,
  phoneOrders?: string | null,
  phoneSac?: string | null,
  phoneWhatsapp?: string | null,
  allowPayOnDelivery?: boolean | null,
  allowLocalPickup?: boolean | null,
  deliveryOnSunday?: string | null,
  deliveryOnMonday?: string | null,
  deliveryOnTuesday?: string | null,
  deliveryOnWednesday?: string | null,
  deliveryOnThursday?: string | null,
  deliveryOnFriday?: string | null,
  deliveryOnSaturday?: string | null,
  deliveryOffSunday?: string | null,
  deliveryOffMonday?: string | null,
  deliveryOffTuesday?: string | null,
  deliveryOffWednesday?: string | null,
  deliveryOffThursday?: string | null,
  deliveryOffFriday?: string | null,
  deliveryOffSaturday?: string | null,
  showNotesCart?: boolean | null,
  notesCart?: string | null,
  soundOnNewOrder?: boolean | null,
  birthDayEnable?: boolean | null,
  birthDaySubject?: string | null,
  birthDayMessage?: string | null,
  footer?: string | null,
  navBar?: string | null,
};

export enum ConfigValidationModes {
  CODE = "CODE",
  LINK = "LINK",
}


export type ModelConfigConditionInput = {
  validationMode?: ModelConfigValidationModesInput | null,
  googleAnalyticsID?: ModelStringInput | null,
  googleSiteVerification?: ModelStringInput | null,
  facebook?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  youtube?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  infoFooter?: ModelStringInput | null,
  minValueOrder?: ModelFloatInput | null,
  phoneOrders?: ModelStringInput | null,
  phoneSac?: ModelStringInput | null,
  phoneWhatsapp?: ModelStringInput | null,
  allowPayOnDelivery?: ModelBooleanInput | null,
  allowLocalPickup?: ModelBooleanInput | null,
  deliveryOnSunday?: ModelStringInput | null,
  deliveryOnMonday?: ModelStringInput | null,
  deliveryOnTuesday?: ModelStringInput | null,
  deliveryOnWednesday?: ModelStringInput | null,
  deliveryOnThursday?: ModelStringInput | null,
  deliveryOnFriday?: ModelStringInput | null,
  deliveryOnSaturday?: ModelStringInput | null,
  deliveryOffSunday?: ModelStringInput | null,
  deliveryOffMonday?: ModelStringInput | null,
  deliveryOffTuesday?: ModelStringInput | null,
  deliveryOffWednesday?: ModelStringInput | null,
  deliveryOffThursday?: ModelStringInput | null,
  deliveryOffFriday?: ModelStringInput | null,
  deliveryOffSaturday?: ModelStringInput | null,
  showNotesCart?: ModelBooleanInput | null,
  notesCart?: ModelStringInput | null,
  soundOnNewOrder?: ModelBooleanInput | null,
  birthDayEnable?: ModelBooleanInput | null,
  birthDaySubject?: ModelStringInput | null,
  birthDayMessage?: ModelStringInput | null,
  footer?: ModelStringInput | null,
  navBar?: ModelStringInput | null,
  and?: Array< ModelConfigConditionInput | null > | null,
  or?: Array< ModelConfigConditionInput | null > | null,
  not?: ModelConfigConditionInput | null,
};

export type ModelConfigValidationModesInput = {
  eq?: ConfigValidationModes | null,
  ne?: ConfigValidationModes | null,
};

export type Config = {
  __typename: "Config",
  id: string,
  validationMode: ConfigValidationModes,
  googleAnalyticsID?: string | null,
  googleSiteVerification?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  infoFooter?: string | null,
  minValueOrder?: number | null,
  phoneOrders?: string | null,
  phoneSac?: string | null,
  phoneWhatsapp?: string | null,
  allowPayOnDelivery?: boolean | null,
  allowLocalPickup?: boolean | null,
  deliveryOnSunday?: string | null,
  deliveryOnMonday?: string | null,
  deliveryOnTuesday?: string | null,
  deliveryOnWednesday?: string | null,
  deliveryOnThursday?: string | null,
  deliveryOnFriday?: string | null,
  deliveryOnSaturday?: string | null,
  deliveryOffSunday?: string | null,
  deliveryOffMonday?: string | null,
  deliveryOffTuesday?: string | null,
  deliveryOffWednesday?: string | null,
  deliveryOffThursday?: string | null,
  deliveryOffFriday?: string | null,
  deliveryOffSaturday?: string | null,
  showNotesCart?: boolean | null,
  notesCart?: string | null,
  soundOnNewOrder?: boolean | null,
  birthDayEnable?: boolean | null,
  birthDaySubject?: string | null,
  birthDayMessage?: string | null,
  footer?: string | null,
  navBar?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConfigInput = {
  id: string,
  validationMode?: ConfigValidationModes | null,
  googleAnalyticsID?: string | null,
  googleSiteVerification?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  infoFooter?: string | null,
  minValueOrder?: number | null,
  phoneOrders?: string | null,
  phoneSac?: string | null,
  phoneWhatsapp?: string | null,
  allowPayOnDelivery?: boolean | null,
  allowLocalPickup?: boolean | null,
  deliveryOnSunday?: string | null,
  deliveryOnMonday?: string | null,
  deliveryOnTuesday?: string | null,
  deliveryOnWednesday?: string | null,
  deliveryOnThursday?: string | null,
  deliveryOnFriday?: string | null,
  deliveryOnSaturday?: string | null,
  deliveryOffSunday?: string | null,
  deliveryOffMonday?: string | null,
  deliveryOffTuesday?: string | null,
  deliveryOffWednesday?: string | null,
  deliveryOffThursday?: string | null,
  deliveryOffFriday?: string | null,
  deliveryOffSaturday?: string | null,
  showNotesCart?: boolean | null,
  notesCart?: string | null,
  soundOnNewOrder?: boolean | null,
  birthDayEnable?: boolean | null,
  birthDaySubject?: string | null,
  birthDayMessage?: string | null,
  footer?: string | null,
  navBar?: string | null,
};

export type CreateInviteInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  email?: string | null,
  phone?: string | null,
  groups?: Array< string | null > | null,
  status: InviteStatus,
  createdAt?: string | null,
};

export enum InviteStatus {
  SENT = "SENT",
  CANCELED = "CANCELED",
  ACCEPTED = "ACCEPTED",
}


export type ModelInviteConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  status?: ModelInviteStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelInviteConditionInput | null > | null,
  or?: Array< ModelInviteConditionInput | null > | null,
  not?: ModelInviteConditionInput | null,
};

export type ModelInviteStatusInput = {
  eq?: InviteStatus | null,
  ne?: InviteStatus | null,
};

export type Invite = {
  __typename: "Invite",
  id: string,
  name: string,
  description?: string | null,
  email?: string | null,
  phone?: string | null,
  groups?: Array< string | null > | null,
  status: InviteStatus,
  createdAt?: string | null,
  updatedAt: string,
};

export type DeleteInviteInput = {
  id: string,
};

export type UpdateDataBaseInput = {
  id: string,
  name?: string | null,
};

export type ModelDataBaseConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelDataBaseConditionInput | null > | null,
  or?: Array< ModelDataBaseConditionInput | null > | null,
  not?: ModelDataBaseConditionInput | null,
};

export type DataBase = {
  __typename: "DataBase",
  id: string,
  name: string,
  items?: ModelDataBaseItemConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteDataBaseInput = {
  id: string,
};

export type UpdateDataBaseItemInput = {
  id: string,
  dataBaseID?: string | null,
  userID?: string | null,
  data?: string | null,
  status?: DataBaseItemStatus | null,
  search?: string | null,
  notes?: string | null,
  createdAt?: string | null,
};

export type ModelDataBaseItemConditionInput = {
  dataBaseID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  data?: ModelStringInput | null,
  status?: ModelDataBaseItemStatusInput | null,
  search?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDataBaseItemConditionInput | null > | null,
  or?: Array< ModelDataBaseItemConditionInput | null > | null,
  not?: ModelDataBaseItemConditionInput | null,
};

export type DeleteDataBaseItemInput = {
  id: string,
};

export type CreateFolderInput = {
  id?: string | null,
  name: string,
};

export type ModelFolderConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelFolderConditionInput | null > | null,
  or?: Array< ModelFolderConditionInput | null > | null,
  not?: ModelFolderConditionInput | null,
};

export type Folder = {
  __typename: "Folder",
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFolderInput = {
  id: string,
  name?: string | null,
};

export type DeleteFolderInput = {
  id: string,
};

export type CreateMidiaInput = {
  id?: string | null,
  key: string,
  type?: MidiaTypes | null,
  title?: string | null,
  subTitle?: string | null,
  description?: string | null,
  link?: string | null,
  identifyText?: string | null,
};

export enum MidiaTypes {
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  PDF = "PDF",
  DOC = "DOC",
  XLS = "XLS",
  FILE = "FILE",
  ZIP = "ZIP",
}


export type ModelMidiaConditionInput = {
  key?: ModelStringInput | null,
  type?: ModelMidiaTypesInput | null,
  title?: ModelStringInput | null,
  subTitle?: ModelStringInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  identifyText?: ModelStringInput | null,
  and?: Array< ModelMidiaConditionInput | null > | null,
  or?: Array< ModelMidiaConditionInput | null > | null,
  not?: ModelMidiaConditionInput | null,
};

export type ModelMidiaTypesInput = {
  eq?: MidiaTypes | null,
  ne?: MidiaTypes | null,
};

export type Midia = {
  __typename: "Midia",
  id: string,
  key: string,
  type?: MidiaTypes | null,
  title?: string | null,
  subTitle?: string | null,
  description?: string | null,
  link?: string | null,
  identifyText?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMidiaInput = {
  id: string,
  key?: string | null,
  type?: MidiaTypes | null,
  title?: string | null,
  subTitle?: string | null,
  description?: string | null,
  link?: string | null,
  identifyText?: string | null,
};

export type DeleteMidiaInput = {
  id: string,
};

export type DeleteDocumentInput = {
  id: string,
};

export type ModelDocumentConditionInput = {
  relationID?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  conclusion?: ModelStringInput | null,
  content?: ModelStringInput | null,
  fileKey?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDocumentConditionInput | null > | null,
  or?: Array< ModelDocumentConditionInput | null > | null,
  not?: ModelDocumentConditionInput | null,
};

export type CreateRestrictedContentInput = {
  id?: string | null,
  relationID: string,
  order: number,
  group?: string | null,
  subGroup?: string | null,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  type: RestrictedContentTypes,
  isAWSVDO?: boolean | null,
  thumbnail?: string | null,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  lifetime?: string | null,
  start?: string | null,
  expiration?: string | null,
  percentage?: number | null,
};

export type ModelRestrictedContentConditionInput = {
  relationID?: ModelIDInput | null,
  order?: ModelIntInput | null,
  group?: ModelStringInput | null,
  subGroup?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  type?: ModelRestrictedContentTypesInput | null,
  isAWSVDO?: ModelBooleanInput | null,
  thumbnail?: ModelStringInput | null,
  content?: ModelStringInput | null,
  search?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  lifetime?: ModelStringInput | null,
  start?: ModelStringInput | null,
  expiration?: ModelStringInput | null,
  percentage?: ModelIntInput | null,
  and?: Array< ModelRestrictedContentConditionInput | null > | null,
  or?: Array< ModelRestrictedContentConditionInput | null > | null,
  not?: ModelRestrictedContentConditionInput | null,
};

export type ModelRestrictedContentTypesInput = {
  eq?: RestrictedContentTypes | null,
  ne?: RestrictedContentTypes | null,
};

export type UpdateRestrictedContentInput = {
  id: string,
  relationID?: string | null,
  order?: number | null,
  group?: string | null,
  subGroup?: string | null,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  type?: RestrictedContentTypes | null,
  isAWSVDO?: boolean | null,
  thumbnail?: string | null,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  lifetime?: string | null,
  start?: string | null,
  expiration?: string | null,
  percentage?: number | null,
};

export type DeleteRestrictedContentInput = {
  id: string,
};

export type CreateMenuInput = {
  id?: string | null,
  alias: string,
  order: number,
  title?: string | null,
  description?: string | null,
  orderDesc?: boolean | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  showDescriptionPage?: string | null,
  showThumbnailPage?: string | null,
  hide?: boolean | null,
};

export type ModelMenuConditionInput = {
  alias?: ModelStringInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  orderDesc?: ModelBooleanInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  showDescriptionPage?: ModelStringInput | null,
  showThumbnailPage?: ModelStringInput | null,
  hide?: ModelBooleanInput | null,
  and?: Array< ModelMenuConditionInput | null > | null,
  or?: Array< ModelMenuConditionInput | null > | null,
  not?: ModelMenuConditionInput | null,
};

export type UpdateMenuInput = {
  id: string,
  alias?: string | null,
  order?: number | null,
  title?: string | null,
  description?: string | null,
  orderDesc?: boolean | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  showDescriptionPage?: string | null,
  showThumbnailPage?: string | null,
  hide?: boolean | null,
};

export type DeleteMenuInput = {
  id: string,
};

export type UpdatePageInput = {
  id: string,
  alias?: string | null,
  status?: PageStatus | null,
  type?: PageType | null,
  menu?: string | null,
  order?: number | null,
  title?: string | null,
  titlePadX?: string | null,
  titlePadY?: string | null,
  description?: string | null,
  content?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  tags?: Array< string | null > | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
};

export type ModelPageConditionInput = {
  alias?: ModelStringInput | null,
  status?: ModelPageStatusInput | null,
  type?: ModelPageTypeInput | null,
  menu?: ModelIDInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  titlePadX?: ModelStringInput | null,
  titlePadY?: ModelStringInput | null,
  description?: ModelStringInput | null,
  content?: ModelStringInput | null,
  contentPadX?: ModelStringInput | null,
  contentPadY?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  changeFreq?: ModelPageChangeFreqInput | null,
  priority?: ModelPagePriorityInput | null,
  optionTitle?: ModelPageOptionTitleInput | null,
  sideColumn?: ModelPageSideColumnInput | null,
  sideColumnPadX?: ModelStringInput | null,
  sideColumnPadY?: ModelStringInput | null,
  sideColumnContent?: ModelStringInput | null,
  optionSideColumn?: ModelPageOptionSideColumnInput | null,
  footerSm?: ModelStringInput | null,
  footerLg?: ModelStringInput | null,
  hideInMenu?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelPageConditionInput | null > | null,
  or?: Array< ModelPageConditionInput | null > | null,
  not?: ModelPageConditionInput | null,
};

export type DeletePageInput = {
  id: string,
};

export type CreateBlockInput = {
  id?: string | null,
  pageID: string,
  order: number,
  component: string,
  content: string,
  config?: string | null,
};

export type ModelBlockConditionInput = {
  pageID?: ModelIDInput | null,
  order?: ModelIntInput | null,
  component?: ModelStringInput | null,
  content?: ModelStringInput | null,
  config?: ModelStringInput | null,
  and?: Array< ModelBlockConditionInput | null > | null,
  or?: Array< ModelBlockConditionInput | null > | null,
  not?: ModelBlockConditionInput | null,
};

export type UpdateBlockInput = {
  id: string,
  pageID?: string | null,
  order?: number | null,
  component?: string | null,
  content?: string | null,
  config?: string | null,
};

export type DeleteBlockInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  alias: string,
  order: number,
  title?: string | null,
  description?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  hide?: boolean | null,
  isSub?: boolean | null,
};

export type ModelCategoryConditionInput = {
  alias?: ModelStringInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  hide?: ModelBooleanInput | null,
  isSub?: ModelBooleanInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  alias?: string | null,
  order?: number | null,
  title?: string | null,
  description?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  hide?: boolean | null,
  isSub?: boolean | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateProductInput = {
  id?: string | null,
  alias: string,
  status: PageStatus,
  category: string,
  subCategory: string,
  type?: string | null,
  relationID?: string | null,
  preparationTime?: number | null,
  code?: string | null,
  name: string,
  description?: string | null,
  contentTitle?: string | null,
  contentTitle2?: string | null,
  contentTitle3?: string | null,
  content?: string | null,
  content2?: string | null,
  content3?: string | null,
  tags?: Array< string | null > | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  price_of?: number | null,
  price: number,
  qty?: number | null,
  stockControl?: boolean | null,
  photo1?: string | null,
  photo2?: string | null,
  photo3?: string | null,
  photo4?: string | null,
  photo5?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  titlePadX?: string | null,
  titlePadY?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
  hideInSearch?: boolean | null,
};

export type ModelProductConditionInput = {
  alias?: ModelStringInput | null,
  status?: ModelPageStatusInput | null,
  category?: ModelIDInput | null,
  subCategory?: ModelIDInput | null,
  type?: ModelStringInput | null,
  relationID?: ModelIDInput | null,
  preparationTime?: ModelIntInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  contentTitle?: ModelStringInput | null,
  contentTitle2?: ModelStringInput | null,
  contentTitle3?: ModelStringInput | null,
  content?: ModelStringInput | null,
  content2?: ModelStringInput | null,
  content3?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  changeFreq?: ModelPageChangeFreqInput | null,
  priority?: ModelPagePriorityInput | null,
  price_of?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  qty?: ModelIntInput | null,
  stockControl?: ModelBooleanInput | null,
  photo1?: ModelStringInput | null,
  photo2?: ModelStringInput | null,
  photo3?: ModelStringInput | null,
  photo4?: ModelStringInput | null,
  photo5?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  titlePadX?: ModelStringInput | null,
  titlePadY?: ModelStringInput | null,
  contentPadX?: ModelStringInput | null,
  contentPadY?: ModelStringInput | null,
  optionTitle?: ModelPageOptionTitleInput | null,
  sideColumn?: ModelPageSideColumnInput | null,
  sideColumnPadX?: ModelStringInput | null,
  sideColumnPadY?: ModelStringInput | null,
  sideColumnContent?: ModelStringInput | null,
  optionSideColumn?: ModelPageOptionSideColumnInput | null,
  footerSm?: ModelStringInput | null,
  footerLg?: ModelStringInput | null,
  hideInMenu?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  hideInSearch?: ModelBooleanInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type UpdateProductInput = {
  id: string,
  alias?: string | null,
  status?: PageStatus | null,
  category?: string | null,
  subCategory?: string | null,
  type?: string | null,
  relationID?: string | null,
  preparationTime?: number | null,
  code?: string | null,
  name?: string | null,
  description?: string | null,
  contentTitle?: string | null,
  contentTitle2?: string | null,
  contentTitle3?: string | null,
  content?: string | null,
  content2?: string | null,
  content3?: string | null,
  tags?: Array< string | null > | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  price_of?: number | null,
  price?: number | null,
  qty?: number | null,
  stockControl?: boolean | null,
  photo1?: string | null,
  photo2?: string | null,
  photo3?: string | null,
  photo4?: string | null,
  photo5?: string | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  titlePadX?: string | null,
  titlePadY?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
  hideInSearch?: boolean | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateOptionInput = {
  id?: string | null,
  productID: string,
  name?: string | null,
  price?: number | null,
};

export type ModelOptionConditionInput = {
  productID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  and?: Array< ModelOptionConditionInput | null > | null,
  or?: Array< ModelOptionConditionInput | null > | null,
  not?: ModelOptionConditionInput | null,
};

export type UpdateOptionInput = {
  id: string,
  productID?: string | null,
  name?: string | null,
  price?: number | null,
};

export type DeleteOptionInput = {
  id: string,
};

export type DeleteCartInput = {
  id: string,
};

export type ModelCartConditionInput = {
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  changeName?: ModelStringInput | null,
  changeDescription?: ModelStringInput | null,
  changeQtyBlend?: ModelIntInput | null,
  changePriceAdjustment?: ModelStringInput | null,
  blendID?: ModelIDInput | null,
  and?: Array< ModelCartConditionInput | null > | null,
  or?: Array< ModelCartConditionInput | null > | null,
  not?: ModelCartConditionInput | null,
};

export type DeleteCartOptionInput = {
  id: string,
};

export type ModelCartOptionConditionInput = {
  cartID?: ModelIDInput | null,
  optionID?: ModelIDInput | null,
  and?: Array< ModelCartOptionConditionInput | null > | null,
  or?: Array< ModelCartOptionConditionInput | null > | null,
  not?: ModelCartOptionConditionInput | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type ModelOrderConditionInput = {
  userID?: ModelIDInput | null,
  status?: ModelOrderStatusInput | null,
  createdAt?: ModelStringInput | null,
  couponID?: ModelIDInput | null,
  couponName?: ModelStringInput | null,
  couponDiscount?: ModelFloatInput | null,
  deliveryPrice?: ModelFloatInput | null,
  total?: ModelFloatInput | null,
  rating?: ModelIntInput | null,
  ratingNotes?: ModelStringInput | null,
  orderPagarmeID?: ModelStringInput | null,
  addressReference?: ModelStringInput | null,
  addressStreet?: ModelStringInput | null,
  addressNumber?: ModelStringInput | null,
  addressComplement?: ModelStringInput | null,
  addressZipcode?: ModelStringInput | null,
  addressNeighborhood?: ModelStringInput | null,
  addressCity?: ModelStringInput | null,
  addressState?: ModelStringInput | null,
  addressCountry?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  qrCodePix?: ModelStringInput | null,
  qrCodePixUrl?: ModelStringInput | null,
  payMethod?: ModelPaymentMethodsInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
};

export type CreateCouponInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  code: string,
  start?: string | null,
  expiration?: string | null,
  discountPercentage?: number | null,
  discountValue?: number | null,
  qtyLimit?: number | null,
  qtyUsed?: number | null,
  qtyProduct?: number | null,
  qtyProductUsed?: number | null,
  search?: string | null,
};

export type ModelCouponConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  code?: ModelStringInput | null,
  start?: ModelStringInput | null,
  expiration?: ModelStringInput | null,
  discountPercentage?: ModelIntInput | null,
  discountValue?: ModelFloatInput | null,
  qtyLimit?: ModelIntInput | null,
  qtyUsed?: ModelIntInput | null,
  qtyProduct?: ModelIntInput | null,
  qtyProductUsed?: ModelIntInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelCouponConditionInput | null > | null,
  or?: Array< ModelCouponConditionInput | null > | null,
  not?: ModelCouponConditionInput | null,
};

export type DeleteCouponInput = {
  id: string,
};

export type CreateDeliveryMethodOrderInput = {
  id?: string | null,
  name?: string | null,
  zipCode?: Array< string | null > | null,
  price?: number | null,
  time?: number | null,
};

export type ModelDeliveryMethodOrderConditionInput = {
  name?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  time?: ModelIntInput | null,
  and?: Array< ModelDeliveryMethodOrderConditionInput | null > | null,
  or?: Array< ModelDeliveryMethodOrderConditionInput | null > | null,
  not?: ModelDeliveryMethodOrderConditionInput | null,
};

export type DeliveryMethodOrder = {
  __typename: "DeliveryMethodOrder",
  id: string,
  name?: string | null,
  zipCode?: Array< string | null > | null,
  price?: number | null,
  time?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDeliveryMethodOrderInput = {
  id: string,
  name?: string | null,
  zipCode?: Array< string | null > | null,
  price?: number | null,
  time?: number | null,
};

export type DeleteDeliveryMethodOrderInput = {
  id: string,
};

export type CreateQrCodeScanInput = {
  id?: string | null,
  userID: string,
  relationID: string,
  uuid?: string | null,
  createdAt?: string | null,
};

export type ModelQrCodeScanConditionInput = {
  userID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  uuid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelQrCodeScanConditionInput | null > | null,
  or?: Array< ModelQrCodeScanConditionInput | null > | null,
  not?: ModelQrCodeScanConditionInput | null,
};

export type QrCodeScan = {
  __typename: "QrCodeScan",
  id: string,
  userID: string,
  relationID: string,
  uuid?: string | null,
  createdAt?: string | null,
  updatedAt: string,
};

export type CreateQuizInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  search?: string | null,
  status: QuizStatus,
};

export enum QuizStatus {
  ON = "ON",
  OFF = "OFF",
}


export type ModelQuizConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  search?: ModelStringInput | null,
  status?: ModelQuizStatusInput | null,
  and?: Array< ModelQuizConditionInput | null > | null,
  or?: Array< ModelQuizConditionInput | null > | null,
  not?: ModelQuizConditionInput | null,
};

export type ModelQuizStatusInput = {
  eq?: QuizStatus | null,
  ne?: QuizStatus | null,
};

export type Quiz = {
  __typename: "Quiz",
  id: string,
  name: string,
  description?: string | null,
  search?: string | null,
  questions?: ModelQuizQuestionConnection | null,
  status: QuizStatus,
  createdAt: string,
  updatedAt: string,
};

export type ModelQuizQuestionConnection = {
  __typename: "ModelQuizQuestionConnection",
  items:  Array<QuizQuestion | null >,
  nextToken?: string | null,
};

export type QuizQuestion = {
  __typename: "QuizQuestion",
  id: string,
  quizID: string,
  question: string,
  image?: string | null,
  alternativeA: string,
  alternativeB: string,
  alternativeC?: string | null,
  alternativeD?: string | null,
  alternativeE?: string | null,
  alternativeCorrect: string,
  order?: number | null,
  search?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuizInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  search?: string | null,
  status?: QuizStatus | null,
};

export type DeleteQuizInput = {
  id: string,
};

export type CreateQuizQuestionInput = {
  id?: string | null,
  quizID: string,
  question: string,
  image?: string | null,
  alternativeA: string,
  alternativeB: string,
  alternativeC?: string | null,
  alternativeD?: string | null,
  alternativeE?: string | null,
  alternativeCorrect: string,
  order?: number | null,
  search?: string | null,
};

export type ModelQuizQuestionConditionInput = {
  quizID?: ModelIDInput | null,
  question?: ModelStringInput | null,
  image?: ModelStringInput | null,
  alternativeA?: ModelStringInput | null,
  alternativeB?: ModelStringInput | null,
  alternativeC?: ModelStringInput | null,
  alternativeD?: ModelStringInput | null,
  alternativeE?: ModelStringInput | null,
  alternativeCorrect?: ModelStringInput | null,
  order?: ModelIntInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelQuizQuestionConditionInput | null > | null,
  or?: Array< ModelQuizQuestionConditionInput | null > | null,
  not?: ModelQuizQuestionConditionInput | null,
};

export type UpdateQuizQuestionInput = {
  id: string,
  quizID?: string | null,
  question?: string | null,
  image?: string | null,
  alternativeA?: string | null,
  alternativeB?: string | null,
  alternativeC?: string | null,
  alternativeD?: string | null,
  alternativeE?: string | null,
  alternativeCorrect?: string | null,
  order?: number | null,
  search?: string | null,
};

export type DeleteQuizQuestionInput = {
  id: string,
};

export type CreateVideoObjectInput = {
  id?: string | null,
  token?: string | null,
};

export type ModelVideoObjectConditionInput = {
  token?: ModelStringInput | null,
  and?: Array< ModelVideoObjectConditionInput | null > | null,
  or?: Array< ModelVideoObjectConditionInput | null > | null,
  not?: ModelVideoObjectConditionInput | null,
};

export type UpdateVideoObjectInput = {
  id: string,
  token?: string | null,
};

export type DeleteVideoObjectInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email?: string | null,
  phone?: string | null,
  status?: UserStatus | null,
  active?: boolean | null,
  avatar?: string | null,
  search?: string | null,
  createdAt?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  status?: ModelUserStatusInput | null,
  active?: ModelBooleanInput | null,
  avatar?: ModelStringInput | null,
  search?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  status?: UserStatus | null,
  active?: boolean | null,
  avatar?: string | null,
  search?: string | null,
  createdAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateProfileInput = {
  userID: string,
  doc?: string | null,
  docType?: DocTypes | null,
  docProfession?: string | null,
  profession?: string | null,
  specialties?: string | null,
  subSpecialties?: string | null,
  bio?: string | null,
  gender?: GenderOptions | null,
  birth?: string | null,
  birthDay?: string | null,
  notes?: string | null,
  urlUserName?: string | null,
  urlEnable?: boolean | null,
  allowViewEmail?: boolean | null,
  allowViewPhone?: boolean | null,
  allowCookiesPreference?: boolean | null,
  allowCookiesStatistic?: boolean | null,
  pix?: string | null,
  zipCodeCoverage?: Array< string | null > | null,
  schedulesSunday?: Array< string | null > | null,
  schedulesMonday?: Array< string | null > | null,
  schedulesTuesday?: Array< string | null > | null,
  schedulesWednesday?: Array< string | null > | null,
  schedulesThursday?: Array< string | null > | null,
  schedulesFriday?: Array< string | null > | null,
  schedulesSaturday?: Array< string | null > | null,
  customerPagarmeID?: string | null,
  uuid?: string | null,
};

export type ModelProfileConditionInput = {
  doc?: ModelStringInput | null,
  docType?: ModelDocTypesInput | null,
  docProfession?: ModelStringInput | null,
  profession?: ModelStringInput | null,
  specialties?: ModelStringInput | null,
  subSpecialties?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  gender?: ModelGenderOptionsInput | null,
  birth?: ModelStringInput | null,
  birthDay?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  urlUserName?: ModelStringInput | null,
  urlEnable?: ModelBooleanInput | null,
  allowViewEmail?: ModelBooleanInput | null,
  allowViewPhone?: ModelBooleanInput | null,
  allowCookiesPreference?: ModelBooleanInput | null,
  allowCookiesStatistic?: ModelBooleanInput | null,
  pix?: ModelStringInput | null,
  zipCodeCoverage?: ModelStringInput | null,
  schedulesSunday?: ModelStringInput | null,
  schedulesMonday?: ModelStringInput | null,
  schedulesTuesday?: ModelStringInput | null,
  schedulesWednesday?: ModelStringInput | null,
  schedulesThursday?: ModelStringInput | null,
  schedulesFriday?: ModelStringInput | null,
  schedulesSaturday?: ModelStringInput | null,
  customerPagarmeID?: ModelStringInput | null,
  uuid?: ModelStringInput | null,
  and?: Array< ModelProfileConditionInput | null > | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  not?: ModelProfileConditionInput | null,
};

export type ModelDocTypesInput = {
  eq?: DocTypes | null,
  ne?: DocTypes | null,
};

export type ModelGenderOptionsInput = {
  eq?: GenderOptions | null,
  ne?: GenderOptions | null,
};

export type UpdateProfileInput = {
  userID: string,
  doc?: string | null,
  docType?: DocTypes | null,
  docProfession?: string | null,
  profession?: string | null,
  specialties?: string | null,
  subSpecialties?: string | null,
  bio?: string | null,
  gender?: GenderOptions | null,
  birth?: string | null,
  birthDay?: string | null,
  notes?: string | null,
  urlUserName?: string | null,
  urlEnable?: boolean | null,
  allowViewEmail?: boolean | null,
  allowViewPhone?: boolean | null,
  allowCookiesPreference?: boolean | null,
  allowCookiesStatistic?: boolean | null,
  pix?: string | null,
  zipCodeCoverage?: Array< string | null > | null,
  schedulesSunday?: Array< string | null > | null,
  schedulesMonday?: Array< string | null > | null,
  schedulesTuesday?: Array< string | null > | null,
  schedulesWednesday?: Array< string | null > | null,
  schedulesThursday?: Array< string | null > | null,
  schedulesFriday?: Array< string | null > | null,
  schedulesSaturday?: Array< string | null > | null,
  customerPagarmeID?: string | null,
  uuid?: string | null,
};

export type DeleteProfileInput = {
  userID: string,
};

export type CreateAddressInput = {
  id?: string | null,
  userID: string,
  name?: string | null,
  reference?: string | null,
  street?: string | null,
  number?: string | null,
  complement?: string | null,
  zipcode?: string | null,
  neighborhood?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  addressPagarmeID?: string | null,
};

export type UpdateAddressInput = {
  id: string,
  userID?: string | null,
  name?: string | null,
  reference?: string | null,
  street?: string | null,
  number?: string | null,
  complement?: string | null,
  zipcode?: string | null,
  neighborhood?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  addressPagarmeID?: string | null,
};

export type CreatePayMethodInput = {
  id?: string | null,
  userID: string,
  method: PaymentMethods,
  number?: string | null,
  holderName?: string | null,
  holderDocument?: string | null,
  expMonth?: number | null,
  expYear?: number | null,
  cvv?: string | null,
  brand?: string | null,
  label?: string | null,
  cardPagarmeID?: string | null,
};

export type UpdatePayMethodInput = {
  id: string,
  userID?: string | null,
  method?: PaymentMethods | null,
  number?: string | null,
  holderName?: string | null,
  holderDocument?: string | null,
  expMonth?: number | null,
  expYear?: number | null,
  cvv?: string | null,
  brand?: string | null,
  label?: string | null,
  cardPagarmeID?: string | null,
};

export type CreateLogInput = {
  id?: string | null,
  userID: string,
  tag: string,
  source: LogSource,
  notes?: string | null,
  message?: string | null,
  page?: string | null,
  manufacturer?: string | null,
  model?: string | null,
  osName?: string | null,
  osVersion?: string | null,
  platform?: string | null,
  uuid?: string | null,
  ip?: string | null,
  city?: string | null,
  region?: string | null,
  country?: string | null,
  provider?: string | null,
  lat?: number | null,
  lng?: number | null,
  createdAt?: string | null,
};

export type ModelLogConditionInput = {
  userID?: ModelIDInput | null,
  tag?: ModelStringInput | null,
  source?: ModelLogSourceInput | null,
  notes?: ModelStringInput | null,
  message?: ModelStringInput | null,
  page?: ModelStringInput | null,
  manufacturer?: ModelStringInput | null,
  model?: ModelStringInput | null,
  osName?: ModelStringInput | null,
  osVersion?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  uuid?: ModelStringInput | null,
  ip?: ModelStringInput | null,
  city?: ModelStringInput | null,
  region?: ModelStringInput | null,
  country?: ModelStringInput | null,
  provider?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelLogConditionInput | null > | null,
  or?: Array< ModelLogConditionInput | null > | null,
  not?: ModelLogConditionInput | null,
};

export type UpdateInviteInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  email?: string | null,
  phone?: string | null,
  groups?: Array< string | null > | null,
  status?: InviteStatus | null,
  createdAt?: string | null,
};

export type CreateDataBaseInput = {
  id?: string | null,
  name: string,
};

export type CreateDataBaseItemInput = {
  id?: string | null,
  dataBaseID: string,
  userID: string,
  data: string,
  status: DataBaseItemStatus,
  search?: string | null,
  notes?: string | null,
  createdAt?: string | null,
};

export type CreateFavoriteInput = {
  id?: string | null,
  userID: string,
  type: string,
  favoriteID: string,
  link: string,
  content?: string | null,
  productID?: string | null,
  relationID?: string | null,
  pageID?: string | null,
};

export type ModelFavoriteConditionInput = {
  userID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  favoriteID?: ModelStringInput | null,
  link?: ModelStringInput | null,
  content?: ModelStringInput | null,
  productID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  pageID?: ModelIDInput | null,
  and?: Array< ModelFavoriteConditionInput | null > | null,
  or?: Array< ModelFavoriteConditionInput | null > | null,
  not?: ModelFavoriteConditionInput | null,
};

export type Favorite = {
  __typename: "Favorite",
  id: string,
  userID: string,
  user?: User | null,
  type: string,
  favoriteID: string,
  link: string,
  content?: string | null,
  productID?: string | null,
  product?: Product | null,
  relationID?: string | null,
  relation?: Relation | null,
  pageID?: string | null,
  page?: Page | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFavoriteInput = {
  id: string,
  userID?: string | null,
  type?: string | null,
  favoriteID?: string | null,
  link?: string | null,
  content?: string | null,
  productID?: string | null,
  relationID?: string | null,
  pageID?: string | null,
};

export type DeleteFavoriteInput = {
  id: string,
};

export type CreateRelationInput = {
  id?: string | null,
  type: string,
  mode: RelationModes,
  name?: string | null,
  description?: string | null,
  avatar?: string | null,
  reference?: string | null,
  members: Array< string >,
  admins: Array< string >,
  updatedAt?: string | null,
  status: string,
  search?: string | null,
  config?: string | null,
};

export type ModelRelationConditionInput = {
  type?: ModelStringInput | null,
  mode?: ModelRelationModesInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  reference?: ModelStringInput | null,
  members?: ModelStringInput | null,
  admins?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  status?: ModelStringInput | null,
  search?: ModelStringInput | null,
  config?: ModelStringInput | null,
  and?: Array< ModelRelationConditionInput | null > | null,
  or?: Array< ModelRelationConditionInput | null > | null,
  not?: ModelRelationConditionInput | null,
};

export type UpdateRelationInput = {
  id: string,
  type?: string | null,
  mode?: RelationModes | null,
  name?: string | null,
  description?: string | null,
  avatar?: string | null,
  reference?: string | null,
  members?: Array< string > | null,
  admins?: Array< string > | null,
  updatedAt?: string | null,
  status?: string | null,
  search?: string | null,
  config?: string | null,
};

export type DeleteRelationInput = {
  id: string,
};

export type CreateRelationLinkInput = {
  id?: string | null,
  userID: string,
  relationID: string,
  type: string,
  notify: number,
  updatedAt?: string | null,
  search?: string | null,
  percentage?: number | null,
};

export type ModelRelationLinkConditionInput = {
  userID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  notify?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  search?: ModelStringInput | null,
  percentage?: ModelIntInput | null,
  and?: Array< ModelRelationLinkConditionInput | null > | null,
  or?: Array< ModelRelationLinkConditionInput | null > | null,
  not?: ModelRelationLinkConditionInput | null,
};

export type UpdateRelationLinkInput = {
  id: string,
  userID?: string | null,
  relationID?: string | null,
  type?: string | null,
  notify?: number | null,
  updatedAt?: string | null,
  search?: string | null,
  percentage?: number | null,
};

export type DeleteRelationLinkInput = {
  id: string,
};

export type CreateNotifyInput = {
  id?: string | null,
  userID: string,
  date: string,
  content?: string | null,
  link?: string | null,
  viewed?: boolean | null,
};

export type ModelNotifyConditionInput = {
  userID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  content?: ModelStringInput | null,
  link?: ModelStringInput | null,
  viewed?: ModelBooleanInput | null,
  and?: Array< ModelNotifyConditionInput | null > | null,
  or?: Array< ModelNotifyConditionInput | null > | null,
  not?: ModelNotifyConditionInput | null,
};

export type Notify = {
  __typename: "Notify",
  id: string,
  userID: string,
  date: string,
  content?: string | null,
  link?: string | null,
  viewed?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteNotifyInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  relationID?: string | null,
  restrictedContentID?: string | null,
  userID: string,
  type: MessagesTypes,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  status?: string | null,
};

export type ModelMessageConditionInput = {
  relationID?: ModelIDInput | null,
  restrictedContentID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  type?: ModelMessagesTypesInput | null,
  content?: ModelStringInput | null,
  search?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
};

export type UpdateMessageInput = {
  id: string,
  relationID?: string | null,
  restrictedContentID?: string | null,
  userID?: string | null,
  type?: MessagesTypes | null,
  content?: string | null,
  search?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  status?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreateScheduleInput = {
  id?: string | null,
  relationID: string,
  userID: string,
  dateTime?: string | null,
  title?: string | null,
  description?: string | null,
  link?: string | null,
  frequency?: ScheduleFrequencies | null,
  createdAt?: string | null,
  viewType?: string | null,
};

export type ModelScheduleConditionInput = {
  relationID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  dateTime?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  frequency?: ModelScheduleFrequenciesInput | null,
  createdAt?: ModelStringInput | null,
  viewType?: ModelStringInput | null,
  and?: Array< ModelScheduleConditionInput | null > | null,
  or?: Array< ModelScheduleConditionInput | null > | null,
  not?: ModelScheduleConditionInput | null,
};

export type ModelScheduleFrequenciesInput = {
  eq?: ScheduleFrequencies | null,
  ne?: ScheduleFrequencies | null,
};

export type UpdateScheduleInput = {
  id: string,
  relationID?: string | null,
  userID?: string | null,
  dateTime?: string | null,
  title?: string | null,
  description?: string | null,
  link?: string | null,
  frequency?: ScheduleFrequencies | null,
  createdAt?: string | null,
  viewType?: string | null,
};

export type DeleteScheduleInput = {
  id: string,
};

export type CreateDocumentInput = {
  id?: string | null,
  relationID: string,
  ownerID: string,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  conclusion?: string | null,
  content?: string | null,
  fileKey?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateDocumentInput = {
  id: string,
  relationID?: string | null,
  ownerID?: string | null,
  title?: string | null,
  description?: string | null,
  notes?: string | null,
  conclusion?: string | null,
  content?: string | null,
  fileKey?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type CreateRestrictedContentViewInput = {
  id?: string | null,
  restrictedContentID: string,
  userID: string,
  percentage?: number | null,
  rating?: number | null,
};

export type ModelRestrictedContentViewConditionInput = {
  restrictedContentID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  percentage?: ModelIntInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelRestrictedContentViewConditionInput | null > | null,
  or?: Array< ModelRestrictedContentViewConditionInput | null > | null,
  not?: ModelRestrictedContentViewConditionInput | null,
};

export type UpdateRestrictedContentViewInput = {
  id: string,
  restrictedContentID?: string | null,
  userID?: string | null,
  percentage?: number | null,
  rating?: number | null,
};

export type CreatePageInput = {
  id?: string | null,
  alias: string,
  status: PageStatus,
  type: PageType,
  menu: string,
  order: number,
  title: string,
  titlePadX?: string | null,
  titlePadY?: string | null,
  description?: string | null,
  content?: string | null,
  contentPadX?: string | null,
  contentPadY?: string | null,
  tags?: Array< string | null > | null,
  thumbnail?: string | null,
  thumbnailSrc?: string | null,
  thumbnailCropper?: string | null,
  changeFreq?: PageChangeFreq | null,
  priority?: PagePriority | null,
  optionTitle?: PageOptionTitle | null,
  sideColumn?: PageSideColumn | null,
  sideColumnPadX?: string | null,
  sideColumnPadY?: string | null,
  sideColumnContent?: string | null,
  optionSideColumn?: PageOptionSideColumn | null,
  footerSm?: string | null,
  footerLg?: string | null,
  hideInMenu?: boolean | null,
  createdAt?: string | null,
  search?: string | null,
};

export type CreateCartInput = {
  id?: string | null,
  userID: string,
  productID: string,
  qty?: number | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
};

export type UpdateCartInput = {
  id: string,
  userID?: string | null,
  productID?: string | null,
  qty?: number | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
};

export type CreateCartOptionInput = {
  id?: string | null,
  cartID: string,
  optionID: string,
};

export type UpdateCartOptionInput = {
  id: string,
  cartID?: string | null,
  optionID?: string | null,
};

export type CreateOrderInput = {
  id?: string | null,
  userID: string,
  status: OrderStatus,
  createdAt?: string | null,
  couponID?: string | null,
  couponName?: string | null,
  couponDiscount?: number | null,
  deliveryPrice?: number | null,
  total?: number | null,
  rating?: number | null,
  ratingNotes?: string | null,
  orderPagarmeID?: string | null,
  addressReference?: string | null,
  addressStreet?: string | null,
  addressNumber?: string | null,
  addressComplement?: string | null,
  addressZipcode?: string | null,
  addressNeighborhood?: string | null,
  addressCity?: string | null,
  addressState?: string | null,
  addressCountry?: string | null,
  notes?: string | null,
  qrCodePix?: string | null,
  qrCodePixUrl?: string | null,
  payMethod?: PaymentMethods | null,
};

export type UpdateOrderInput = {
  id: string,
  userID?: string | null,
  status?: OrderStatus | null,
  createdAt?: string | null,
  couponID?: string | null,
  couponName?: string | null,
  couponDiscount?: number | null,
  deliveryPrice?: number | null,
  total?: number | null,
  rating?: number | null,
  ratingNotes?: string | null,
  orderPagarmeID?: string | null,
  addressReference?: string | null,
  addressStreet?: string | null,
  addressNumber?: string | null,
  addressComplement?: string | null,
  addressZipcode?: string | null,
  addressNeighborhood?: string | null,
  addressCity?: string | null,
  addressState?: string | null,
  addressCountry?: string | null,
  notes?: string | null,
  qrCodePix?: string | null,
  qrCodePixUrl?: string | null,
  payMethod?: PaymentMethods | null,
};

export type CreateOrderItemInput = {
  id?: string | null,
  orderID: string,
  productID: string,
  qty: number,
  code?: string | null,
  name: string,
  description?: string | null,
  price: number,
  photo1?: string | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
  changeNameAdmin?: string | null,
};

export type ModelOrderItemConditionInput = {
  orderID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  photo1?: ModelStringInput | null,
  changeName?: ModelStringInput | null,
  changeDescription?: ModelStringInput | null,
  changeQtyBlend?: ModelIntInput | null,
  changePriceAdjustment?: ModelStringInput | null,
  blendID?: ModelIDInput | null,
  changeNameAdmin?: ModelStringInput | null,
  and?: Array< ModelOrderItemConditionInput | null > | null,
  or?: Array< ModelOrderItemConditionInput | null > | null,
  not?: ModelOrderItemConditionInput | null,
};

export type UpdateOrderItemInput = {
  id: string,
  orderID?: string | null,
  productID?: string | null,
  qty?: number | null,
  code?: string | null,
  name?: string | null,
  description?: string | null,
  price?: number | null,
  photo1?: string | null,
  changeName?: string | null,
  changeDescription?: string | null,
  changeQtyBlend?: number | null,
  changePriceAdjustment?: string | null,
  blendID?: string | null,
  changeNameAdmin?: string | null,
};

export type DeleteOrderItemInput = {
  id: string,
};

export type CreateOrderItemOptionInput = {
  id?: string | null,
  orderItemID: string,
  optionID: string,
};

export type ModelOrderItemOptionConditionInput = {
  orderItemID?: ModelIDInput | null,
  optionID?: ModelIDInput | null,
  and?: Array< ModelOrderItemOptionConditionInput | null > | null,
  or?: Array< ModelOrderItemOptionConditionInput | null > | null,
  not?: ModelOrderItemOptionConditionInput | null,
};

export type UpdateOrderItemOptionInput = {
  id: string,
  orderItemID?: string | null,
  optionID?: string | null,
};

export type DeleteOrderItemOptionInput = {
  id: string,
};

export type UpdateCouponInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  code?: string | null,
  start?: string | null,
  expiration?: string | null,
  discountPercentage?: number | null,
  discountValue?: number | null,
  qtyLimit?: number | null,
  qtyUsed?: number | null,
  qtyProduct?: number | null,
  qtyProductUsed?: number | null,
  search?: string | null,
};

export type CreateCouponProductInput = {
  id?: string | null,
  couponID: string,
  productID: string,
  price?: number | null,
  limit?: number | null,
};

export type ModelCouponProductConditionInput = {
  couponID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  price?: ModelFloatInput | null,
  limit?: ModelIntInput | null,
  and?: Array< ModelCouponProductConditionInput | null > | null,
  or?: Array< ModelCouponProductConditionInput | null > | null,
  not?: ModelCouponProductConditionInput | null,
};

export type UpdateCouponProductInput = {
  id: string,
  couponID?: string | null,
  productID?: string | null,
  price?: number | null,
  limit?: number | null,
};

export type DeleteCouponProductInput = {
  id: string,
};

export type CreateCouponUsedInput = {
  id?: string | null,
  couponID: string,
  userID: string,
  qty?: number | null,
};

export type ModelCouponUsedConditionInput = {
  couponID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  and?: Array< ModelCouponUsedConditionInput | null > | null,
  or?: Array< ModelCouponUsedConditionInput | null > | null,
  not?: ModelCouponUsedConditionInput | null,
};

export type CreateDeliveryOrderInput = {
  id?: string | null,
  orderID: string,
  date: string,
  deliveryUserID: string,
  status: DeliveryStatus,
};

export type ModelDeliveryOrderConditionInput = {
  orderID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  deliveryUserID?: ModelIDInput | null,
  status?: ModelDeliveryStatusInput | null,
  and?: Array< ModelDeliveryOrderConditionInput | null > | null,
  or?: Array< ModelDeliveryOrderConditionInput | null > | null,
  not?: ModelDeliveryOrderConditionInput | null,
};

export type UpdateDeliveryOrderInput = {
  id: string,
  orderID?: string | null,
  date?: string | null,
  deliveryUserID?: string | null,
  status?: DeliveryStatus | null,
};

export type DeleteDeliveryOrderInput = {
  id: string,
};

export type ModelFolderFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelFolderFilterInput | null > | null,
  or?: Array< ModelFolderFilterInput | null > | null,
  not?: ModelFolderFilterInput | null,
};

export type ModelFolderConnection = {
  __typename: "ModelFolderConnection",
  items:  Array<Folder | null >,
  nextToken?: string | null,
};

export type ModelVideoObjectFilterInput = {
  id?: ModelIDInput | null,
  token?: ModelStringInput | null,
  and?: Array< ModelVideoObjectFilterInput | null > | null,
  or?: Array< ModelVideoObjectFilterInput | null > | null,
  not?: ModelVideoObjectFilterInput | null,
};

export type ModelVideoObjectConnection = {
  __typename: "ModelVideoObjectConnection",
  items:  Array<VideoObject | null >,
  nextToken?: string | null,
};

export type ModelProfileFilterInput = {
  userID?: ModelIDInput | null,
  doc?: ModelStringInput | null,
  docType?: ModelDocTypesInput | null,
  docProfession?: ModelStringInput | null,
  profession?: ModelStringInput | null,
  specialties?: ModelStringInput | null,
  subSpecialties?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  gender?: ModelGenderOptionsInput | null,
  birth?: ModelStringInput | null,
  birthDay?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  urlUserName?: ModelStringInput | null,
  urlEnable?: ModelBooleanInput | null,
  allowViewEmail?: ModelBooleanInput | null,
  allowViewPhone?: ModelBooleanInput | null,
  allowCookiesPreference?: ModelBooleanInput | null,
  allowCookiesStatistic?: ModelBooleanInput | null,
  pix?: ModelStringInput | null,
  zipCodeCoverage?: ModelStringInput | null,
  schedulesSunday?: ModelStringInput | null,
  schedulesMonday?: ModelStringInput | null,
  schedulesTuesday?: ModelStringInput | null,
  schedulesWednesday?: ModelStringInput | null,
  schedulesThursday?: ModelStringInput | null,
  schedulesFriday?: ModelStringInput | null,
  schedulesSaturday?: ModelStringInput | null,
  customerPagarmeID?: ModelStringInput | null,
  uuid?: ModelStringInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  not?: ModelProfileFilterInput | null,
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection",
  items:  Array<Profile | null >,
  nextToken?: string | null,
};

export type ModelAddressFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  reference?: ModelStringInput | null,
  street?: ModelStringInput | null,
  number?: ModelStringInput | null,
  complement?: ModelStringInput | null,
  zipcode?: ModelStringInput | null,
  neighborhood?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  country?: ModelStringInput | null,
  addressPagarmeID?: ModelStringInput | null,
  and?: Array< ModelAddressFilterInput | null > | null,
  or?: Array< ModelAddressFilterInput | null > | null,
  not?: ModelAddressFilterInput | null,
};

export type ModelPayMethodFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  method?: ModelPaymentMethodsInput | null,
  number?: ModelStringInput | null,
  holderName?: ModelStringInput | null,
  holderDocument?: ModelStringInput | null,
  expMonth?: ModelIntInput | null,
  expYear?: ModelIntInput | null,
  cvv?: ModelStringInput | null,
  brand?: ModelStringInput | null,
  label?: ModelStringInput | null,
  cardPagarmeID?: ModelStringInput | null,
  and?: Array< ModelPayMethodFilterInput | null > | null,
  or?: Array< ModelPayMethodFilterInput | null > | null,
  not?: ModelPayMethodFilterInput | null,
};

export type ModelInviteFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  status?: ModelInviteStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelInviteFilterInput | null > | null,
  or?: Array< ModelInviteFilterInput | null > | null,
  not?: ModelInviteFilterInput | null,
};

export type ModelInviteConnection = {
  __typename: "ModelInviteConnection",
  items:  Array<Invite | null >,
  nextToken?: string | null,
};

export type ModelDataBaseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelDataBaseFilterInput | null > | null,
  or?: Array< ModelDataBaseFilterInput | null > | null,
  not?: ModelDataBaseFilterInput | null,
};

export type ModelDataBaseConnection = {
  __typename: "ModelDataBaseConnection",
  items:  Array<DataBase | null >,
  nextToken?: string | null,
};

export type ModelMidiaFilterInput = {
  id?: ModelIDInput | null,
  key?: ModelStringInput | null,
  type?: ModelMidiaTypesInput | null,
  title?: ModelStringInput | null,
  subTitle?: ModelStringInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  identifyText?: ModelStringInput | null,
  and?: Array< ModelMidiaFilterInput | null > | null,
  or?: Array< ModelMidiaFilterInput | null > | null,
  not?: ModelMidiaFilterInput | null,
};

export type ModelMidiaConnection = {
  __typename: "ModelMidiaConnection",
  items:  Array<Midia | null >,
  nextToken?: string | null,
};

export type ModelFavoriteFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  favoriteID?: ModelStringInput | null,
  link?: ModelStringInput | null,
  content?: ModelStringInput | null,
  productID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  pageID?: ModelIDInput | null,
  and?: Array< ModelFavoriteFilterInput | null > | null,
  or?: Array< ModelFavoriteFilterInput | null > | null,
  not?: ModelFavoriteFilterInput | null,
};

export type ModelFavoriteConnection = {
  __typename: "ModelFavoriteConnection",
  items:  Array<Favorite | null >,
  nextToken?: string | null,
};

export type ModelRelationRelationsByStatusTypeNameCompositeKeyConditionInput = {
  eq?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
  le?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
  lt?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
  ge?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
  gt?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
  between?: Array< ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null > | null,
  beginsWith?: ModelRelationRelationsByStatusTypeNameCompositeKeyInput | null,
};

export type ModelRelationRelationsByStatusTypeNameCompositeKeyInput = {
  type?: string | null,
  name?: string | null,
};

export type ModelNotifyFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  content?: ModelStringInput | null,
  link?: ModelStringInput | null,
  viewed?: ModelBooleanInput | null,
  and?: Array< ModelNotifyFilterInput | null > | null,
  or?: Array< ModelNotifyFilterInput | null > | null,
  not?: ModelNotifyFilterInput | null,
};

export type ModelNotifyConnection = {
  __typename: "ModelNotifyConnection",
  items:  Array<Notify | null >,
  nextToken?: string | null,
};

export type ModelScheduleFilterInput = {
  id?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  dateTime?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  frequency?: ModelScheduleFrequenciesInput | null,
  createdAt?: ModelStringInput | null,
  viewType?: ModelStringInput | null,
  and?: Array< ModelScheduleFilterInput | null > | null,
  or?: Array< ModelScheduleFilterInput | null > | null,
  not?: ModelScheduleFilterInput | null,
};

export type ModelDocumentFilterInput = {
  id?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  conclusion?: ModelStringInput | null,
  content?: ModelStringInput | null,
  fileKey?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDocumentFilterInput | null > | null,
  or?: Array< ModelDocumentFilterInput | null > | null,
  not?: ModelDocumentFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelRestrictedContentFilterInput = {
  id?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  order?: ModelIntInput | null,
  group?: ModelStringInput | null,
  subGroup?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  type?: ModelRestrictedContentTypesInput | null,
  isAWSVDO?: ModelBooleanInput | null,
  thumbnail?: ModelStringInput | null,
  content?: ModelStringInput | null,
  search?: ModelStringInput | null,
  identityId?: ModelStringInput | null,
  lifetime?: ModelStringInput | null,
  start?: ModelStringInput | null,
  expiration?: ModelStringInput | null,
  percentage?: ModelIntInput | null,
  and?: Array< ModelRestrictedContentFilterInput | null > | null,
  or?: Array< ModelRestrictedContentFilterInput | null > | null,
  not?: ModelRestrictedContentFilterInput | null,
};

export type ModelRestrictedContentViewFilterInput = {
  id?: ModelIDInput | null,
  restrictedContentID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  percentage?: ModelIntInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelRestrictedContentViewFilterInput | null > | null,
  or?: Array< ModelRestrictedContentViewFilterInput | null > | null,
  not?: ModelRestrictedContentViewFilterInput | null,
};

export type ModelMenuFilterInput = {
  id?: ModelIDInput | null,
  alias?: ModelStringInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  orderDesc?: ModelBooleanInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  showDescriptionPage?: ModelStringInput | null,
  showThumbnailPage?: ModelStringInput | null,
  hide?: ModelBooleanInput | null,
  and?: Array< ModelMenuFilterInput | null > | null,
  or?: Array< ModelMenuFilterInput | null > | null,
  not?: ModelMenuFilterInput | null,
};

export type ModelMenuConnection = {
  __typename: "ModelMenuConnection",
  items:  Array<Menu | null >,
  nextToken?: string | null,
};

export type ModelBlockFilterInput = {
  id?: ModelIDInput | null,
  pageID?: ModelIDInput | null,
  order?: ModelIntInput | null,
  component?: ModelStringInput | null,
  content?: ModelStringInput | null,
  config?: ModelStringInput | null,
  and?: Array< ModelBlockFilterInput | null > | null,
  or?: Array< ModelBlockFilterInput | null > | null,
  not?: ModelBlockFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  alias?: ModelStringInput | null,
  order?: ModelIntInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnail?: ModelStringInput | null,
  thumbnailSrc?: ModelStringInput | null,
  thumbnailCropper?: ModelStringInput | null,
  hide?: ModelBooleanInput | null,
  isSub?: ModelBooleanInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelOptionFilterInput = {
  id?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  and?: Array< ModelOptionFilterInput | null > | null,
  or?: Array< ModelOptionFilterInput | null > | null,
  not?: ModelOptionFilterInput | null,
};

export type ModelCartOptionFilterInput = {
  id?: ModelIDInput | null,
  cartID?: ModelIDInput | null,
  optionID?: ModelIDInput | null,
  and?: Array< ModelCartOptionFilterInput | null > | null,
  or?: Array< ModelCartOptionFilterInput | null > | null,
  not?: ModelCartOptionFilterInput | null,
};

export type ModelOrderOrdersByUserStatusCreatedAtCompositeKeyConditionInput = {
  eq?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
  le?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
  lt?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
  ge?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
  gt?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
  between?: Array< ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput | null,
};

export type ModelOrderOrdersByUserStatusCreatedAtCompositeKeyInput = {
  status?: OrderStatus | null,
  createdAt?: string | null,
};

export type ModelOrderItemFilterInput = {
  id?: ModelIDInput | null,
  orderID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  qty?: ModelIntInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  photo1?: ModelStringInput | null,
  changeName?: ModelStringInput | null,
  changeDescription?: ModelStringInput | null,
  changeQtyBlend?: ModelIntInput | null,
  changePriceAdjustment?: ModelStringInput | null,
  blendID?: ModelIDInput | null,
  changeNameAdmin?: ModelStringInput | null,
  and?: Array< ModelOrderItemFilterInput | null > | null,
  or?: Array< ModelOrderItemFilterInput | null > | null,
  not?: ModelOrderItemFilterInput | null,
};

export type ModelOrderItemOptionFilterInput = {
  id?: ModelIDInput | null,
  orderItemID?: ModelIDInput | null,
  optionID?: ModelIDInput | null,
  and?: Array< ModelOrderItemOptionFilterInput | null > | null,
  or?: Array< ModelOrderItemOptionFilterInput | null > | null,
  not?: ModelOrderItemOptionFilterInput | null,
};

export type ModelCouponProductFilterInput = {
  id?: ModelIDInput | null,
  couponID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  price?: ModelFloatInput | null,
  limit?: ModelIntInput | null,
  and?: Array< ModelCouponProductFilterInput | null > | null,
  or?: Array< ModelCouponProductFilterInput | null > | null,
  not?: ModelCouponProductFilterInput | null,
};

export type ModelDeliveryMethodOrderFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  time?: ModelIntInput | null,
  and?: Array< ModelDeliveryMethodOrderFilterInput | null > | null,
  or?: Array< ModelDeliveryMethodOrderFilterInput | null > | null,
  not?: ModelDeliveryMethodOrderFilterInput | null,
};

export type ModelDeliveryMethodOrderConnection = {
  __typename: "ModelDeliveryMethodOrderConnection",
  items:  Array<DeliveryMethodOrder | null >,
  nextToken?: string | null,
};

export type ModelQrCodeScanFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  relationID?: ModelIDInput | null,
  uuid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelQrCodeScanFilterInput | null > | null,
  or?: Array< ModelQrCodeScanFilterInput | null > | null,
  not?: ModelQrCodeScanFilterInput | null,
};

export type ModelQrCodeScanConnection = {
  __typename: "ModelQrCodeScanConnection",
  items:  Array<QrCodeScan | null >,
  nextToken?: string | null,
};

export type ModelQuizFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  search?: ModelStringInput | null,
  status?: ModelQuizStatusInput | null,
  and?: Array< ModelQuizFilterInput | null > | null,
  or?: Array< ModelQuizFilterInput | null > | null,
  not?: ModelQuizFilterInput | null,
};

export type ModelQuizConnection = {
  __typename: "ModelQuizConnection",
  items:  Array<Quiz | null >,
  nextToken?: string | null,
};

export type ModelQuizQuestionFilterInput = {
  id?: ModelIDInput | null,
  quizID?: ModelIDInput | null,
  question?: ModelStringInput | null,
  image?: ModelStringInput | null,
  alternativeA?: ModelStringInput | null,
  alternativeB?: ModelStringInput | null,
  alternativeC?: ModelStringInput | null,
  alternativeD?: ModelStringInput | null,
  alternativeE?: ModelStringInput | null,
  alternativeCorrect?: ModelStringInput | null,
  order?: ModelIntInput | null,
  search?: ModelStringInput | null,
  and?: Array< ModelQuizQuestionFilterInput | null > | null,
  or?: Array< ModelQuizQuestionFilterInput | null > | null,
  not?: ModelQuizQuestionFilterInput | null,
};

export type ModelSubscriptionVideoObjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  token?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVideoObjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionVideoObjectFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCartFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  productID?: ModelSubscriptionIDInput | null,
  qty?: ModelSubscriptionIntInput | null,
  changeName?: ModelSubscriptionStringInput | null,
  changeDescription?: ModelSubscriptionStringInput | null,
  changeQtyBlend?: ModelSubscriptionIntInput | null,
  changePriceAdjustment?: ModelSubscriptionStringInput | null,
  blendID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCartFilterInput | null > | null,
  or?: Array< ModelSubscriptionCartFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionOrderFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  couponID?: ModelSubscriptionIDInput | null,
  couponName?: ModelSubscriptionStringInput | null,
  couponDiscount?: ModelSubscriptionFloatInput | null,
  deliveryPrice?: ModelSubscriptionFloatInput | null,
  total?: ModelSubscriptionFloatInput | null,
  rating?: ModelSubscriptionIntInput | null,
  ratingNotes?: ModelSubscriptionStringInput | null,
  orderPagarmeID?: ModelSubscriptionStringInput | null,
  addressReference?: ModelSubscriptionStringInput | null,
  addressStreet?: ModelSubscriptionStringInput | null,
  addressNumber?: ModelSubscriptionStringInput | null,
  addressComplement?: ModelSubscriptionStringInput | null,
  addressZipcode?: ModelSubscriptionStringInput | null,
  addressNeighborhood?: ModelSubscriptionStringInput | null,
  addressCity?: ModelSubscriptionStringInput | null,
  addressState?: ModelSubscriptionStringInput | null,
  addressCountry?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  qrCodePix?: ModelSubscriptionStringInput | null,
  qrCodePixUrl?: ModelSubscriptionStringInput | null,
  payMethod?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionQuizFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  search?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuizFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuizFilterInput | null > | null,
};

export type GetUserCustomQueryVariables = {
  id: string,
};

export type GetUserCustomQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    phone?: string | null,
    status?: UserStatus | null,
    active?: boolean | null,
    avatar?: string | null,
    profile?:  {
      __typename: "Profile",
      doc?: string | null,
      docType?: DocTypes | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
    } | null,
    groups?:  {
      __typename: "ModelGroupUserConnection",
      items:  Array< {
        __typename: "GroupUser",
        group: string,
      } | null >,
    } | null,
  } | null,
};

export type ListRelationsByTypeUpdatedAtCustomQueryVariables = {
  type: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeUpdatedAtCustomQuery = {
  listRelationsByTypeUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      createdAt: string,
      relationsLink?:  {
        __typename: "ModelRelationLinkConnection",
        items:  Array< {
          __typename: "RelationLink",
          id: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByTypeModeUpdatedAtCustomQueryVariables = {
  type: string,
  modeUpdatedAt?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeModeUpdatedAtCustomQuery = {
  listRelationsByTypeModeUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      createdAt: string,
      relationsLink?:  {
        __typename: "ModelRelationLinkConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      documents?:  {
        __typename: "ModelDocumentConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRelationCustomQueryVariables = {
  id: string,
};

export type GetRelationCustomQuery = {
  getRelation?:  {
    __typename: "Relation",
    id: string,
    type: string,
    mode: RelationModes,
    name?: string | null,
    description?: string | null,
    avatar?: string | null,
    reference?: string | null,
    members: Array< string >,
    admins: Array< string >,
    updatedAt?: string | null,
    status: string,
    createdAt: string,
  } | null,
};

export type ListRelationsByTypeStatusUpdatedAtCustomQueryVariables = {
  type: string,
  statusUpdatedAt?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeStatusUpdatedAtCustomQuery = {
  listRelationsByTypeStatusUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      createdAt: string,
      messages?:  {
        __typename: "ModelMessageConnection",
        items:  Array< {
          __typename: "Message",
          content?: string | null,
          createdAt?: string | null,
          id: string,
          type: MessagesTypes,
          userID: string,
          user?:  {
            __typename: "User",
            id: string,
            email?: string | null,
            name: string,
            phone?: string | null,
          } | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      documents?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          conclusion?: string | null,
          content?: string | null,
          description?: string | null,
          fileKey?: string | null,
          id: string,
          identityId?: string | null,
          notes?: string | null,
          ownerID: string,
          relationID: string,
          title?: string | null,
          createdAt?: string | null,
          owner?:  {
            __typename: "User",
            id: string,
            email?: string | null,
            name: string,
            phone?: string | null,
          } | null,
        } | null >,
      } | null,
      relationsLink?:  {
        __typename: "ModelRelationLinkConnection",
        items:  Array< {
          __typename: "RelationLink",
          id: string,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsCustomQueryVariables = {
  id?: string | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLogsCustomQuery = {
  listLogs?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        active?: boolean | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByTagCreatedAtCustomQueryVariables = {
  tag: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByTagCreatedAtCustomQuery = {
  listLogsByTagCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        active?: boolean | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsBySourceCreatedAtCustomQueryVariables = {
  source: LogSource,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsBySourceCreatedAtCustomQuery = {
  listLogsBySourceCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        active?: boolean | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByUserTagCreatedAtCustomQueryVariables = {
  userID: string,
  tagCreatedAt?: ModelLogLogsByUserTagCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByUserTagCreatedAtCustomQuery = {
  listLogsByUserTagCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        active?: boolean | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByUserCreatedAtCustomQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByUserCreatedAtCustomQuery = {
  listLogsByUserCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        active?: boolean | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPageCustomQueryVariables = {
  id: string,
};

export type GetPageCustomQuery = {
  getPage?:  {
    __typename: "Page",
    id: string,
    alias: string,
    status: PageStatus,
    type: PageType,
    menu: string,
    order: number,
    title: string,
    description?: string | null,
    content?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    tags?: Array< string | null > | null,
    thumbnail?: string | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    optionTitle?: PageOptionTitle | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
    blocks?:  {
      __typename: "ModelBlockConnection",
      items:  Array< {
        __typename: "Block",
        id: string,
        component: string,
        config?: string | null,
        content: string,
        order: number,
      } | null >,
    } | null,
  } | null,
};

export type ListPagesByAliasCreatedAtCustomQueryVariables = {
  alias: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByAliasCreatedAtCustomQuery = {
  listPagesByAliasCreatedAt?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      menuProps?:  {
        __typename: "Menu",
        orderDesc?: boolean | null,
        showThumbnailPage?: string | null,
        showDescriptionPage?: string | null,
      } | null,
      order: number,
      title: string,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      updatedAt: string,
      blocks?:  {
        __typename: "ModelBlockConnection",
        items:  Array< {
          __typename: "Block",
          id: string,
          component: string,
          config?: string | null,
          content: string,
          order: number,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPagesByStatusMenuOrderCustomQueryVariables = {
  status: PageStatus,
  menuOrder?: ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByStatusMenuOrderCustomQuery = {
  listPagesByStatusMenuOrder?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      title: string,
      description?: string | null,
      thumbnail?: string | null,
      hideInMenu?: boolean | null,
      order: number,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPagesByStatusMenuOrderCustom2QueryVariables = {
  status: PageStatus,
  menuOrder?: ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByStatusMenuOrderCustom2Query = {
  listPagesByStatusMenuOrder?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
      blocks?:  {
        __typename: "ModelBlockConnection",
        items:  Array< {
          __typename: "Block",
          component: string,
          config?: string | null,
          content: string,
          order: number,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductCustomQueryVariables = {
  id: string,
};

export type GetProductCustomQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    alias: string,
    status: PageStatus,
    category: string,
    code?: string | null,
    name: string,
    description?: string | null,
    content?: string | null,
    tags?: Array< string | null > | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    price_of?: number | null,
    price: number,
    qty?: number | null,
    photo1?: string | null,
    photo2?: string | null,
    photo3?: string | null,
    photo4?: string | null,
    photo5?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    options?:  {
      __typename: "ModelOptionConnection",
      items:  Array< {
        __typename: "Option",
        id: string,
        name?: string | null,
        price?: number | null,
      } | null >,
    } | null,
  } | null,
};

export type ListProductsByAliasCreatedAtCustomQueryVariables = {
  alias: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByAliasCreatedAtCustomQuery = {
  listProductsByAliasCreatedAt?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      type?: string | null,
      relationID?: string | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      options?:  {
        __typename: "ModelOptionConnection",
        items:  Array< {
          __typename: "Option",
          id: string,
          name?: string | null,
          price?: number | null,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByStatusCategoryNameCustomQueryVariables = {
  status: PageStatus,
  categoryName?: ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByStatusCategoryNameCustomQuery = {
  listProductsByStatusCategoryName?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      name: string,
      description?: string | null,
      hideInMenu?: boolean | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      thumbnail?: string | null,
      subCategory: string,
      subCategoryProps?:  {
        __typename: "Category",
        id: string,
        title?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCartsByUserCustomQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartsByUserCustomQuery = {
  listCartsByUser?:  {
    __typename: "ModelCartConnection",
    items:  Array< {
      __typename: "Cart",
      id: string,
      userID: string,
      productID: string,
      qty?: number | null,
      changeName?: string | null,
      changeDescription?: string | null,
      changeQtyBlend?: number | null,
      changePriceAdjustment?: string | null,
      blendID?: string | null,
      product?:  {
        __typename: "Product",
        thumbnail?: string | null,
        photo1?: string | null,
        name: string,
        description?: string | null,
        type?: string | null,
        code?: string | null,
        price: number,
        qty?: number | null,
        stockControl?: boolean | null,
        categoryProps?:  {
          __typename: "Category",
          title?: string | null,
        } | null,
      } | null,
      options?:  {
        __typename: "ModelCartOptionConnection",
        items:  Array< {
          __typename: "CartOption",
          id: string,
          optionID: string,
          option?:  {
            __typename: "Option",
            name?: string | null,
            price?: number | null,
          } | null,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByCategorySubCategoryNameCustomQueryVariables = {
  category: string,
  subCategoryName?: ModelProductProductsByCategorySubCategoryNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByCategorySubCategoryNameCustomQuery = {
  listProductsByCategorySubCategoryName?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      hideInSearch?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
      categoryProps?:  {
        __typename: "Category",
        id: string,
        title?: string | null,
        description?: string | null,
        thumbnail?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByStatusCategoryNameCustom2QueryVariables = {
  status: PageStatus,
  categoryName?: ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByStatusCategoryNameCustom2Query = {
  listProductsByStatusCategoryName?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
      subCategoryProps?:  {
        __typename: "Category",
        id: string,
        title?: string | null,
        description?: string | null,
        thumbnail?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersCustomQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersCustomQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      groups?:  {
        __typename: "ModelGroupUserConnection",
        items:  Array< {
          __typename: "GroupUser",
          group: string,
        } | null >,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        items:  Array< {
          __typename: "Address",
          name?: string | null,
          street?: string | null,
          number?: string | null,
          complement?: string | null,
          zipcode?: string | null,
          neighborhood?: string | null,
          city?: string | null,
          state?: string | null,
          country?: string | null,
          reference?: string | null,
        } | null >,
      } | null,
      carts?:  {
        __typename: "ModelCartConnection",
        items:  Array< {
          __typename: "Cart",
          product?:  {
            __typename: "Product",
            name: string,
            categoryProps?:  {
              __typename: "Category",
              title?: string | null,
            } | null,
            code?: string | null,
            alias: string,
            price: number,
          } | null,
          createdAt: string,
          qty?: number | null,
        } | null >,
      } | null,
      ordersByCreatedAt?:  {
        __typename: "ModelOrderConnection",
        items:  Array< {
          __typename: "Order",
          id: string,
          status: OrderStatus,
          total?: number | null,
        } | null >,
      } | null,
      profile?:  {
        __typename: "Profile",
        schedulesFriday?: Array< string | null > | null,
        schedulesMonday?: Array< string | null > | null,
        schedulesSaturday?: Array< string | null > | null,
        schedulesSunday?: Array< string | null > | null,
        schedulesThursday?: Array< string | null > | null,
        schedulesTuesday?: Array< string | null > | null,
        schedulesWednesday?: Array< string | null > | null,
        zipCodeCoverage?: Array< string | null > | null,
        subSpecialties?: string | null,
        specialties?: string | null,
        profession?: string | null,
        notes?: string | null,
        gender?: GenderOptions | null,
        birth?: string | null,
        pix?: string | null,
        doc?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersByGroupCustomQueryVariables = {
  group: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersByGroupCustomQuery = {
  listUsersByGroup?:  {
    __typename: "ModelGroupUserConnection",
    items:  Array< {
      __typename: "GroupUser",
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        phone?: string | null,
        email?: string | null,
        avatar?: string | null,
        active?: boolean | null,
        createdAt?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        docProfession?: string | null,
        profession?: string | null,
        specialties?: string | null,
        subSpecialties?: string | null,
        bio?: string | null,
        gender?: GenderOptions | null,
        birth?: string | null,
        notes?: string | null,
        urlUserName?: string | null,
        urlEnable?: boolean | null,
        zipCodeCoverage?: Array< string | null > | null,
        schedulesSunday?: Array< string | null > | null,
        schedulesMonday?: Array< string | null > | null,
        schedulesTuesday?: Array< string | null > | null,
        schedulesWednesday?: Array< string | null > | null,
        schedulesThursday?: Array< string | null > | null,
        schedulesFriday?: Array< string | null > | null,
        schedulesSaturday?: Array< string | null > | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersByUserCreatedAtCustomQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersByUserCreatedAtCustomQuery = {
  listOrdersByUserCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      updatedAt: string,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
        createdAt?: string | null,
      } | null,
      items?:  {
        __typename: "ModelOrderItemConnection",
        items:  Array< {
          __typename: "OrderItem",
          qty: number,
          code?: string | null,
          name: string,
          description?: string | null,
          price: number,
          photo1?: string | null,
          changeName?: string | null,
          changeDescription?: string | null,
          changeNameAdmin?: string | null,
          product?:  {
            __typename: "Product",
            categoryProps?:  {
              __typename: "Category",
              title?: string | null,
            } | null,
            name: string,
          } | null,
          optionsItem?:  {
            __typename: "ModelOrderItemOptionConnection",
            items:  Array< {
              __typename: "OrderItemOption",
              option?:  {
                __typename: "Option",
                name?: string | null,
                price?: number | null,
              } | null,
            } | null >,
          } | null,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersByStatusCreatedAtCustomQueryVariables = {
  status: OrderStatus,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersByStatusCreatedAtCustomQuery = {
  listOrdersByStatusCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      updatedAt: string,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
        createdAt?: string | null,
      } | null,
      items?:  {
        __typename: "ModelOrderItemConnection",
        items:  Array< {
          __typename: "OrderItem",
          qty: number,
          code?: string | null,
          name: string,
          description?: string | null,
          price: number,
          photo1?: string | null,
          changeName?: string | null,
          changeDescription?: string | null,
          changeNameAdmin?: string | null,
          product?:  {
            __typename: "Product",
            categoryProps?:  {
              __typename: "Category",
              title?: string | null,
            } | null,
            name: string,
          } | null,
          optionsItem?:  {
            __typename: "ModelOrderItemOptionConnection",
            items:  Array< {
              __typename: "OrderItemOption",
              option?:  {
                __typename: "Option",
                name?: string | null,
                price?: number | null,
              } | null,
            } | null >,
          } | null,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsByDataBaseCreatedAtCustomQueryVariables = {
  dataBaseID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDataBaseItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsByDataBaseCreatedAtCustomQuery = {
  listItemsByDataBaseCreatedAt?:  {
    __typename: "ModelDataBaseItemConnection",
    items:  Array< {
      __typename: "DataBaseItem",
      id: string,
      dataBaseID: string,
      userID: string,
      data: string,
      status: DataBaseItemStatus,
      search?: string | null,
      notes?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByOrderCustomQueryVariables = {
  orderID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByOrderCustomQuery = {
  listDeliveryByOrder?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      deliveryUser?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByDateUserCustomQueryVariables = {
  date: string,
  deliveryUserID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByDateUserCustomQuery = {
  listDeliveryByDateUser?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
      deliveryUser?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
      order?:  {
        __typename: "Order",
        id: string,
        userID: string,
        status: OrderStatus,
        createdAt?: string | null,
        couponID?: string | null,
        couponName?: string | null,
        couponDiscount?: number | null,
        deliveryPrice?: number | null,
        total?: number | null,
        rating?: number | null,
        ratingNotes?: string | null,
        orderPagarmeID?: string | null,
        addressReference?: string | null,
        addressStreet?: string | null,
        addressNumber?: string | null,
        addressComplement?: string | null,
        addressZipcode?: string | null,
        addressNeighborhood?: string | null,
        addressCity?: string | null,
        addressState?: string | null,
        addressCountry?: string | null,
        updatedAt: string,
        notes?: string | null,
        user?:  {
          __typename: "User",
          name: string,
          email?: string | null,
          phone?: string | null,
          avatar?: string | null,
          createdAt?: string | null,
        } | null,
        items?:  {
          __typename: "ModelOrderItemConnection",
          items:  Array< {
            __typename: "OrderItem",
            qty: number,
            code?: string | null,
            name: string,
            description?: string | null,
            price: number,
            photo1?: string | null,
            changeName?: string | null,
            changeDescription?: string | null,
            changeNameAdmin?: string | null,
            product?:  {
              __typename: "Product",
              categoryProps?:  {
                __typename: "Category",
                title?: string | null,
              } | null,
              name: string,
            } | null,
            optionsItem?:  {
              __typename: "ModelOrderItemOptionConnection",
              items:  Array< {
                __typename: "OrderItemOption",
                option?:  {
                  __typename: "Option",
                  name?: string | null,
                  price?: number | null,
                } | null,
              } | null >,
            } | null,
          } | null >,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByUserDateCustomQueryVariables = {
  deliveryUserID: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByUserDateCustomQuery = {
  listDeliveryByUserDate?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
      deliveryUser?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
      order?:  {
        __typename: "Order",
        id: string,
        userID: string,
        status: OrderStatus,
        createdAt?: string | null,
        couponID?: string | null,
        couponName?: string | null,
        couponDiscount?: number | null,
        deliveryPrice?: number | null,
        total?: number | null,
        rating?: number | null,
        ratingNotes?: string | null,
        orderPagarmeID?: string | null,
        addressReference?: string | null,
        addressStreet?: string | null,
        addressNumber?: string | null,
        addressComplement?: string | null,
        addressZipcode?: string | null,
        addressNeighborhood?: string | null,
        addressCity?: string | null,
        addressState?: string | null,
        addressCountry?: string | null,
        updatedAt: string,
        notes?: string | null,
        user?:  {
          __typename: "User",
          name: string,
          email?: string | null,
          phone?: string | null,
          avatar?: string | null,
          createdAt?: string | null,
        } | null,
        items?:  {
          __typename: "ModelOrderItemConnection",
          items:  Array< {
            __typename: "OrderItem",
            qty: number,
            code?: string | null,
            name: string,
            description?: string | null,
            price: number,
            photo1?: string | null,
            changeName?: string | null,
            changeDescription?: string | null,
            changeNameAdmin?: string | null,
            product?:  {
              __typename: "Product",
              categoryProps?:  {
                __typename: "Category",
                title?: string | null,
              } | null,
              name: string,
            } | null,
            optionsItem?:  {
              __typename: "ModelOrderItemOptionConnection",
              items:  Array< {
                __typename: "OrderItemOption",
                option?:  {
                  __typename: "Option",
                  name?: string | null,
                  price?: number | null,
                } | null,
              } | null >,
            } | null,
          } | null >,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryOrdersCustomQueryVariables = {
  id?: string | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDeliveryOrdersCustomQuery = {
  listDeliveryOrders?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
      deliveryUser?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
      order?:  {
        __typename: "Order",
        id: string,
        userID: string,
        status: OrderStatus,
        createdAt?: string | null,
        couponID?: string | null,
        couponName?: string | null,
        couponDiscount?: number | null,
        deliveryPrice?: number | null,
        total?: number | null,
        rating?: number | null,
        ratingNotes?: string | null,
        orderPagarmeID?: string | null,
        addressReference?: string | null,
        addressStreet?: string | null,
        addressNumber?: string | null,
        addressComplement?: string | null,
        addressZipcode?: string | null,
        addressNeighborhood?: string | null,
        addressCity?: string | null,
        addressState?: string | null,
        addressCountry?: string | null,
        updatedAt: string,
        notes?: string | null,
        user?:  {
          __typename: "User",
          name: string,
          email?: string | null,
          phone?: string | null,
          avatar?: string | null,
          createdAt?: string | null,
        } | null,
        items?:  {
          __typename: "ModelOrderItemConnection",
          items:  Array< {
            __typename: "OrderItem",
            qty: number,
            code?: string | null,
            name: string,
            description?: string | null,
            price: number,
            photo1?: string | null,
            changeName?: string | null,
            changeDescription?: string | null,
            changeNameAdmin?: string | null,
            product?:  {
              __typename: "Product",
              categoryProps?:  {
                __typename: "Category",
                title?: string | null,
              } | null,
              name: string,
            } | null,
            optionsItem?:  {
              __typename: "ModelOrderItemOptionConnection",
              items:  Array< {
                __typename: "OrderItemOption",
                option?:  {
                  __typename: "Option",
                  name?: string | null,
                  price?: number | null,
                } | null,
              } | null >,
            } | null,
          } | null >,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByStatusDateCustomQueryVariables = {
  status: DeliveryStatus,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByStatusDateCustomQuery = {
  listDeliveryByStatusDate?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
      deliveryUser?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
      order?:  {
        __typename: "Order",
        id: string,
        userID: string,
        status: OrderStatus,
        createdAt?: string | null,
        couponID?: string | null,
        couponName?: string | null,
        couponDiscount?: number | null,
        deliveryPrice?: number | null,
        total?: number | null,
        rating?: number | null,
        ratingNotes?: string | null,
        orderPagarmeID?: string | null,
        addressReference?: string | null,
        addressStreet?: string | null,
        addressNumber?: string | null,
        addressComplement?: string | null,
        addressZipcode?: string | null,
        addressNeighborhood?: string | null,
        addressCity?: string | null,
        addressState?: string | null,
        addressCountry?: string | null,
        updatedAt: string,
        notes?: string | null,
        user?:  {
          __typename: "User",
          name: string,
          email?: string | null,
          phone?: string | null,
          avatar?: string | null,
          createdAt?: string | null,
        } | null,
        items?:  {
          __typename: "ModelOrderItemConnection",
          items:  Array< {
            __typename: "OrderItem",
            qty: number,
            code?: string | null,
            name: string,
            description?: string | null,
            price: number,
            photo1?: string | null,
            changeName?: string | null,
            changeDescription?: string | null,
            changeNameAdmin?: string | null,
            product?:  {
              __typename: "Product",
              categoryProps?:  {
                __typename: "Category",
                title?: string | null,
              } | null,
              name: string,
            } | null,
            optionsItem?:  {
              __typename: "ModelOrderItemOptionConnection",
              items:  Array< {
                __typename: "OrderItemOption",
                option?:  {
                  __typename: "Option",
                  name?: string | null,
                  price?: number | null,
                } | null,
              } | null >,
            } | null,
          } | null >,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsCustomQueryVariables = {
  id?: string | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsCustomQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
      subCategoryProps?:  {
        __typename: "Category",
        id: string,
        title?: string | null,
        description?: string | null,
        thumbnail?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsedByCouponCustomQueryVariables = {
  couponID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponUsedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsedByCouponCustomQuery = {
  listUsedByCoupon?:  {
    __typename: "ModelCouponUsedConnection",
    items:  Array< {
      __typename: "CouponUsed",
      id: string,
      couponID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrderCustomQueryVariables = {
  id: string,
};

export type GetOrderCustomQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    status: OrderStatus,
    createdAt?: string | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    updatedAt: string,
    notes?: string | null,
    user?:  {
      __typename: "User",
      name: string,
      email?: string | null,
      phone?: string | null,
      avatar?: string | null,
      createdAt?: string | null,
    } | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        qty: number,
        code?: string | null,
        name: string,
        description?: string | null,
        price: number,
        photo1?: string | null,
        changeName?: string | null,
        changeDescription?: string | null,
        changeNameAdmin?: string | null,
        product?:  {
          __typename: "Product",
          categoryProps?:  {
            __typename: "Category",
            title?: string | null,
          } | null,
          name: string,
        } | null,
        optionsItem?:  {
          __typename: "ModelOrderItemOptionConnection",
          items:  Array< {
            __typename: "OrderItemOption",
            option?:  {
              __typename: "Option",
              name?: string | null,
              price?: number | null,
            } | null,
          } | null >,
        } | null,
      } | null >,
    } | null,
  } | null,
};

export type ListRelationsLinkByUserTypeNotifyUpdatedAtCustomQueryVariables = {
  userID: string,
  typeNotifyUpdatedAt?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsLinkByUserTypeNotifyUpdatedAtCustomQuery = {
  listRelationsLinkByUserTypeNotifyUpdatedAt?:  {
    __typename: "ModelRelationLinkConnection",
    items:  Array< {
      __typename: "RelationLink",
      id: string,
      userID: string,
      relationID: string,
      type: string,
      notify: number,
      updatedAt?: string | null,
      search?: string | null,
      percentage?: number | null,
      createdAt: string,
      relation?:  {
        __typename: "Relation",
        id: string,
        type: string,
        mode: RelationModes,
        name?: string | null,
        description?: string | null,
        avatar?: string | null,
        reference?: string | null,
        members: Array< string >,
        admins: Array< string >,
        updatedAt?: string | null,
        status: string,
        config?: string | null,
        createdAt: string,
        restrictedContents?:  {
          __typename: "ModelRestrictedContentConnection",
          items:  Array< {
            __typename: "RestrictedContent",
            id: string,
            group?: string | null,
            subGroup?: string | null,
            order: number,
            title?: string | null,
            description?: string | null,
            notes?: string | null,
            type: RestrictedContentTypes,
            content?: string | null,
            thumbnail?: string | null,
            identityId?: string | null,
            lifetime?: string | null,
            start?: string | null,
            expiration?: string | null,
            percentage?: number | null,
          } | null >,
          nextToken?: string | null,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsLinkByRelationUserCustomQueryVariables = {
  relationID: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsLinkByRelationUserCustomQuery = {
  listRelationsLinkByRelationUser?:  {
    __typename: "ModelRelationLinkConnection",
    items:  Array< {
      __typename: "RelationLink",
      id: string,
      userID: string,
      relationID: string,
      type: string,
      notify: number,
      updatedAt?: string | null,
      createdAt: string,
      user?:  {
        __typename: "User",
        name: string,
        email?: string | null,
        phone?: string | null,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByEmailCustomQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByEmailCustomQuery = {
  getUserByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      groups?:  {
        __typename: "ModelGroupUserConnection",
        items:  Array< {
          __typename: "GroupUser",
          group: string,
        } | null >,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        items:  Array< {
          __typename: "Address",
          name?: string | null,
          street?: string | null,
          number?: string | null,
          complement?: string | null,
          zipcode?: string | null,
          neighborhood?: string | null,
          city?: string | null,
          state?: string | null,
          country?: string | null,
          reference?: string | null,
        } | null >,
      } | null,
      carts?:  {
        __typename: "ModelCartConnection",
        items:  Array< {
          __typename: "Cart",
          product?:  {
            __typename: "Product",
            name: string,
            categoryProps?:  {
              __typename: "Category",
              title?: string | null,
            } | null,
            code?: string | null,
            alias: string,
            price: number,
          } | null,
          createdAt: string,
          qty?: number | null,
        } | null >,
      } | null,
      ordersByCreatedAt?:  {
        __typename: "ModelOrderConnection",
        items:  Array< {
          __typename: "Order",
          id: string,
          status: OrderStatus,
          total?: number | null,
        } | null >,
      } | null,
      profile?:  {
        __typename: "Profile",
        schedulesFriday?: Array< string | null > | null,
        schedulesMonday?: Array< string | null > | null,
        schedulesSaturday?: Array< string | null > | null,
        schedulesSunday?: Array< string | null > | null,
        schedulesThursday?: Array< string | null > | null,
        schedulesTuesday?: Array< string | null > | null,
        schedulesWednesday?: Array< string | null > | null,
        zipCodeCoverage?: Array< string | null > | null,
        subSpecialties?: string | null,
        specialties?: string | null,
        profession?: string | null,
        notes?: string | null,
        gender?: GenderOptions | null,
        birth?: string | null,
        pix?: string | null,
        doc?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByPhoneCustomQueryVariables = {
  phone: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByPhoneCustomQuery = {
  getUserByPhone?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      groups?:  {
        __typename: "ModelGroupUserConnection",
        items:  Array< {
          __typename: "GroupUser",
          group: string,
        } | null >,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        items:  Array< {
          __typename: "Address",
          name?: string | null,
          street?: string | null,
          number?: string | null,
          complement?: string | null,
          zipcode?: string | null,
          neighborhood?: string | null,
          city?: string | null,
          state?: string | null,
          country?: string | null,
          reference?: string | null,
        } | null >,
      } | null,
      carts?:  {
        __typename: "ModelCartConnection",
        items:  Array< {
          __typename: "Cart",
          product?:  {
            __typename: "Product",
            name: string,
            categoryProps?:  {
              __typename: "Category",
              title?: string | null,
            } | null,
            code?: string | null,
            alias: string,
            price: number,
          } | null,
          createdAt: string,
          qty?: number | null,
        } | null >,
      } | null,
      ordersByCreatedAt?:  {
        __typename: "ModelOrderConnection",
        items:  Array< {
          __typename: "Order",
          id: string,
          status: OrderStatus,
          total?: number | null,
        } | null >,
      } | null,
      profile?:  {
        __typename: "Profile",
        schedulesFriday?: Array< string | null > | null,
        schedulesMonday?: Array< string | null > | null,
        schedulesSaturday?: Array< string | null > | null,
        schedulesSunday?: Array< string | null > | null,
        schedulesThursday?: Array< string | null > | null,
        schedulesTuesday?: Array< string | null > | null,
        schedulesWednesday?: Array< string | null > | null,
        zipCodeCoverage?: Array< string | null > | null,
        subSpecialties?: string | null,
        specialties?: string | null,
        profession?: string | null,
        notes?: string | null,
        gender?: GenderOptions | null,
        birth?: string | null,
        pix?: string | null,
        doc?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCouponsByCodeCustomQueryVariables = {
  code: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCouponsByCodeCustomQuery = {
  listCouponsByCode?:  {
    __typename: "ModelCouponConnection",
    items:  Array< {
      __typename: "Coupon",
      id: string,
      name: string,
      description?: string | null,
      code: string,
      start?: string | null,
      expiration?: string | null,
      discountPercentage?: number | null,
      discountValue?: number | null,
      qtyLimit?: number | null,
      qtyUsed?: number | null,
      qtyProduct?: number | null,
      qtyProductUsed?: number | null,
      search?: string | null,
      createdAt: string,
      updatedAt: string,
      products?:  {
        __typename: "ModelCouponProductConnection",
        items:  Array< {
          __typename: "CouponProduct",
          price?: number | null,
          limit?: number | null,
          product?:  {
            __typename: "Product",
            id: string,
            name: string,
          } | null,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByRelationCreatedAtCustomQueryVariables = {
  relationID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByRelationCreatedAtCustomQuery = {
  listMessagesByRelationCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      user?:  {
        __typename: "User",
        name: string,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByRestrictedContentCreatedAtCustomQueryVariables = {
  restrictedContentID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByRestrictedContentCreatedAtCustomQuery = {
  listMessagesByRestrictedContentCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      user?:  {
        __typename: "User",
        name: string,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByStatusRelationCreatedAtCustomQueryVariables = {
  status: string,
  relationIDCreatedAt?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByStatusRelationCreatedAtCustomQuery = {
  listMessagesByStatusRelationCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      relationID?: string | null,
      restrictedContentID?: string | null,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      updatedAt: string,
      user?:  {
        __typename: "User",
        name: string,
        avatar?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AdminDeleteUserMutationVariables = {
  id?: string | null,
};

export type AdminDeleteUserMutation = {
  adminDeleteUser?: string | null,
};

export type AdminCreateUserMutationVariables = {
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  id?: string | null,
  messageAction?: string | null,
  passwordLength?: number | null,
  resendTempPass?: number | null,
  confirmSignUp?: number | null,
};

export type AdminCreateUserMutation = {
  adminCreateUser?: string | null,
};

export type AdminAddUserToGroupMutationVariables = {
  username?: string | null,
  groups?: string | null,
};

export type AdminAddUserToGroupMutation = {
  adminAddUserToGroup?: string | null,
};

export type CreateGroupUserMutationVariables = {
  input: CreateGroupUserInput,
  condition?: ModelGroupUserConditionInput | null,
};

export type CreateGroupUserMutation = {
  createGroupUser?:  {
    __typename: "GroupUser",
    id: string,
    group: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    profileID: string,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteGroupUserMutationVariables = {
  input: DeleteGroupUserInput,
  condition?: ModelGroupUserConditionInput | null,
};

export type DeleteGroupUserMutation = {
  deleteGroupUser?:  {
    __typename: "GroupUser",
    id: string,
    group: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    profileID: string,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAddressMutationVariables = {
  input: DeleteAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type DeleteAddressMutation = {
  deleteAddress?:  {
    __typename: "Address",
    id: string,
    userID: string,
    name?: string | null,
    reference?: string | null,
    street?: string | null,
    number?: string | null,
    complement?: string | null,
    zipcode?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    addressPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePayMethodMutationVariables = {
  input: DeletePayMethodInput,
  condition?: ModelPayMethodConditionInput | null,
};

export type DeletePayMethodMutation = {
  deletePayMethod?:  {
    __typename: "PayMethod",
    id: string,
    userID: string,
    method: PaymentMethods,
    number?: string | null,
    holderName?: string | null,
    holderDocument?: string | null,
    expMonth?: number | null,
    expYear?: number | null,
    cvv?: string | null,
    brand?: string | null,
    label?: string | null,
    cardPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConfigMutationVariables = {
  input: CreateConfigInput,
  condition?: ModelConfigConditionInput | null,
};

export type CreateConfigMutation = {
  createConfig?:  {
    __typename: "Config",
    id: string,
    validationMode: ConfigValidationModes,
    googleAnalyticsID?: string | null,
    googleSiteVerification?: string | null,
    facebook?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    infoFooter?: string | null,
    minValueOrder?: number | null,
    phoneOrders?: string | null,
    phoneSac?: string | null,
    phoneWhatsapp?: string | null,
    allowPayOnDelivery?: boolean | null,
    allowLocalPickup?: boolean | null,
    deliveryOnSunday?: string | null,
    deliveryOnMonday?: string | null,
    deliveryOnTuesday?: string | null,
    deliveryOnWednesday?: string | null,
    deliveryOnThursday?: string | null,
    deliveryOnFriday?: string | null,
    deliveryOnSaturday?: string | null,
    deliveryOffSunday?: string | null,
    deliveryOffMonday?: string | null,
    deliveryOffTuesday?: string | null,
    deliveryOffWednesday?: string | null,
    deliveryOffThursday?: string | null,
    deliveryOffFriday?: string | null,
    deliveryOffSaturday?: string | null,
    showNotesCart?: boolean | null,
    notesCart?: string | null,
    soundOnNewOrder?: boolean | null,
    birthDayEnable?: boolean | null,
    birthDaySubject?: string | null,
    birthDayMessage?: string | null,
    footer?: string | null,
    navBar?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConfigMutationVariables = {
  input: UpdateConfigInput,
  condition?: ModelConfigConditionInput | null,
};

export type UpdateConfigMutation = {
  updateConfig?:  {
    __typename: "Config",
    id: string,
    validationMode: ConfigValidationModes,
    googleAnalyticsID?: string | null,
    googleSiteVerification?: string | null,
    facebook?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    infoFooter?: string | null,
    minValueOrder?: number | null,
    phoneOrders?: string | null,
    phoneSac?: string | null,
    phoneWhatsapp?: string | null,
    allowPayOnDelivery?: boolean | null,
    allowLocalPickup?: boolean | null,
    deliveryOnSunday?: string | null,
    deliveryOnMonday?: string | null,
    deliveryOnTuesday?: string | null,
    deliveryOnWednesday?: string | null,
    deliveryOnThursday?: string | null,
    deliveryOnFriday?: string | null,
    deliveryOnSaturday?: string | null,
    deliveryOffSunday?: string | null,
    deliveryOffMonday?: string | null,
    deliveryOffTuesday?: string | null,
    deliveryOffWednesday?: string | null,
    deliveryOffThursday?: string | null,
    deliveryOffFriday?: string | null,
    deliveryOffSaturday?: string | null,
    showNotesCart?: boolean | null,
    notesCart?: string | null,
    soundOnNewOrder?: boolean | null,
    birthDayEnable?: boolean | null,
    birthDaySubject?: string | null,
    birthDayMessage?: string | null,
    footer?: string | null,
    navBar?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateInviteMutationVariables = {
  input: CreateInviteInput,
  condition?: ModelInviteConditionInput | null,
};

export type CreateInviteMutation = {
  createInvite?:  {
    __typename: "Invite",
    id: string,
    name: string,
    description?: string | null,
    email?: string | null,
    phone?: string | null,
    groups?: Array< string | null > | null,
    status: InviteStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteInviteMutationVariables = {
  input: DeleteInviteInput,
  condition?: ModelInviteConditionInput | null,
};

export type DeleteInviteMutation = {
  deleteInvite?:  {
    __typename: "Invite",
    id: string,
    name: string,
    description?: string | null,
    email?: string | null,
    phone?: string | null,
    groups?: Array< string | null > | null,
    status: InviteStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateDataBaseMutationVariables = {
  input: UpdateDataBaseInput,
  condition?: ModelDataBaseConditionInput | null,
};

export type UpdateDataBaseMutation = {
  updateDataBase?:  {
    __typename: "DataBase",
    id: string,
    name: string,
    items?:  {
      __typename: "ModelDataBaseItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDataBaseMutationVariables = {
  input: DeleteDataBaseInput,
  condition?: ModelDataBaseConditionInput | null,
};

export type DeleteDataBaseMutation = {
  deleteDataBase?:  {
    __typename: "DataBase",
    id: string,
    name: string,
    items?:  {
      __typename: "ModelDataBaseItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDataBaseItemMutationVariables = {
  input: UpdateDataBaseItemInput,
  condition?: ModelDataBaseItemConditionInput | null,
};

export type UpdateDataBaseItemMutation = {
  updateDataBaseItem?:  {
    __typename: "DataBaseItem",
    id: string,
    dataBaseID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    data: string,
    status: DataBaseItemStatus,
    search?: string | null,
    notes?: string | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteDataBaseItemMutationVariables = {
  input: DeleteDataBaseItemInput,
  condition?: ModelDataBaseItemConditionInput | null,
};

export type DeleteDataBaseItemMutation = {
  deleteDataBaseItem?:  {
    __typename: "DataBaseItem",
    id: string,
    dataBaseID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    data: string,
    status: DataBaseItemStatus,
    search?: string | null,
    notes?: string | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateFolderMutationVariables = {
  input: CreateFolderInput,
  condition?: ModelFolderConditionInput | null,
};

export type CreateFolderMutation = {
  createFolder?:  {
    __typename: "Folder",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFolderMutationVariables = {
  input: UpdateFolderInput,
  condition?: ModelFolderConditionInput | null,
};

export type UpdateFolderMutation = {
  updateFolder?:  {
    __typename: "Folder",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFolderMutationVariables = {
  input: DeleteFolderInput,
  condition?: ModelFolderConditionInput | null,
};

export type DeleteFolderMutation = {
  deleteFolder?:  {
    __typename: "Folder",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMidiaMutationVariables = {
  input: CreateMidiaInput,
  condition?: ModelMidiaConditionInput | null,
};

export type CreateMidiaMutation = {
  createMidia?:  {
    __typename: "Midia",
    id: string,
    key: string,
    type?: MidiaTypes | null,
    title?: string | null,
    subTitle?: string | null,
    description?: string | null,
    link?: string | null,
    identifyText?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMidiaMutationVariables = {
  input: UpdateMidiaInput,
  condition?: ModelMidiaConditionInput | null,
};

export type UpdateMidiaMutation = {
  updateMidia?:  {
    __typename: "Midia",
    id: string,
    key: string,
    type?: MidiaTypes | null,
    title?: string | null,
    subTitle?: string | null,
    description?: string | null,
    link?: string | null,
    identifyText?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMidiaMutationVariables = {
  input: DeleteMidiaInput,
  condition?: ModelMidiaConditionInput | null,
};

export type DeleteMidiaMutation = {
  deleteMidia?:  {
    __typename: "Midia",
    id: string,
    key: string,
    type?: MidiaTypes | null,
    title?: string | null,
    subTitle?: string | null,
    description?: string | null,
    link?: string | null,
    identifyText?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDocumentMutationVariables = {
  input: DeleteDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type DeleteDocumentMutation = {
  deleteDocument?:  {
    __typename: "Document",
    id: string,
    relationID: string,
    ownerID: string,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    conclusion?: string | null,
    content?: string | null,
    fileKey?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    owner?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateRestrictedContentMutationVariables = {
  input: CreateRestrictedContentInput,
  condition?: ModelRestrictedContentConditionInput | null,
};

export type CreateRestrictedContentMutation = {
  createRestrictedContent?:  {
    __typename: "RestrictedContent",
    id: string,
    relationID: string,
    order: number,
    group?: string | null,
    subGroup?: string | null,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    type: RestrictedContentTypes,
    isAWSVDO?: boolean | null,
    thumbnail?: string | null,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    lifetime?: string | null,
    start?: string | null,
    expiration?: string | null,
    percentage?: number | null,
    video?:  {
      __typename: "VideoObject",
      id: string,
      token?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    view?:  {
      __typename: "ModelRestrictedContentViewConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRestrictedContentMutationVariables = {
  input: UpdateRestrictedContentInput,
  condition?: ModelRestrictedContentConditionInput | null,
};

export type UpdateRestrictedContentMutation = {
  updateRestrictedContent?:  {
    __typename: "RestrictedContent",
    id: string,
    relationID: string,
    order: number,
    group?: string | null,
    subGroup?: string | null,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    type: RestrictedContentTypes,
    isAWSVDO?: boolean | null,
    thumbnail?: string | null,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    lifetime?: string | null,
    start?: string | null,
    expiration?: string | null,
    percentage?: number | null,
    video?:  {
      __typename: "VideoObject",
      id: string,
      token?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    view?:  {
      __typename: "ModelRestrictedContentViewConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRestrictedContentMutationVariables = {
  input: DeleteRestrictedContentInput,
  condition?: ModelRestrictedContentConditionInput | null,
};

export type DeleteRestrictedContentMutation = {
  deleteRestrictedContent?:  {
    __typename: "RestrictedContent",
    id: string,
    relationID: string,
    order: number,
    group?: string | null,
    subGroup?: string | null,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    type: RestrictedContentTypes,
    isAWSVDO?: boolean | null,
    thumbnail?: string | null,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    lifetime?: string | null,
    start?: string | null,
    expiration?: string | null,
    percentage?: number | null,
    video?:  {
      __typename: "VideoObject",
      id: string,
      token?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    view?:  {
      __typename: "ModelRestrictedContentViewConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMenuMutationVariables = {
  input: CreateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type CreateMenuMutation = {
  createMenu?:  {
    __typename: "Menu",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    orderDesc?: boolean | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    showDescriptionPage?: string | null,
    showThumbnailPage?: string | null,
    hide?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMenuMutationVariables = {
  input: UpdateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type UpdateMenuMutation = {
  updateMenu?:  {
    __typename: "Menu",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    orderDesc?: boolean | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    showDescriptionPage?: string | null,
    showThumbnailPage?: string | null,
    hide?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMenuMutationVariables = {
  input: DeleteMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type DeleteMenuMutation = {
  deleteMenu?:  {
    __typename: "Menu",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    orderDesc?: boolean | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    showDescriptionPage?: string | null,
    showThumbnailPage?: string | null,
    hide?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePageMutationVariables = {
  input: UpdatePageInput,
  condition?: ModelPageConditionInput | null,
};

export type UpdatePageMutation = {
  updatePage?:  {
    __typename: "Page",
    id: string,
    alias: string,
    status: PageStatus,
    type: PageType,
    menu: string,
    menuProps?:  {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    order: number,
    title: string,
    titlePadX?: string | null,
    titlePadY?: string | null,
    description?: string | null,
    content?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    tags?: Array< string | null > | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    blocks?:  {
      __typename: "ModelBlockConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeletePageMutationVariables = {
  input: DeletePageInput,
  condition?: ModelPageConditionInput | null,
};

export type DeletePageMutation = {
  deletePage?:  {
    __typename: "Page",
    id: string,
    alias: string,
    status: PageStatus,
    type: PageType,
    menu: string,
    menuProps?:  {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    order: number,
    title: string,
    titlePadX?: string | null,
    titlePadY?: string | null,
    description?: string | null,
    content?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    tags?: Array< string | null > | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    blocks?:  {
      __typename: "ModelBlockConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateBlockMutationVariables = {
  input: CreateBlockInput,
  condition?: ModelBlockConditionInput | null,
};

export type CreateBlockMutation = {
  createBlock?:  {
    __typename: "Block",
    id: string,
    pageID: string,
    order: number,
    component: string,
    content: string,
    config?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBlockMutationVariables = {
  input: UpdateBlockInput,
  condition?: ModelBlockConditionInput | null,
};

export type UpdateBlockMutation = {
  updateBlock?:  {
    __typename: "Block",
    id: string,
    pageID: string,
    order: number,
    component: string,
    content: string,
    config?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBlockMutationVariables = {
  input: DeleteBlockInput,
  condition?: ModelBlockConditionInput | null,
};

export type DeleteBlockMutation = {
  deleteBlock?:  {
    __typename: "Block",
    id: string,
    pageID: string,
    order: number,
    component: string,
    content: string,
    config?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    hide?: boolean | null,
    isSub?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    hide?: boolean | null,
    isSub?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    hide?: boolean | null,
    isSub?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    alias: string,
    status: PageStatus,
    category: string,
    categoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    subCategory: string,
    subCategoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    type?: string | null,
    relationID?: string | null,
    preparationTime?: number | null,
    code?: string | null,
    name: string,
    description?: string | null,
    contentTitle?: string | null,
    contentTitle2?: string | null,
    contentTitle3?: string | null,
    content?: string | null,
    content2?: string | null,
    content3?: string | null,
    tags?: Array< string | null > | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    price_of?: number | null,
    price: number,
    qty?: number | null,
    stockControl?: boolean | null,
    photo1?: string | null,
    photo2?: string | null,
    photo3?: string | null,
    photo4?: string | null,
    photo5?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    hideInSearch?: boolean | null,
    options?:  {
      __typename: "ModelOptionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    alias: string,
    status: PageStatus,
    category: string,
    categoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    subCategory: string,
    subCategoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    type?: string | null,
    relationID?: string | null,
    preparationTime?: number | null,
    code?: string | null,
    name: string,
    description?: string | null,
    contentTitle?: string | null,
    contentTitle2?: string | null,
    contentTitle3?: string | null,
    content?: string | null,
    content2?: string | null,
    content3?: string | null,
    tags?: Array< string | null > | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    price_of?: number | null,
    price: number,
    qty?: number | null,
    stockControl?: boolean | null,
    photo1?: string | null,
    photo2?: string | null,
    photo3?: string | null,
    photo4?: string | null,
    photo5?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    hideInSearch?: boolean | null,
    options?:  {
      __typename: "ModelOptionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    alias: string,
    status: PageStatus,
    category: string,
    categoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    subCategory: string,
    subCategoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    type?: string | null,
    relationID?: string | null,
    preparationTime?: number | null,
    code?: string | null,
    name: string,
    description?: string | null,
    contentTitle?: string | null,
    contentTitle2?: string | null,
    contentTitle3?: string | null,
    content?: string | null,
    content2?: string | null,
    content3?: string | null,
    tags?: Array< string | null > | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    price_of?: number | null,
    price: number,
    qty?: number | null,
    stockControl?: boolean | null,
    photo1?: string | null,
    photo2?: string | null,
    photo3?: string | null,
    photo4?: string | null,
    photo5?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    hideInSearch?: boolean | null,
    options?:  {
      __typename: "ModelOptionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateOptionMutationVariables = {
  input: CreateOptionInput,
  condition?: ModelOptionConditionInput | null,
};

export type CreateOptionMutation = {
  createOption?:  {
    __typename: "Option",
    id: string,
    productID: string,
    name?: string | null,
    price?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOptionMutationVariables = {
  input: UpdateOptionInput,
  condition?: ModelOptionConditionInput | null,
};

export type UpdateOptionMutation = {
  updateOption?:  {
    __typename: "Option",
    id: string,
    productID: string,
    name?: string | null,
    price?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOptionMutationVariables = {
  input: DeleteOptionInput,
  condition?: ModelOptionConditionInput | null,
};

export type DeleteOptionMutation = {
  deleteOption?:  {
    __typename: "Option",
    id: string,
    productID: string,
    name?: string | null,
    price?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCartMutationVariables = {
  input: DeleteCartInput,
  condition?: ModelCartConditionInput | null,
};

export type DeleteCartMutation = {
  deleteCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCartOptionMutationVariables = {
  input: DeleteCartOptionInput,
  condition?: ModelCartOptionConditionInput | null,
};

export type DeleteCartOptionMutation = {
  deleteCartOption?:  {
    __typename: "CartOption",
    id: string,
    cartID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userID?: string | null,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type CreateCouponMutationVariables = {
  input: CreateCouponInput,
  condition?: ModelCouponConditionInput | null,
};

export type CreateCouponMutation = {
  createCoupon?:  {
    __typename: "Coupon",
    id: string,
    name: string,
    description?: string | null,
    code: string,
    start?: string | null,
    expiration?: string | null,
    discountPercentage?: number | null,
    discountValue?: number | null,
    qtyLimit?: number | null,
    qtyUsed?: number | null,
    qtyProduct?: number | null,
    qtyProductUsed?: number | null,
    search?: string | null,
    products?:  {
      __typename: "ModelCouponProductConnection",
      nextToken?: string | null,
    } | null,
    couponUsed?:  {
      __typename: "ModelCouponUsedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCouponMutationVariables = {
  input: DeleteCouponInput,
  condition?: ModelCouponConditionInput | null,
};

export type DeleteCouponMutation = {
  deleteCoupon?:  {
    __typename: "Coupon",
    id: string,
    name: string,
    description?: string | null,
    code: string,
    start?: string | null,
    expiration?: string | null,
    discountPercentage?: number | null,
    discountValue?: number | null,
    qtyLimit?: number | null,
    qtyUsed?: number | null,
    qtyProduct?: number | null,
    qtyProductUsed?: number | null,
    search?: string | null,
    products?:  {
      __typename: "ModelCouponProductConnection",
      nextToken?: string | null,
    } | null,
    couponUsed?:  {
      __typename: "ModelCouponUsedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDeliveryMethodOrderMutationVariables = {
  input: CreateDeliveryMethodOrderInput,
  condition?: ModelDeliveryMethodOrderConditionInput | null,
};

export type CreateDeliveryMethodOrderMutation = {
  createDeliveryMethodOrder?:  {
    __typename: "DeliveryMethodOrder",
    id: string,
    name?: string | null,
    zipCode?: Array< string | null > | null,
    price?: number | null,
    time?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeliveryMethodOrderMutationVariables = {
  input: UpdateDeliveryMethodOrderInput,
  condition?: ModelDeliveryMethodOrderConditionInput | null,
};

export type UpdateDeliveryMethodOrderMutation = {
  updateDeliveryMethodOrder?:  {
    __typename: "DeliveryMethodOrder",
    id: string,
    name?: string | null,
    zipCode?: Array< string | null > | null,
    price?: number | null,
    time?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeliveryMethodOrderMutationVariables = {
  input: DeleteDeliveryMethodOrderInput,
  condition?: ModelDeliveryMethodOrderConditionInput | null,
};

export type DeleteDeliveryMethodOrderMutation = {
  deleteDeliveryMethodOrder?:  {
    __typename: "DeliveryMethodOrder",
    id: string,
    name?: string | null,
    zipCode?: Array< string | null > | null,
    price?: number | null,
    time?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQrCodeScanMutationVariables = {
  input: CreateQrCodeScanInput,
  condition?: ModelQrCodeScanConditionInput | null,
};

export type CreateQrCodeScanMutation = {
  createQrCodeScan?:  {
    __typename: "QrCodeScan",
    id: string,
    userID: string,
    relationID: string,
    uuid?: string | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateQuizMutationVariables = {
  input: CreateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type CreateQuizMutation = {
  createQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuizMutationVariables = {
  input: UpdateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type UpdateQuizMutation = {
  updateQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuizMutationVariables = {
  input: DeleteQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type DeleteQuizMutation = {
  deleteQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuizQuestionMutationVariables = {
  input: CreateQuizQuestionInput,
  condition?: ModelQuizQuestionConditionInput | null,
};

export type CreateQuizQuestionMutation = {
  createQuizQuestion?:  {
    __typename: "QuizQuestion",
    id: string,
    quizID: string,
    question: string,
    image?: string | null,
    alternativeA: string,
    alternativeB: string,
    alternativeC?: string | null,
    alternativeD?: string | null,
    alternativeE?: string | null,
    alternativeCorrect: string,
    order?: number | null,
    search?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuizQuestionMutationVariables = {
  input: UpdateQuizQuestionInput,
  condition?: ModelQuizQuestionConditionInput | null,
};

export type UpdateQuizQuestionMutation = {
  updateQuizQuestion?:  {
    __typename: "QuizQuestion",
    id: string,
    quizID: string,
    question: string,
    image?: string | null,
    alternativeA: string,
    alternativeB: string,
    alternativeC?: string | null,
    alternativeD?: string | null,
    alternativeE?: string | null,
    alternativeCorrect: string,
    order?: number | null,
    search?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuizQuestionMutationVariables = {
  input: DeleteQuizQuestionInput,
  condition?: ModelQuizQuestionConditionInput | null,
};

export type DeleteQuizQuestionMutation = {
  deleteQuizQuestion?:  {
    __typename: "QuizQuestion",
    id: string,
    quizID: string,
    question: string,
    image?: string | null,
    alternativeA: string,
    alternativeB: string,
    alternativeC?: string | null,
    alternativeD?: string | null,
    alternativeE?: string | null,
    alternativeCorrect: string,
    order?: number | null,
    search?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVideoObjectMutationVariables = {
  input: CreateVideoObjectInput,
  condition?: ModelVideoObjectConditionInput | null,
};

export type CreateVideoObjectMutation = {
  createVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVideoObjectMutationVariables = {
  input: UpdateVideoObjectInput,
  condition?: ModelVideoObjectConditionInput | null,
};

export type UpdateVideoObjectMutation = {
  updateVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVideoObjectMutationVariables = {
  input: DeleteVideoObjectInput,
  condition?: ModelVideoObjectConditionInput | null,
};

export type DeleteVideoObjectMutation = {
  deleteVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    phone?: string | null,
    status?: UserStatus | null,
    active?: boolean | null,
    avatar?: string | null,
    search?: string | null,
    createdAt?: string | null,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelGroupUserConnection",
      nextToken?: string | null,
    } | null,
    logs?:  {
      __typename: "ModelLogConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      nextToken?: string | null,
    } | null,
    payMethods?:  {
      __typename: "ModelPayMethodConnection",
      nextToken?: string | null,
    } | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    carts?:  {
      __typename: "ModelCartConnection",
      nextToken?: string | null,
    } | null,
    ordersByCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    ordersByStatusCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    phone?: string | null,
    status?: UserStatus | null,
    active?: boolean | null,
    avatar?: string | null,
    search?: string | null,
    createdAt?: string | null,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelGroupUserConnection",
      nextToken?: string | null,
    } | null,
    logs?:  {
      __typename: "ModelLogConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      nextToken?: string | null,
    } | null,
    payMethods?:  {
      __typename: "ModelPayMethodConnection",
      nextToken?: string | null,
    } | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    carts?:  {
      __typename: "ModelCartConnection",
      nextToken?: string | null,
    } | null,
    ordersByCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    ordersByStatusCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    phone?: string | null,
    status?: UserStatus | null,
    active?: boolean | null,
    avatar?: string | null,
    search?: string | null,
    createdAt?: string | null,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelGroupUserConnection",
      nextToken?: string | null,
    } | null,
    logs?:  {
      __typename: "ModelLogConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      nextToken?: string | null,
    } | null,
    payMethods?:  {
      __typename: "ModelPayMethodConnection",
      nextToken?: string | null,
    } | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    carts?:  {
      __typename: "ModelCartConnection",
      nextToken?: string | null,
    } | null,
    ordersByCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    ordersByStatusCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateProfileMutationVariables = {
  input: CreateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type CreateProfileMutation = {
  createProfile?:  {
    __typename: "Profile",
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    doc?: string | null,
    docType?: DocTypes | null,
    docProfession?: string | null,
    profession?: string | null,
    specialties?: string | null,
    subSpecialties?: string | null,
    bio?: string | null,
    gender?: GenderOptions | null,
    birth?: string | null,
    birthDay?: string | null,
    notes?: string | null,
    urlUserName?: string | null,
    urlEnable?: boolean | null,
    allowViewEmail?: boolean | null,
    allowViewPhone?: boolean | null,
    allowCookiesPreference?: boolean | null,
    allowCookiesStatistic?: boolean | null,
    pix?: string | null,
    zipCodeCoverage?: Array< string | null > | null,
    schedulesSunday?: Array< string | null > | null,
    schedulesMonday?: Array< string | null > | null,
    schedulesTuesday?: Array< string | null > | null,
    schedulesWednesday?: Array< string | null > | null,
    schedulesThursday?: Array< string | null > | null,
    schedulesFriday?: Array< string | null > | null,
    schedulesSaturday?: Array< string | null > | null,
    customerPagarmeID?: string | null,
    uuid?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfileMutationVariables = {
  input: UpdateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    doc?: string | null,
    docType?: DocTypes | null,
    docProfession?: string | null,
    profession?: string | null,
    specialties?: string | null,
    subSpecialties?: string | null,
    bio?: string | null,
    gender?: GenderOptions | null,
    birth?: string | null,
    birthDay?: string | null,
    notes?: string | null,
    urlUserName?: string | null,
    urlEnable?: boolean | null,
    allowViewEmail?: boolean | null,
    allowViewPhone?: boolean | null,
    allowCookiesPreference?: boolean | null,
    allowCookiesStatistic?: boolean | null,
    pix?: string | null,
    zipCodeCoverage?: Array< string | null > | null,
    schedulesSunday?: Array< string | null > | null,
    schedulesMonday?: Array< string | null > | null,
    schedulesTuesday?: Array< string | null > | null,
    schedulesWednesday?: Array< string | null > | null,
    schedulesThursday?: Array< string | null > | null,
    schedulesFriday?: Array< string | null > | null,
    schedulesSaturday?: Array< string | null > | null,
    customerPagarmeID?: string | null,
    uuid?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfileMutationVariables = {
  input: DeleteProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type DeleteProfileMutation = {
  deleteProfile?:  {
    __typename: "Profile",
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    doc?: string | null,
    docType?: DocTypes | null,
    docProfession?: string | null,
    profession?: string | null,
    specialties?: string | null,
    subSpecialties?: string | null,
    bio?: string | null,
    gender?: GenderOptions | null,
    birth?: string | null,
    birthDay?: string | null,
    notes?: string | null,
    urlUserName?: string | null,
    urlEnable?: boolean | null,
    allowViewEmail?: boolean | null,
    allowViewPhone?: boolean | null,
    allowCookiesPreference?: boolean | null,
    allowCookiesStatistic?: boolean | null,
    pix?: string | null,
    zipCodeCoverage?: Array< string | null > | null,
    schedulesSunday?: Array< string | null > | null,
    schedulesMonday?: Array< string | null > | null,
    schedulesTuesday?: Array< string | null > | null,
    schedulesWednesday?: Array< string | null > | null,
    schedulesThursday?: Array< string | null > | null,
    schedulesFriday?: Array< string | null > | null,
    schedulesSaturday?: Array< string | null > | null,
    customerPagarmeID?: string | null,
    uuid?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAddressMutationVariables = {
  input: CreateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type CreateAddressMutation = {
  createAddress?:  {
    __typename: "Address",
    id: string,
    userID: string,
    name?: string | null,
    reference?: string | null,
    street?: string | null,
    number?: string | null,
    complement?: string | null,
    zipcode?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    addressPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAddressMutationVariables = {
  input: UpdateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type UpdateAddressMutation = {
  updateAddress?:  {
    __typename: "Address",
    id: string,
    userID: string,
    name?: string | null,
    reference?: string | null,
    street?: string | null,
    number?: string | null,
    complement?: string | null,
    zipcode?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    addressPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePayMethodMutationVariables = {
  input: CreatePayMethodInput,
  condition?: ModelPayMethodConditionInput | null,
};

export type CreatePayMethodMutation = {
  createPayMethod?:  {
    __typename: "PayMethod",
    id: string,
    userID: string,
    method: PaymentMethods,
    number?: string | null,
    holderName?: string | null,
    holderDocument?: string | null,
    expMonth?: number | null,
    expYear?: number | null,
    cvv?: string | null,
    brand?: string | null,
    label?: string | null,
    cardPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePayMethodMutationVariables = {
  input: UpdatePayMethodInput,
  condition?: ModelPayMethodConditionInput | null,
};

export type UpdatePayMethodMutation = {
  updatePayMethod?:  {
    __typename: "PayMethod",
    id: string,
    userID: string,
    method: PaymentMethods,
    number?: string | null,
    holderName?: string | null,
    holderDocument?: string | null,
    expMonth?: number | null,
    expYear?: number | null,
    cvv?: string | null,
    brand?: string | null,
    label?: string | null,
    cardPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLogMutationVariables = {
  input: CreateLogInput,
  condition?: ModelLogConditionInput | null,
};

export type CreateLogMutation = {
  createLog?:  {
    __typename: "Log",
    id: string,
    userID: string,
    tag: string,
    source: LogSource,
    notes?: string | null,
    message?: string | null,
    page?: string | null,
    manufacturer?: string | null,
    model?: string | null,
    osName?: string | null,
    osVersion?: string | null,
    platform?: string | null,
    uuid?: string | null,
    ip?: string | null,
    city?: string | null,
    region?: string | null,
    country?: string | null,
    provider?: string | null,
    lat?: number | null,
    lng?: number | null,
    createdAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateInviteMutationVariables = {
  input: UpdateInviteInput,
  condition?: ModelInviteConditionInput | null,
};

export type UpdateInviteMutation = {
  updateInvite?:  {
    __typename: "Invite",
    id: string,
    name: string,
    description?: string | null,
    email?: string | null,
    phone?: string | null,
    groups?: Array< string | null > | null,
    status: InviteStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateDataBaseMutationVariables = {
  input: CreateDataBaseInput,
  condition?: ModelDataBaseConditionInput | null,
};

export type CreateDataBaseMutation = {
  createDataBase?:  {
    __typename: "DataBase",
    id: string,
    name: string,
    items?:  {
      __typename: "ModelDataBaseItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDataBaseItemMutationVariables = {
  input: CreateDataBaseItemInput,
  condition?: ModelDataBaseItemConditionInput | null,
};

export type CreateDataBaseItemMutation = {
  createDataBaseItem?:  {
    __typename: "DataBaseItem",
    id: string,
    dataBaseID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    data: string,
    status: DataBaseItemStatus,
    search?: string | null,
    notes?: string | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateFavoriteMutationVariables = {
  input: CreateFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type CreateFavoriteMutation = {
  createFavorite?:  {
    __typename: "Favorite",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: string,
    favoriteID: string,
    link: string,
    content?: string | null,
    productID?: string | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    pageID?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFavoriteMutationVariables = {
  input: UpdateFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type UpdateFavoriteMutation = {
  updateFavorite?:  {
    __typename: "Favorite",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: string,
    favoriteID: string,
    link: string,
    content?: string | null,
    productID?: string | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    pageID?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFavoriteMutationVariables = {
  input: DeleteFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type DeleteFavoriteMutation = {
  deleteFavorite?:  {
    __typename: "Favorite",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: string,
    favoriteID: string,
    link: string,
    content?: string | null,
    productID?: string | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    pageID?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRelationMutationVariables = {
  input: CreateRelationInput,
  condition?: ModelRelationConditionInput | null,
};

export type CreateRelationMutation = {
  createRelation?:  {
    __typename: "Relation",
    id: string,
    type: string,
    mode: RelationModes,
    name?: string | null,
    description?: string | null,
    avatar?: string | null,
    reference?: string | null,
    members: Array< string >,
    admins: Array< string >,
    updatedAt?: string | null,
    status: string,
    search?: string | null,
    config?: string | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    schedules?:  {
      __typename: "ModelScheduleConnection",
      nextToken?: string | null,
    } | null,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    restrictedContents?:  {
      __typename: "ModelRestrictedContentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type UpdateRelationMutationVariables = {
  input: UpdateRelationInput,
  condition?: ModelRelationConditionInput | null,
};

export type UpdateRelationMutation = {
  updateRelation?:  {
    __typename: "Relation",
    id: string,
    type: string,
    mode: RelationModes,
    name?: string | null,
    description?: string | null,
    avatar?: string | null,
    reference?: string | null,
    members: Array< string >,
    admins: Array< string >,
    updatedAt?: string | null,
    status: string,
    search?: string | null,
    config?: string | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    schedules?:  {
      __typename: "ModelScheduleConnection",
      nextToken?: string | null,
    } | null,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    restrictedContents?:  {
      __typename: "ModelRestrictedContentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type DeleteRelationMutationVariables = {
  input: DeleteRelationInput,
  condition?: ModelRelationConditionInput | null,
};

export type DeleteRelationMutation = {
  deleteRelation?:  {
    __typename: "Relation",
    id: string,
    type: string,
    mode: RelationModes,
    name?: string | null,
    description?: string | null,
    avatar?: string | null,
    reference?: string | null,
    members: Array< string >,
    admins: Array< string >,
    updatedAt?: string | null,
    status: string,
    search?: string | null,
    config?: string | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    schedules?:  {
      __typename: "ModelScheduleConnection",
      nextToken?: string | null,
    } | null,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    restrictedContents?:  {
      __typename: "ModelRestrictedContentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type CreateRelationLinkMutationVariables = {
  input: CreateRelationLinkInput,
  condition?: ModelRelationLinkConditionInput | null,
};

export type CreateRelationLinkMutation = {
  createRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type UpdateRelationLinkMutationVariables = {
  input: UpdateRelationLinkInput,
  condition?: ModelRelationLinkConditionInput | null,
};

export type UpdateRelationLinkMutation = {
  updateRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type DeleteRelationLinkMutationVariables = {
  input: DeleteRelationLinkInput,
  condition?: ModelRelationLinkConditionInput | null,
};

export type DeleteRelationLinkMutation = {
  deleteRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type CreateNotifyMutationVariables = {
  input: CreateNotifyInput,
  condition?: ModelNotifyConditionInput | null,
};

export type CreateNotifyMutation = {
  createNotify?:  {
    __typename: "Notify",
    id: string,
    userID: string,
    date: string,
    content?: string | null,
    link?: string | null,
    viewed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotifyMutationVariables = {
  input: DeleteNotifyInput,
  condition?: ModelNotifyConditionInput | null,
};

export type DeleteNotifyMutation = {
  deleteNotify?:  {
    __typename: "Notify",
    id: string,
    userID: string,
    date: string,
    content?: string | null,
    link?: string | null,
    viewed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    restrictedContentID?: string | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: MessagesTypes,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    status?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    restrictedContentID?: string | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: MessagesTypes,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    status?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    restrictedContentID?: string | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: MessagesTypes,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    status?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateScheduleMutationVariables = {
  input: CreateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type CreateScheduleMutation = {
  createSchedule?:  {
    __typename: "Schedule",
    id: string,
    relationID: string,
    userID: string,
    dateTime?: string | null,
    title?: string | null,
    description?: string | null,
    link?: string | null,
    frequency?: ScheduleFrequencies | null,
    createdAt?: string | null,
    viewType?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateScheduleMutationVariables = {
  input: UpdateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type UpdateScheduleMutation = {
  updateSchedule?:  {
    __typename: "Schedule",
    id: string,
    relationID: string,
    userID: string,
    dateTime?: string | null,
    title?: string | null,
    description?: string | null,
    link?: string | null,
    frequency?: ScheduleFrequencies | null,
    createdAt?: string | null,
    viewType?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteScheduleMutationVariables = {
  input: DeleteScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type DeleteScheduleMutation = {
  deleteSchedule?:  {
    __typename: "Schedule",
    id: string,
    relationID: string,
    userID: string,
    dateTime?: string | null,
    title?: string | null,
    description?: string | null,
    link?: string | null,
    frequency?: ScheduleFrequencies | null,
    createdAt?: string | null,
    viewType?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateDocumentMutationVariables = {
  input: CreateDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type CreateDocumentMutation = {
  createDocument?:  {
    __typename: "Document",
    id: string,
    relationID: string,
    ownerID: string,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    conclusion?: string | null,
    content?: string | null,
    fileKey?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    owner?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateDocumentMutationVariables = {
  input: UpdateDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type UpdateDocumentMutation = {
  updateDocument?:  {
    __typename: "Document",
    id: string,
    relationID: string,
    ownerID: string,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    conclusion?: string | null,
    content?: string | null,
    fileKey?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    owner?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateRestrictedContentViewMutationVariables = {
  input: CreateRestrictedContentViewInput,
  condition?: ModelRestrictedContentViewConditionInput | null,
};

export type CreateRestrictedContentViewMutation = {
  createRestrictedContentView?:  {
    __typename: "RestrictedContentView",
    id: string,
    restrictedContentID: string,
    userID: string,
    percentage?: number | null,
    rating?: number | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRestrictedContentViewMutationVariables = {
  input: UpdateRestrictedContentViewInput,
  condition?: ModelRestrictedContentViewConditionInput | null,
};

export type UpdateRestrictedContentViewMutation = {
  updateRestrictedContentView?:  {
    __typename: "RestrictedContentView",
    id: string,
    restrictedContentID: string,
    userID: string,
    percentage?: number | null,
    rating?: number | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePageMutationVariables = {
  input: CreatePageInput,
  condition?: ModelPageConditionInput | null,
};

export type CreatePageMutation = {
  createPage?:  {
    __typename: "Page",
    id: string,
    alias: string,
    status: PageStatus,
    type: PageType,
    menu: string,
    menuProps?:  {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    order: number,
    title: string,
    titlePadX?: string | null,
    titlePadY?: string | null,
    description?: string | null,
    content?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    tags?: Array< string | null > | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    blocks?:  {
      __typename: "ModelBlockConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateCartMutationVariables = {
  input: CreateCartInput,
  condition?: ModelCartConditionInput | null,
};

export type CreateCartMutation = {
  createCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCartMutationVariables = {
  input: UpdateCartInput,
  condition?: ModelCartConditionInput | null,
};

export type UpdateCartMutation = {
  updateCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCartOptionMutationVariables = {
  input: CreateCartOptionInput,
  condition?: ModelCartOptionConditionInput | null,
};

export type CreateCartOptionMutation = {
  createCartOption?:  {
    __typename: "CartOption",
    id: string,
    cartID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userID?: string | null,
  } | null,
};

export type UpdateCartOptionMutationVariables = {
  input: UpdateCartOptionInput,
  condition?: ModelCartOptionConditionInput | null,
};

export type UpdateCartOptionMutation = {
  updateCartOption?:  {
    __typename: "CartOption",
    id: string,
    cartID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userID?: string | null,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type CreateOrderItemMutationVariables = {
  input: CreateOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type CreateOrderItemMutation = {
  createOrderItem?:  {
    __typename: "OrderItem",
    id: string,
    orderID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    optionsItem?:  {
      __typename: "ModelOrderItemOptionConnection",
      nextToken?: string | null,
    } | null,
    qty: number,
    code?: string | null,
    name: string,
    description?: string | null,
    price: number,
    photo1?: string | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    changeNameAdmin?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrderItemMutationVariables = {
  input: UpdateOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type UpdateOrderItemMutation = {
  updateOrderItem?:  {
    __typename: "OrderItem",
    id: string,
    orderID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    optionsItem?:  {
      __typename: "ModelOrderItemOptionConnection",
      nextToken?: string | null,
    } | null,
    qty: number,
    code?: string | null,
    name: string,
    description?: string | null,
    price: number,
    photo1?: string | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    changeNameAdmin?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrderItemMutationVariables = {
  input: DeleteOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type DeleteOrderItemMutation = {
  deleteOrderItem?:  {
    __typename: "OrderItem",
    id: string,
    orderID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    optionsItem?:  {
      __typename: "ModelOrderItemOptionConnection",
      nextToken?: string | null,
    } | null,
    qty: number,
    code?: string | null,
    name: string,
    description?: string | null,
    price: number,
    photo1?: string | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    changeNameAdmin?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOrderItemOptionMutationVariables = {
  input: CreateOrderItemOptionInput,
  condition?: ModelOrderItemOptionConditionInput | null,
};

export type CreateOrderItemOptionMutation = {
  createOrderItemOption?:  {
    __typename: "OrderItemOption",
    id: string,
    orderItemID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrderItemOptionMutationVariables = {
  input: UpdateOrderItemOptionInput,
  condition?: ModelOrderItemOptionConditionInput | null,
};

export type UpdateOrderItemOptionMutation = {
  updateOrderItemOption?:  {
    __typename: "OrderItemOption",
    id: string,
    orderItemID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrderItemOptionMutationVariables = {
  input: DeleteOrderItemOptionInput,
  condition?: ModelOrderItemOptionConditionInput | null,
};

export type DeleteOrderItemOptionMutation = {
  deleteOrderItemOption?:  {
    __typename: "OrderItemOption",
    id: string,
    orderItemID: string,
    optionID: string,
    option?:  {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCouponMutationVariables = {
  input: UpdateCouponInput,
  condition?: ModelCouponConditionInput | null,
};

export type UpdateCouponMutation = {
  updateCoupon?:  {
    __typename: "Coupon",
    id: string,
    name: string,
    description?: string | null,
    code: string,
    start?: string | null,
    expiration?: string | null,
    discountPercentage?: number | null,
    discountValue?: number | null,
    qtyLimit?: number | null,
    qtyUsed?: number | null,
    qtyProduct?: number | null,
    qtyProductUsed?: number | null,
    search?: string | null,
    products?:  {
      __typename: "ModelCouponProductConnection",
      nextToken?: string | null,
    } | null,
    couponUsed?:  {
      __typename: "ModelCouponUsedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCouponProductMutationVariables = {
  input: CreateCouponProductInput,
  condition?: ModelCouponProductConditionInput | null,
};

export type CreateCouponProductMutation = {
  createCouponProduct?:  {
    __typename: "CouponProduct",
    id: string,
    couponID: string,
    productID: string,
    price?: number | null,
    limit?: number | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCouponProductMutationVariables = {
  input: UpdateCouponProductInput,
  condition?: ModelCouponProductConditionInput | null,
};

export type UpdateCouponProductMutation = {
  updateCouponProduct?:  {
    __typename: "CouponProduct",
    id: string,
    couponID: string,
    productID: string,
    price?: number | null,
    limit?: number | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCouponProductMutationVariables = {
  input: DeleteCouponProductInput,
  condition?: ModelCouponProductConditionInput | null,
};

export type DeleteCouponProductMutation = {
  deleteCouponProduct?:  {
    __typename: "CouponProduct",
    id: string,
    couponID: string,
    productID: string,
    price?: number | null,
    limit?: number | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCouponUsedMutationVariables = {
  input: CreateCouponUsedInput,
  condition?: ModelCouponUsedConditionInput | null,
};

export type CreateCouponUsedMutation = {
  createCouponUsed?:  {
    __typename: "CouponUsed",
    id: string,
    couponID: string,
    coupon?:  {
      __typename: "Coupon",
      id: string,
      name: string,
      description?: string | null,
      code: string,
      start?: string | null,
      expiration?: string | null,
      discountPercentage?: number | null,
      discountValue?: number | null,
      qtyLimit?: number | null,
      qtyUsed?: number | null,
      qtyProduct?: number | null,
      qtyProductUsed?: number | null,
      search?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    qty?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDeliveryOrderMutationVariables = {
  input: CreateDeliveryOrderInput,
  condition?: ModelDeliveryOrderConditionInput | null,
};

export type CreateDeliveryOrderMutation = {
  createDeliveryOrder?:  {
    __typename: "DeliveryOrder",
    id: string,
    orderID: string,
    order?:  {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null,
    date: string,
    deliveryUserID: string,
    deliveryUser?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: DeliveryStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeliveryOrderMutationVariables = {
  input: UpdateDeliveryOrderInput,
  condition?: ModelDeliveryOrderConditionInput | null,
};

export type UpdateDeliveryOrderMutation = {
  updateDeliveryOrder?:  {
    __typename: "DeliveryOrder",
    id: string,
    orderID: string,
    order?:  {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null,
    date: string,
    deliveryUserID: string,
    deliveryUser?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: DeliveryStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeliveryOrderMutationVariables = {
  input: DeleteDeliveryOrderInput,
  condition?: ModelDeliveryOrderConditionInput | null,
};

export type DeleteDeliveryOrderMutation = {
  deleteDeliveryOrder?:  {
    __typename: "DeliveryOrder",
    id: string,
    orderID: string,
    order?:  {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null,
    date: string,
    deliveryUserID: string,
    deliveryUser?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: DeliveryStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SignedUrlQueryVariables = {
  id?: string | null,
  key?: string | null,
  bucket?: string | null,
  region?: string | null,
  action?: string | null,
  contentType?: string | null,
};

export type SignedUrlQuery = {
  SignedUrl?: string | null,
};

export type ListFoldersQueryVariables = {
  id?: string | null,
  filter?: ModelFolderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFoldersQuery = {
  listFolders?:  {
    __typename: "ModelFolderConnection",
    items:  Array< {
      __typename: "Folder",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVideoObjectQueryVariables = {
  id: string,
};

export type GetVideoObjectQuery = {
  getVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVideoObjectsQueryVariables = {
  filter?: ModelVideoObjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVideoObjectsQuery = {
  listVideoObjects?:  {
    __typename: "ModelVideoObjectConnection",
    items:  Array< {
      __typename: "VideoObject",
      id: string,
      token?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFoldersByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFolderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFoldersByNameQuery = {
  listFoldersByName?:  {
    __typename: "ModelFolderConnection",
    items:  Array< {
      __typename: "Folder",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    phone?: string | null,
    status?: UserStatus | null,
    active?: boolean | null,
    avatar?: string | null,
    search?: string | null,
    createdAt?: string | null,
    profile?:  {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelGroupUserConnection",
      nextToken?: string | null,
    } | null,
    logs?:  {
      __typename: "ModelLogConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      nextToken?: string | null,
    } | null,
    payMethods?:  {
      __typename: "ModelPayMethodConnection",
      nextToken?: string | null,
    } | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    carts?:  {
      __typename: "ModelCartConnection",
      nextToken?: string | null,
    } | null,
    ordersByCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    ordersByStatusCreatedAt?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByEmailQuery = {
  getUserByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByPhoneQueryVariables = {
  phone: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByPhoneQuery = {
  getUserByPhone?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersByStatusCreatedAtQueryVariables = {
  status: UserStatus,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersByStatusCreatedAtQuery = {
  listUsersByStatusCreatedAt?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProfileQueryVariables = {
  userID: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    doc?: string | null,
    docType?: DocTypes | null,
    docProfession?: string | null,
    profession?: string | null,
    specialties?: string | null,
    subSpecialties?: string | null,
    bio?: string | null,
    gender?: GenderOptions | null,
    birth?: string | null,
    birthDay?: string | null,
    notes?: string | null,
    urlUserName?: string | null,
    urlEnable?: boolean | null,
    allowViewEmail?: boolean | null,
    allowViewPhone?: boolean | null,
    allowCookiesPreference?: boolean | null,
    allowCookiesStatistic?: boolean | null,
    pix?: string | null,
    zipCodeCoverage?: Array< string | null > | null,
    schedulesSunday?: Array< string | null > | null,
    schedulesMonday?: Array< string | null > | null,
    schedulesTuesday?: Array< string | null > | null,
    schedulesWednesday?: Array< string | null > | null,
    schedulesThursday?: Array< string | null > | null,
    schedulesFriday?: Array< string | null > | null,
    schedulesSaturday?: Array< string | null > | null,
    customerPagarmeID?: string | null,
    uuid?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersByBirthDayQueryVariables = {
  birthDay: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersByBirthDayQuery = {
  listUsersByBirthDay?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      userID: string,
      doc?: string | null,
      docType?: DocTypes | null,
      docProfession?: string | null,
      profession?: string | null,
      specialties?: string | null,
      subSpecialties?: string | null,
      bio?: string | null,
      gender?: GenderOptions | null,
      birth?: string | null,
      birthDay?: string | null,
      notes?: string | null,
      urlUserName?: string | null,
      urlEnable?: boolean | null,
      allowViewEmail?: boolean | null,
      allowViewPhone?: boolean | null,
      allowCookiesPreference?: boolean | null,
      allowCookiesStatistic?: boolean | null,
      pix?: string | null,
      zipCodeCoverage?: Array< string | null > | null,
      schedulesSunday?: Array< string | null > | null,
      schedulesMonday?: Array< string | null > | null,
      schedulesTuesday?: Array< string | null > | null,
      schedulesWednesday?: Array< string | null > | null,
      schedulesThursday?: Array< string | null > | null,
      schedulesFriday?: Array< string | null > | null,
      schedulesSaturday?: Array< string | null > | null,
      customerPagarmeID?: string | null,
      uuid?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListGroupUsersQueryVariables = {
  id?: string | null,
  filter?: ModelGroupUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListGroupUsersQuery = {
  listGroupUsers?:  {
    __typename: "ModelGroupUserConnection",
    items:  Array< {
      __typename: "GroupUser",
      id: string,
      group: string,
      userID: string,
      profileID: string,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersByGroupQueryVariables = {
  group: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersByGroupQuery = {
  listUsersByGroup?:  {
    __typename: "ModelGroupUserConnection",
    items:  Array< {
      __typename: "GroupUser",
      id: string,
      group: string,
      userID: string,
      profileID: string,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListGroupsByUserQueryVariables = {
  userID: string,
  group?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupsByUserQuery = {
  listGroupsByUser?:  {
    __typename: "ModelGroupUserConnection",
    items:  Array< {
      __typename: "GroupUser",
      id: string,
      group: string,
      userID: string,
      profileID: string,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAddressQueryVariables = {
  id: string,
};

export type GetAddressQuery = {
  getAddress?:  {
    __typename: "Address",
    id: string,
    userID: string,
    name?: string | null,
    reference?: string | null,
    street?: string | null,
    number?: string | null,
    complement?: string | null,
    zipcode?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    addressPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAddressesQueryVariables = {
  id?: string | null,
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAddressesQuery = {
  listAddresses?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      id: string,
      userID: string,
      name?: string | null,
      reference?: string | null,
      street?: string | null,
      number?: string | null,
      complement?: string | null,
      zipcode?: string | null,
      neighborhood?: string | null,
      city?: string | null,
      state?: string | null,
      country?: string | null,
      addressPagarmeID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAddressesByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAddressesByUserQuery = {
  listAddressesByUser?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      id: string,
      userID: string,
      name?: string | null,
      reference?: string | null,
      street?: string | null,
      number?: string | null,
      complement?: string | null,
      zipcode?: string | null,
      neighborhood?: string | null,
      city?: string | null,
      state?: string | null,
      country?: string | null,
      addressPagarmeID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPayMethodQueryVariables = {
  id: string,
};

export type GetPayMethodQuery = {
  getPayMethod?:  {
    __typename: "PayMethod",
    id: string,
    userID: string,
    method: PaymentMethods,
    number?: string | null,
    holderName?: string | null,
    holderDocument?: string | null,
    expMonth?: number | null,
    expYear?: number | null,
    cvv?: string | null,
    brand?: string | null,
    label?: string | null,
    cardPagarmeID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPayMethodsQueryVariables = {
  id?: string | null,
  filter?: ModelPayMethodFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPayMethodsQuery = {
  listPayMethods?:  {
    __typename: "ModelPayMethodConnection",
    items:  Array< {
      __typename: "PayMethod",
      id: string,
      userID: string,
      method: PaymentMethods,
      number?: string | null,
      holderName?: string | null,
      holderDocument?: string | null,
      expMonth?: number | null,
      expYear?: number | null,
      cvv?: string | null,
      brand?: string | null,
      label?: string | null,
      cardPagarmeID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPayMethodsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPayMethodFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPayMethodsByUserQuery = {
  listPayMethodsByUser?:  {
    __typename: "ModelPayMethodConnection",
    items:  Array< {
      __typename: "PayMethod",
      id: string,
      userID: string,
      method: PaymentMethods,
      number?: string | null,
      holderName?: string | null,
      holderDocument?: string | null,
      expMonth?: number | null,
      expYear?: number | null,
      cvv?: string | null,
      brand?: string | null,
      label?: string | null,
      cardPagarmeID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsQueryVariables = {
  id?: string | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLogsQuery = {
  listLogs?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByUserCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByUserCreatedAtQuery = {
  listLogsByUserCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByUserTagCreatedAtQueryVariables = {
  userID: string,
  tagCreatedAt?: ModelLogLogsByUserTagCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByUserTagCreatedAtQuery = {
  listLogsByUserTagCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsByTagCreatedAtQueryVariables = {
  tag: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsByTagCreatedAtQuery = {
  listLogsByTagCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLogsBySourceCreatedAtQueryVariables = {
  source: LogSource,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLogsBySourceCreatedAtQuery = {
  listLogsBySourceCreatedAt?:  {
    __typename: "ModelLogConnection",
    items:  Array< {
      __typename: "Log",
      id: string,
      userID: string,
      tag: string,
      source: LogSource,
      notes?: string | null,
      message?: string | null,
      page?: string | null,
      manufacturer?: string | null,
      model?: string | null,
      osName?: string | null,
      osVersion?: string | null,
      platform?: string | null,
      uuid?: string | null,
      ip?: string | null,
      city?: string | null,
      region?: string | null,
      country?: string | null,
      provider?: string | null,
      lat?: number | null,
      lng?: number | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetConfigQueryVariables = {
  id: string,
};

export type GetConfigQuery = {
  getConfig?:  {
    __typename: "Config",
    id: string,
    validationMode: ConfigValidationModes,
    googleAnalyticsID?: string | null,
    googleSiteVerification?: string | null,
    facebook?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    infoFooter?: string | null,
    minValueOrder?: number | null,
    phoneOrders?: string | null,
    phoneSac?: string | null,
    phoneWhatsapp?: string | null,
    allowPayOnDelivery?: boolean | null,
    allowLocalPickup?: boolean | null,
    deliveryOnSunday?: string | null,
    deliveryOnMonday?: string | null,
    deliveryOnTuesday?: string | null,
    deliveryOnWednesday?: string | null,
    deliveryOnThursday?: string | null,
    deliveryOnFriday?: string | null,
    deliveryOnSaturday?: string | null,
    deliveryOffSunday?: string | null,
    deliveryOffMonday?: string | null,
    deliveryOffTuesday?: string | null,
    deliveryOffWednesday?: string | null,
    deliveryOffThursday?: string | null,
    deliveryOffFriday?: string | null,
    deliveryOffSaturday?: string | null,
    showNotesCart?: boolean | null,
    notesCart?: string | null,
    soundOnNewOrder?: boolean | null,
    birthDayEnable?: boolean | null,
    birthDaySubject?: string | null,
    birthDayMessage?: string | null,
    footer?: string | null,
    navBar?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetInviteQueryVariables = {
  id: string,
};

export type GetInviteQuery = {
  getInvite?:  {
    __typename: "Invite",
    id: string,
    name: string,
    description?: string | null,
    email?: string | null,
    phone?: string | null,
    groups?: Array< string | null > | null,
    status: InviteStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListInvitesQueryVariables = {
  id?: string | null,
  filter?: ModelInviteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInvitesQuery = {
  listInvites?:  {
    __typename: "ModelInviteConnection",
    items:  Array< {
      __typename: "Invite",
      id: string,
      name: string,
      description?: string | null,
      email?: string | null,
      phone?: string | null,
      groups?: Array< string | null > | null,
      status: InviteStatus,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInvitesByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInviteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInvitesByEmailQuery = {
  listInvitesByEmail?:  {
    __typename: "ModelInviteConnection",
    items:  Array< {
      __typename: "Invite",
      id: string,
      name: string,
      description?: string | null,
      email?: string | null,
      phone?: string | null,
      groups?: Array< string | null > | null,
      status: InviteStatus,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInvitesByPhoneQueryVariables = {
  phone: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInviteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInvitesByPhoneQuery = {
  listInvitesByPhone?:  {
    __typename: "ModelInviteConnection",
    items:  Array< {
      __typename: "Invite",
      id: string,
      name: string,
      description?: string | null,
      email?: string | null,
      phone?: string | null,
      groups?: Array< string | null > | null,
      status: InviteStatus,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInvitesByStatusCreatedAtQueryVariables = {
  status: InviteStatus,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInviteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInvitesByStatusCreatedAtQuery = {
  listInvitesByStatusCreatedAt?:  {
    __typename: "ModelInviteConnection",
    items:  Array< {
      __typename: "Invite",
      id: string,
      name: string,
      description?: string | null,
      email?: string | null,
      phone?: string | null,
      groups?: Array< string | null > | null,
      status: InviteStatus,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDataBasesQueryVariables = {
  id?: string | null,
  filter?: ModelDataBaseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDataBasesQuery = {
  listDataBases?:  {
    __typename: "ModelDataBaseConnection",
    items:  Array< {
      __typename: "DataBase",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDataBasesByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDataBaseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDataBasesByNameQuery = {
  listDataBasesByName?:  {
    __typename: "ModelDataBaseConnection",
    items:  Array< {
      __typename: "DataBase",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsByDataBaseCreatedAtQueryVariables = {
  dataBaseID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDataBaseItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsByDataBaseCreatedAtQuery = {
  listItemsByDataBaseCreatedAt?:  {
    __typename: "ModelDataBaseItemConnection",
    items:  Array< {
      __typename: "DataBaseItem",
      id: string,
      dataBaseID: string,
      userID: string,
      data: string,
      status: DataBaseItemStatus,
      search?: string | null,
      notes?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsByUserCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDataBaseItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsByUserCreatedAtQuery = {
  listItemsByUserCreatedAt?:  {
    __typename: "ModelDataBaseItemConnection",
    items:  Array< {
      __typename: "DataBaseItem",
      id: string,
      dataBaseID: string,
      userID: string,
      data: string,
      status: DataBaseItemStatus,
      search?: string | null,
      notes?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMidiasQueryVariables = {
  id?: string | null,
  filter?: ModelMidiaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMidiasQuery = {
  listMidias?:  {
    __typename: "ModelMidiaConnection",
    items:  Array< {
      __typename: "Midia",
      id: string,
      key: string,
      type?: MidiaTypes | null,
      title?: string | null,
      subTitle?: string | null,
      description?: string | null,
      link?: string | null,
      identifyText?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMidiaByKeyQueryVariables = {
  key: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMidiaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMidiaByKeyQuery = {
  listMidiaByKey?:  {
    __typename: "ModelMidiaConnection",
    items:  Array< {
      __typename: "Midia",
      id: string,
      key: string,
      type?: MidiaTypes | null,
      title?: string | null,
      subTitle?: string | null,
      description?: string | null,
      link?: string | null,
      identifyText?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFavoritesQueryVariables = {
  id?: string | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFavoritesQuery = {
  listFavorites?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userID: string,
      type: string,
      favoriteID: string,
      link: string,
      content?: string | null,
      productID?: string | null,
      relationID?: string | null,
      pageID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFavoritesByUserTypeQueryVariables = {
  userID: string,
  type?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFavoritesByUserTypeQuery = {
  listFavoritesByUserType?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userID: string,
      type: string,
      favoriteID: string,
      link: string,
      content?: string | null,
      productID?: string | null,
      relationID?: string | null,
      pageID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFavoritesByFavoriteIDUserQueryVariables = {
  favoriteID: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFavoritesByFavoriteIDUserQuery = {
  listFavoritesByFavoriteIDUser?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userID: string,
      type: string,
      favoriteID: string,
      link: string,
      content?: string | null,
      productID?: string | null,
      relationID?: string | null,
      pageID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRelationQueryVariables = {
  id: string,
};

export type GetRelationQuery = {
  getRelation?:  {
    __typename: "Relation",
    id: string,
    type: string,
    mode: RelationModes,
    name?: string | null,
    description?: string | null,
    avatar?: string | null,
    reference?: string | null,
    members: Array< string >,
    admins: Array< string >,
    updatedAt?: string | null,
    status: string,
    search?: string | null,
    config?: string | null,
    relationsLink?:  {
      __typename: "ModelRelationLinkConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    schedules?:  {
      __typename: "ModelScheduleConnection",
      nextToken?: string | null,
    } | null,
    documents?:  {
      __typename: "ModelDocumentConnection",
      nextToken?: string | null,
    } | null,
    restrictedContents?:  {
      __typename: "ModelRestrictedContentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type ListRelationsQueryVariables = {
  id?: string | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRelationsQuery = {
  listRelations?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByTypeUpdatedAtQueryVariables = {
  type: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeUpdatedAtQuery = {
  listRelationsByTypeUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByTypeModeUpdatedAtQueryVariables = {
  type: string,
  modeUpdatedAt?: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeModeUpdatedAtQuery = {
  listRelationsByTypeModeUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByTypeStatusUpdatedAtQueryVariables = {
  type: string,
  statusUpdatedAt?: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByTypeStatusUpdatedAtQuery = {
  listRelationsByTypeStatusUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByStatusUpdatedAtQueryVariables = {
  status: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByStatusUpdatedAtQuery = {
  listRelationsByStatusUpdatedAt?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsByStatusTypeNameQueryVariables = {
  status: string,
  typeName?: ModelRelationRelationsByStatusTypeNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsByStatusTypeNameQuery = {
  listRelationsByStatusTypeName?:  {
    __typename: "ModelRelationConnection",
    items:  Array< {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsLinkQueryVariables = {
  id?: string | null,
  filter?: ModelRelationLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRelationsLinkQuery = {
  listRelationsLink?:  {
    __typename: "ModelRelationLinkConnection",
    items:  Array< {
      __typename: "RelationLink",
      id: string,
      userID: string,
      relationID: string,
      type: string,
      notify: number,
      updatedAt?: string | null,
      search?: string | null,
      percentage?: number | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables = {
  userID: string,
  typeNotifyUpdatedAt?: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsLinkByUserTypeNotifyUpdatedAtQuery = {
  listRelationsLinkByUserTypeNotifyUpdatedAt?:  {
    __typename: "ModelRelationLinkConnection",
    items:  Array< {
      __typename: "RelationLink",
      id: string,
      userID: string,
      relationID: string,
      type: string,
      notify: number,
      updatedAt?: string | null,
      search?: string | null,
      percentage?: number | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRelationsLinkByRelationUserQueryVariables = {
  relationID: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsLinkByRelationUserQuery = {
  listRelationsLinkByRelationUser?:  {
    __typename: "ModelRelationLinkConnection",
    items:  Array< {
      __typename: "RelationLink",
      id: string,
      userID: string,
      relationID: string,
      type: string,
      notify: number,
      updatedAt?: string | null,
      search?: string | null,
      percentage?: number | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotifyByUserDateQueryVariables = {
  userID: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotifyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotifyByUserDateQuery = {
  notifyByUserDate?:  {
    __typename: "ModelNotifyConnection",
    items:  Array< {
      __typename: "Notify",
      id: string,
      userID: string,
      date: string,
      content?: string | null,
      link?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByRelationCreatedAtQueryVariables = {
  relationID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByRelationCreatedAtQuery = {
  listMessagesByRelationCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      relationID?: string | null,
      restrictedContentID?: string | null,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByRestrictedContentCreatedAtQueryVariables = {
  restrictedContentID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByRestrictedContentCreatedAtQuery = {
  listMessagesByRestrictedContentCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      relationID?: string | null,
      restrictedContentID?: string | null,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByUserCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByUserCreatedAtQuery = {
  listMessagesByUserCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      relationID?: string | null,
      restrictedContentID?: string | null,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByStatusRelationCreatedAtQueryVariables = {
  status: string,
  relationIDCreatedAt?: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByStatusRelationCreatedAtQuery = {
  listMessagesByStatusRelationCreatedAt?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      relationID?: string | null,
      restrictedContentID?: string | null,
      userID: string,
      type: MessagesTypes,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      status?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchedulesByRelationDateTimeQueryVariables = {
  relationID: string,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesByRelationDateTimeQuery = {
  listSchedulesByRelationDateTime?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      relationID: string,
      userID: string,
      dateTime?: string | null,
      title?: string | null,
      description?: string | null,
      link?: string | null,
      frequency?: ScheduleFrequencies | null,
      createdAt?: string | null,
      viewType?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchedulesByUserCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesByUserCreatedAtQuery = {
  listSchedulesByUserCreatedAt?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      relationID: string,
      userID: string,
      dateTime?: string | null,
      title?: string | null,
      description?: string | null,
      link?: string | null,
      frequency?: ScheduleFrequencies | null,
      createdAt?: string | null,
      viewType?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDocumentQueryVariables = {
  id: string,
};

export type GetDocumentQuery = {
  getDocument?:  {
    __typename: "Document",
    id: string,
    relationID: string,
    ownerID: string,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    conclusion?: string | null,
    content?: string | null,
    fileKey?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    owner?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListDocumentsByRelationUpdatedAtQueryVariables = {
  relationID: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentsByRelationUpdatedAtQuery = {
  listDocumentsByRelationUpdatedAt?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      id: string,
      relationID: string,
      ownerID: string,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      conclusion?: string | null,
      content?: string | null,
      fileKey?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDocumentsByOwnerUpdatedAtQueryVariables = {
  ownerID: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentsByOwnerUpdatedAtQuery = {
  listDocumentsByOwnerUpdatedAt?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      id: string,
      relationID: string,
      ownerID: string,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      conclusion?: string | null,
      content?: string | null,
      fileKey?: string | null,
      identityId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRestrictedContentQueryVariables = {
  id: string,
};

export type GetRestrictedContentQuery = {
  getRestrictedContent?:  {
    __typename: "RestrictedContent",
    id: string,
    relationID: string,
    order: number,
    group?: string | null,
    subGroup?: string | null,
    title?: string | null,
    description?: string | null,
    notes?: string | null,
    type: RestrictedContentTypes,
    isAWSVDO?: boolean | null,
    thumbnail?: string | null,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    lifetime?: string | null,
    start?: string | null,
    expiration?: string | null,
    percentage?: number | null,
    video?:  {
      __typename: "VideoObject",
      id: string,
      token?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    view?:  {
      __typename: "ModelRestrictedContentViewConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRestrictedContentsByRelationOrderQueryVariables = {
  relationID: string,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestrictedContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestrictedContentsByRelationOrderQuery = {
  listRestrictedContentsByRelationOrder?:  {
    __typename: "ModelRestrictedContentConnection",
    items:  Array< {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRestrictedContentViewByRestrictedContentQueryVariables = {
  restrictedContentID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestrictedContentViewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestrictedContentViewByRestrictedContentQuery = {
  listRestrictedContentViewByRestrictedContent?:  {
    __typename: "ModelRestrictedContentViewConnection",
    items:  Array< {
      __typename: "RestrictedContentView",
      id: string,
      restrictedContentID: string,
      userID: string,
      percentage?: number | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRestrictedContentViewByRestrictedContentUserQueryVariables = {
  restrictedContentID: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestrictedContentViewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestrictedContentViewByRestrictedContentUserQuery = {
  listRestrictedContentViewByRestrictedContentUser?:  {
    __typename: "ModelRestrictedContentViewConnection",
    items:  Array< {
      __typename: "RestrictedContentView",
      id: string,
      restrictedContentID: string,
      userID: string,
      percentage?: number | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRestrictedContentViewByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestrictedContentViewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestrictedContentViewByUserQuery = {
  listRestrictedContentViewByUser?:  {
    __typename: "ModelRestrictedContentViewConnection",
    items:  Array< {
      __typename: "RestrictedContentView",
      id: string,
      restrictedContentID: string,
      userID: string,
      percentage?: number | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMenuQueryVariables = {
  id: string,
};

export type GetMenuQuery = {
  getMenu?:  {
    __typename: "Menu",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    orderDesc?: boolean | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    showDescriptionPage?: string | null,
    showThumbnailPage?: string | null,
    hide?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMenusQueryVariables = {
  id?: string | null,
  filter?: ModelMenuFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMenusQuery = {
  listMenus?:  {
    __typename: "ModelMenuConnection",
    items:  Array< {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMenusByAliasOrderQueryVariables = {
  alias: string,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMenuFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMenusByAliasOrderQuery = {
  listMenusByAliasOrder?:  {
    __typename: "ModelMenuConnection",
    items:  Array< {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPageQueryVariables = {
  id: string,
};

export type GetPageQuery = {
  getPage?:  {
    __typename: "Page",
    id: string,
    alias: string,
    status: PageStatus,
    type: PageType,
    menu: string,
    menuProps?:  {
      __typename: "Menu",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      orderDesc?: boolean | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      showDescriptionPage?: string | null,
      showThumbnailPage?: string | null,
      hide?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    order: number,
    title: string,
    titlePadX?: string | null,
    titlePadY?: string | null,
    description?: string | null,
    content?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    tags?: Array< string | null > | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    blocks?:  {
      __typename: "ModelBlockConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListPagesQueryVariables = {
  id?: string | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPagesQuery = {
  listPages?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPagesByAliasCreatedAtQueryVariables = {
  alias: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByAliasCreatedAtQuery = {
  listPagesByAliasCreatedAt?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPagesByStatusMenuOrderQueryVariables = {
  status: PageStatus,
  menuOrder?: ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByStatusMenuOrderQuery = {
  listPagesByStatusMenuOrder?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPagesByMenuOrderQueryVariables = {
  menu: string,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPagesByMenuOrderQuery = {
  listPagesByMenuOrder?:  {
    __typename: "ModelPageConnection",
    items:  Array< {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBlockQueryVariables = {
  id: string,
};

export type GetBlockQuery = {
  getBlock?:  {
    __typename: "Block",
    id: string,
    pageID: string,
    order: number,
    component: string,
    content: string,
    config?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBlocksQueryVariables = {
  id?: string | null,
  filter?: ModelBlockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBlocksQuery = {
  listBlocks?:  {
    __typename: "ModelBlockConnection",
    items:  Array< {
      __typename: "Block",
      id: string,
      pageID: string,
      order: number,
      component: string,
      content: string,
      config?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBlocksByPageQueryVariables = {
  pageID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBlockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBlocksByPageQuery = {
  listBlocksByPage?:  {
    __typename: "ModelBlockConnection",
    items:  Array< {
      __typename: "Block",
      id: string,
      pageID: string,
      order: number,
      component: string,
      content: string,
      config?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBlocksByPageOrderQueryVariables = {
  pageID: string,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBlockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBlocksByPageOrderQuery = {
  listBlocksByPageOrder?:  {
    __typename: "ModelBlockConnection",
    items:  Array< {
      __typename: "Block",
      id: string,
      pageID: string,
      order: number,
      component: string,
      content: string,
      config?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    alias: string,
    order: number,
    title?: string | null,
    description?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    hide?: boolean | null,
    isSub?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  id?: string | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCategoryByAliasOrderQueryVariables = {
  alias: string,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoryByAliasOrderQuery = {
  listCategoryByAliasOrder?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    alias: string,
    status: PageStatus,
    category: string,
    categoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    subCategory: string,
    subCategoryProps?:  {
      __typename: "Category",
      id: string,
      alias: string,
      order: number,
      title?: string | null,
      description?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      hide?: boolean | null,
      isSub?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    type?: string | null,
    relationID?: string | null,
    preparationTime?: number | null,
    code?: string | null,
    name: string,
    description?: string | null,
    contentTitle?: string | null,
    contentTitle2?: string | null,
    contentTitle3?: string | null,
    content?: string | null,
    content2?: string | null,
    content3?: string | null,
    tags?: Array< string | null > | null,
    changeFreq?: PageChangeFreq | null,
    priority?: PagePriority | null,
    price_of?: number | null,
    price: number,
    qty?: number | null,
    stockControl?: boolean | null,
    photo1?: string | null,
    photo2?: string | null,
    photo3?: string | null,
    photo4?: string | null,
    photo5?: string | null,
    thumbnail?: string | null,
    thumbnailSrc?: string | null,
    thumbnailCropper?: string | null,
    titlePadX?: string | null,
    titlePadY?: string | null,
    contentPadX?: string | null,
    contentPadY?: string | null,
    optionTitle?: PageOptionTitle | null,
    sideColumn?: PageSideColumn | null,
    sideColumnPadX?: string | null,
    sideColumnPadY?: string | null,
    sideColumnContent?: string | null,
    optionSideColumn?: PageOptionSideColumn | null,
    footerSm?: string | null,
    footerLg?: string | null,
    hideInMenu?: boolean | null,
    createdAt?: string | null,
    search?: string | null,
    hideInSearch?: boolean | null,
    options?:  {
      __typename: "ModelOptionConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  id?: string | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByAliasCreatedAtQueryVariables = {
  alias: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByAliasCreatedAtQuery = {
  listProductsByAliasCreatedAt?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByStatusCategoryNameQueryVariables = {
  status: PageStatus,
  categoryName?: ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByStatusCategoryNameQuery = {
  listProductsByStatusCategoryName?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByCategorySubCategoryNameQueryVariables = {
  category: string,
  subCategoryName?: ModelProductProductsByCategorySubCategoryNameCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByCategorySubCategoryNameQuery = {
  listProductsByCategorySubCategoryName?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOptionQueryVariables = {
  id: string,
};

export type GetOptionQuery = {
  getOption?:  {
    __typename: "Option",
    id: string,
    productID: string,
    name?: string | null,
    price?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOptionsQueryVariables = {
  id?: string | null,
  filter?: ModelOptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListOptionsQuery = {
  listOptions?:  {
    __typename: "ModelOptionConnection",
    items:  Array< {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOptionsByProductQueryVariables = {
  productID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOptionsByProductQuery = {
  listOptionsByProduct?:  {
    __typename: "ModelOptionConnection",
    items:  Array< {
      __typename: "Option",
      id: string,
      productID: string,
      name?: string | null,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCartsQueryVariables = {
  id?: string | null,
  filter?: ModelCartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCartsQuery = {
  listCarts?:  {
    __typename: "ModelCartConnection",
    items:  Array< {
      __typename: "Cart",
      id: string,
      userID: string,
      productID: string,
      qty?: number | null,
      changeName?: string | null,
      changeDescription?: string | null,
      changeQtyBlend?: number | null,
      changePriceAdjustment?: string | null,
      blendID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCartsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartsByUserQuery = {
  listCartsByUser?:  {
    __typename: "ModelCartConnection",
    items:  Array< {
      __typename: "Cart",
      id: string,
      userID: string,
      productID: string,
      qty?: number | null,
      changeName?: string | null,
      changeDescription?: string | null,
      changeQtyBlend?: number | null,
      changePriceAdjustment?: string | null,
      blendID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOptionsByCartQueryVariables = {
  cartID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartOptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOptionsByCartQuery = {
  listOptionsByCart?:  {
    __typename: "ModelCartOptionConnection",
    items:  Array< {
      __typename: "CartOption",
      id: string,
      cartID: string,
      optionID: string,
      createdAt: string,
      updatedAt: string,
      userID?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type ListOrdersQueryVariables = {
  id?: string | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersByUserStatusCreatedAtQueryVariables = {
  userID: string,
  statusCreatedAt?: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersByUserStatusCreatedAtQuery = {
  listOrdersByUserStatusCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersByUserCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersByUserCreatedAtQuery = {
  listOrdersByUserCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersByStatusCreatedAtQueryVariables = {
  status: OrderStatus,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersByStatusCreatedAtQuery = {
  listOrdersByStatusCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      userID: string,
      status: OrderStatus,
      createdAt?: string | null,
      couponID?: string | null,
      couponName?: string | null,
      couponDiscount?: number | null,
      deliveryPrice?: number | null,
      total?: number | null,
      rating?: number | null,
      ratingNotes?: string | null,
      orderPagarmeID?: string | null,
      addressReference?: string | null,
      addressStreet?: string | null,
      addressNumber?: string | null,
      addressComplement?: string | null,
      addressZipcode?: string | null,
      addressNeighborhood?: string | null,
      addressCity?: string | null,
      addressState?: string | null,
      addressCountry?: string | null,
      notes?: string | null,
      qrCodePix?: string | null,
      qrCodePixUrl?: string | null,
      payMethod?: PaymentMethods | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsByOrderQueryVariables = {
  orderID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsByOrderQuery = {
  listItemsByOrder?:  {
    __typename: "ModelOrderItemConnection",
    items:  Array< {
      __typename: "OrderItem",
      id: string,
      orderID: string,
      productID: string,
      qty: number,
      code?: string | null,
      name: string,
      description?: string | null,
      price: number,
      photo1?: string | null,
      changeName?: string | null,
      changeDescription?: string | null,
      changeQtyBlend?: number | null,
      changePriceAdjustment?: string | null,
      blendID?: string | null,
      changeNameAdmin?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOptionsByOrderItemQueryVariables = {
  orderItemID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderItemOptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOptionsByOrderItemQuery = {
  listOptionsByOrderItem?:  {
    __typename: "ModelOrderItemOptionConnection",
    items:  Array< {
      __typename: "OrderItemOption",
      id: string,
      orderItemID: string,
      optionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCouponQueryVariables = {
  id: string,
};

export type GetCouponQuery = {
  getCoupon?:  {
    __typename: "Coupon",
    id: string,
    name: string,
    description?: string | null,
    code: string,
    start?: string | null,
    expiration?: string | null,
    discountPercentage?: number | null,
    discountValue?: number | null,
    qtyLimit?: number | null,
    qtyUsed?: number | null,
    qtyProduct?: number | null,
    qtyProductUsed?: number | null,
    search?: string | null,
    products?:  {
      __typename: "ModelCouponProductConnection",
      nextToken?: string | null,
    } | null,
    couponUsed?:  {
      __typename: "ModelCouponUsedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCouponsQueryVariables = {
  id?: string | null,
  filter?: ModelCouponFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCouponsQuery = {
  listCoupons?:  {
    __typename: "ModelCouponConnection",
    items:  Array< {
      __typename: "Coupon",
      id: string,
      name: string,
      description?: string | null,
      code: string,
      start?: string | null,
      expiration?: string | null,
      discountPercentage?: number | null,
      discountValue?: number | null,
      qtyLimit?: number | null,
      qtyUsed?: number | null,
      qtyProduct?: number | null,
      qtyProductUsed?: number | null,
      search?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCouponsByCodeQueryVariables = {
  code: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCouponsByCodeQuery = {
  listCouponsByCode?:  {
    __typename: "ModelCouponConnection",
    items:  Array< {
      __typename: "Coupon",
      id: string,
      name: string,
      description?: string | null,
      code: string,
      start?: string | null,
      expiration?: string | null,
      discountPercentage?: number | null,
      discountValue?: number | null,
      qtyLimit?: number | null,
      qtyUsed?: number | null,
      qtyProduct?: number | null,
      qtyProductUsed?: number | null,
      search?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsByCouponQueryVariables = {
  couponID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByCouponQuery = {
  listProductsByCoupon?:  {
    __typename: "ModelCouponProductConnection",
    items:  Array< {
      __typename: "CouponProduct",
      id: string,
      couponID: string,
      productID: string,
      price?: number | null,
      limit?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsedByCouponQueryVariables = {
  couponID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponUsedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsedByCouponQuery = {
  listUsedByCoupon?:  {
    __typename: "ModelCouponUsedConnection",
    items:  Array< {
      __typename: "CouponUsed",
      id: string,
      couponID: string,
      userID: string,
      qty?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsedByCouponUserQueryVariables = {
  couponID: string,
  userID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCouponUsedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsedByCouponUserQuery = {
  listUsedByCouponUser?:  {
    __typename: "ModelCouponUsedConnection",
    items:  Array< {
      __typename: "CouponUsed",
      id: string,
      couponID: string,
      userID: string,
      qty?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryOrdersQueryVariables = {
  id?: string | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDeliveryOrdersQuery = {
  listDeliveryOrders?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByOrderQueryVariables = {
  orderID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByOrderQuery = {
  listDeliveryByOrder?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByDateUserQueryVariables = {
  date: string,
  deliveryUserID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByDateUserQuery = {
  listDeliveryByDateUser?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByUserDateQueryVariables = {
  deliveryUserID: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByUserDateQuery = {
  listDeliveryByUserDate?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryByStatusDateQueryVariables = {
  status: DeliveryStatus,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeliveryOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryByStatusDateQuery = {
  listDeliveryByStatusDate?:  {
    __typename: "ModelDeliveryOrderConnection",
    items:  Array< {
      __typename: "DeliveryOrder",
      id: string,
      orderID: string,
      date: string,
      deliveryUserID: string,
      status: DeliveryStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDeliveryMethodOrdersQueryVariables = {
  id?: string | null,
  filter?: ModelDeliveryMethodOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDeliveryMethodOrdersQuery = {
  listDeliveryMethodOrders?:  {
    __typename: "ModelDeliveryMethodOrderConnection",
    items:  Array< {
      __typename: "DeliveryMethodOrder",
      id: string,
      name?: string | null,
      zipCode?: Array< string | null > | null,
      price?: number | null,
      time?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQrCodeScansByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQrCodeScanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQrCodeScansByUserQuery = {
  listQrCodeScansByUser?:  {
    __typename: "ModelQrCodeScanConnection",
    items:  Array< {
      __typename: "QrCodeScan",
      id: string,
      userID: string,
      relationID: string,
      uuid?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuizQueryVariables = {
  id?: string | null,
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuizQuery = {
  listQuiz?:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      id: string,
      name: string,
      description?: string | null,
      search?: string | null,
      status: QuizStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuizByStatusQueryVariables = {
  status: QuizStatus,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizByStatusQuery = {
  listQuizByStatus?:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      id: string,
      name: string,
      description?: string | null,
      search?: string | null,
      status: QuizStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuestionsByQuizQueryVariables = {
  quizID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuizQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsByQuizQuery = {
  listQuestionsByQuiz?:  {
    __typename: "ModelQuizQuestionConnection",
    items:  Array< {
      __typename: "QuizQuestion",
      id: string,
      quizID: string,
      question: string,
      image?: string | null,
      alternativeA: string,
      alternativeB: string,
      alternativeC?: string | null,
      alternativeD?: string | null,
      alternativeE?: string | null,
      alternativeCorrect: string,
      order?: number | null,
      search?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnDeleteRelationLinkSubscriptionVariables = {
  userID?: string | null,
};

export type OnDeleteRelationLinkSubscription = {
  onDeleteRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type OnCreateRelationLinkSubscriptionVariables = {
  userID?: string | null,
};

export type OnCreateRelationLinkSubscription = {
  onCreateRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type OnUpdateRelationLinkSubscriptionVariables = {
  userID?: string | null,
};

export type OnUpdateRelationLinkSubscription = {
  onUpdateRelationLink?:  {
    __typename: "RelationLink",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    relationID: string,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    type: string,
    notify: number,
    updatedAt?: string | null,
    search?: string | null,
    percentage?: number | null,
    createdAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  relationID?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    restrictedContentID?: string | null,
    restrictedContent?:  {
      __typename: "RestrictedContent",
      id: string,
      relationID: string,
      order: number,
      group?: string | null,
      subGroup?: string | null,
      title?: string | null,
      description?: string | null,
      notes?: string | null,
      type: RestrictedContentTypes,
      isAWSVDO?: boolean | null,
      thumbnail?: string | null,
      content?: string | null,
      search?: string | null,
      identityId?: string | null,
      lifetime?: string | null,
      start?: string | null,
      expiration?: string | null,
      percentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: MessagesTypes,
    content?: string | null,
    search?: string | null,
    identityId?: string | null,
    createdAt?: string | null,
    status?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateOrderAdmSubscription = {
  onCreateOrderAdm?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type OnCreateLogSubscription = {
  onCreateLog?:  {
    __typename: "Log",
    id: string,
    userID: string,
    tag: string,
    source: LogSource,
    notes?: string | null,
    message?: string | null,
    page?: string | null,
    manufacturer?: string | null,
    model?: string | null,
    osName?: string | null,
    osVersion?: string | null,
    platform?: string | null,
    uuid?: string | null,
    ip?: string | null,
    city?: string | null,
    region?: string | null,
    country?: string | null,
    provider?: string | null,
    lat?: number | null,
    lng?: number | null,
    createdAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFavoriteSubscriptionVariables = {
  userID?: string | null,
};

export type OnDeleteFavoriteSubscription = {
  onDeleteFavorite?:  {
    __typename: "Favorite",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: string,
    favoriteID: string,
    link: string,
    content?: string | null,
    productID?: string | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    pageID?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFavoriteSubscriptionVariables = {
  userID?: string | null,
};

export type OnCreateFavoriteSubscription = {
  onCreateFavorite?:  {
    __typename: "Favorite",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    type: string,
    favoriteID: string,
    link: string,
    content?: string | null,
    productID?: string | null,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    relationID?: string | null,
    relation?:  {
      __typename: "Relation",
      id: string,
      type: string,
      mode: RelationModes,
      name?: string | null,
      description?: string | null,
      avatar?: string | null,
      reference?: string | null,
      members: Array< string >,
      admins: Array< string >,
      updatedAt?: string | null,
      status: string,
      search?: string | null,
      config?: string | null,
      createdAt: string,
    } | null,
    pageID?: string | null,
    page?:  {
      __typename: "Page",
      id: string,
      alias: string,
      status: PageStatus,
      type: PageType,
      menu: string,
      order: number,
      title: string,
      titlePadX?: string | null,
      titlePadY?: string | null,
      description?: string | null,
      content?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      tags?: Array< string | null > | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQrCodeScanSubscriptionVariables = {
  userID?: string | null,
};

export type OnCreateQrCodeScanSubscription = {
  onCreateQrCodeScan?:  {
    __typename: "QrCodeScan",
    id: string,
    userID: string,
    relationID: string,
    uuid?: string | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateVideoObjectSubscriptionVariables = {
  filter?: ModelSubscriptionVideoObjectFilterInput | null,
};

export type OnCreateVideoObjectSubscription = {
  onCreateVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVideoObjectSubscriptionVariables = {
  filter?: ModelSubscriptionVideoObjectFilterInput | null,
};

export type OnUpdateVideoObjectSubscription = {
  onUpdateVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVideoObjectSubscriptionVariables = {
  filter?: ModelSubscriptionVideoObjectFilterInput | null,
};

export type OnDeleteVideoObjectSubscription = {
  onDeleteVideoObject?:  {
    __typename: "VideoObject",
    id: string,
    token?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCartSubscriptionVariables = {
  filter?: ModelSubscriptionCartFilterInput | null,
  userID?: string | null,
};

export type OnCreateCartSubscription = {
  onCreateCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCartSubscriptionVariables = {
  filter?: ModelSubscriptionCartFilterInput | null,
  userID?: string | null,
};

export type OnUpdateCartSubscription = {
  onUpdateCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCartSubscriptionVariables = {
  filter?: ModelSubscriptionCartFilterInput | null,
  userID?: string | null,
};

export type OnDeleteCartSubscription = {
  onDeleteCart?:  {
    __typename: "Cart",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      alias: string,
      status: PageStatus,
      category: string,
      subCategory: string,
      type?: string | null,
      relationID?: string | null,
      preparationTime?: number | null,
      code?: string | null,
      name: string,
      description?: string | null,
      contentTitle?: string | null,
      contentTitle2?: string | null,
      contentTitle3?: string | null,
      content?: string | null,
      content2?: string | null,
      content3?: string | null,
      tags?: Array< string | null > | null,
      changeFreq?: PageChangeFreq | null,
      priority?: PagePriority | null,
      price_of?: number | null,
      price: number,
      qty?: number | null,
      stockControl?: boolean | null,
      photo1?: string | null,
      photo2?: string | null,
      photo3?: string | null,
      photo4?: string | null,
      photo5?: string | null,
      thumbnail?: string | null,
      thumbnailSrc?: string | null,
      thumbnailCropper?: string | null,
      titlePadX?: string | null,
      titlePadY?: string | null,
      contentPadX?: string | null,
      contentPadY?: string | null,
      optionTitle?: PageOptionTitle | null,
      sideColumn?: PageSideColumn | null,
      sideColumnPadX?: string | null,
      sideColumnPadY?: string | null,
      sideColumnContent?: string | null,
      optionSideColumn?: PageOptionSideColumn | null,
      footerSm?: string | null,
      footerLg?: string | null,
      hideInMenu?: boolean | null,
      createdAt?: string | null,
      search?: string | null,
      hideInSearch?: boolean | null,
      updatedAt: string,
    } | null,
    options?:  {
      __typename: "ModelCartOptionConnection",
      nextToken?: string | null,
    } | null,
    qty?: number | null,
    changeName?: string | null,
    changeDescription?: string | null,
    changeQtyBlend?: number | null,
    changePriceAdjustment?: string | null,
    blendID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  userID?: string | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  userID?: string | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  userID?: string | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      phone?: string | null,
      status?: UserStatus | null,
      active?: boolean | null,
      avatar?: string | null,
      search?: string | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null,
    status: OrderStatus,
    createdAt?: string | null,
    items?:  {
      __typename: "ModelOrderItemConnection",
      nextToken?: string | null,
    } | null,
    couponID?: string | null,
    couponName?: string | null,
    couponDiscount?: number | null,
    deliveryPrice?: number | null,
    total?: number | null,
    rating?: number | null,
    ratingNotes?: string | null,
    orderPagarmeID?: string | null,
    addressReference?: string | null,
    addressStreet?: string | null,
    addressNumber?: string | null,
    addressComplement?: string | null,
    addressZipcode?: string | null,
    addressNeighborhood?: string | null,
    addressCity?: string | null,
    addressState?: string | null,
    addressCountry?: string | null,
    notes?: string | null,
    qrCodePix?: string | null,
    qrCodePixUrl?: string | null,
    payMethod?: PaymentMethods | null,
    updatedAt: string,
  } | null,
};

export type OnCreateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnCreateQuizSubscription = {
  onCreateQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnUpdateQuizSubscription = {
  onUpdateQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuizSubscriptionVariables = {
  filter?: ModelSubscriptionQuizFilterInput | null,
};

export type OnDeleteQuizSubscription = {
  onDeleteQuiz?:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description?: string | null,
    search?: string | null,
    questions?:  {
      __typename: "ModelQuizQuestionConnection",
      nextToken?: string | null,
    } | null,
    status: QuizStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};
