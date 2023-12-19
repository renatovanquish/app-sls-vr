import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum RelationTypes {
  CONTACT = "CONTACT",
  DOCUMENT = "DOCUMENT"
}

export enum RelationModes {
  PRIVATE = "PRIVATE",
  GROUP = "GROUP"
}

export enum RelationStatus {
  STANDBY = "STANDBY",
  ABORTED = "ABORTED",
  STARTED = "STARTED",
  FINALIZED = "FINALIZED",
  INPROGRESS = "INPROGRESS",
  INANALYZE = "INANALYZE",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED"
}

export enum MessagesTypes {
  ALERT = "ALERT",
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  LOCATION = "LOCATION"
}

export enum UserStatus {
  DEFAULT = "DEFAULT",
  PREREGISTER = "PREREGISTER",
  SUSPENDED = "SUSPENDED",
  ACTIVE = "ACTIVE"
}

export enum GenderOptions {
  M = "M",
  F = "F",
  UNKNOWN = "UNKNOWN"
}

export enum LogSource {
  APP = "APP"
}

export enum PageStatus {
  ON = "ON",
  OFF = "OFF"
}

export enum PageChangeFreq {
  NEVER = "NEVER",
  YEARLY = "YEARLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
  HOURLY = "HOURLY",
  ALWAYS = "ALWAYS"
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
  P10 = "P10"
}

export enum PageOptionTitle {
  L = "L",
  R = "R",
  C = "C",
  N = "N"
}

export enum PageSideColumn {
  L = "L",
  R = "R",
  N = "N"
}

export enum PageOptionSideColumn {
  MENU_CONTENT_TAGS = "MENU_CONTENT_TAGS",
  MENU_CONTENT = "MENU_CONTENT",
  TAGS_CONTENT = "TAGS_CONTENT",
  CONTENT_MENU_TAGS = "CONTENT_MENU_TAGS",
  CONTENT_MENU = "CONTENT_MENU",
  CONTENT_TAGS = "CONTENT_TAGS"
}

export enum LogTags {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  ACTIVATED = "ACTIVATED",
  USER_CHANGED = "USER_CHANGED",
  PROFILE_CHANGED = "PROFILE_CHANGED",
  ADRESSES_CHANGED = "ADRESSES_CHANGED",
  ADDRESS_CREATED = "ADDRESS_CREATED",
  ADDRESS_DELETED = "ADDRESS_DELETED",
  PAYMENT_METHOD_CHANGED = "PAYMENT_METHOD_CHANGED",
  PAYMENT_METHOD_CREATED = "PAYMENT_METHOD_CREATED",
  PAYMENT_METHOD_DELETED = "PAYMENT_METHOD_DELETED",
  ACCESSED = "ACCESSED",
  ACCESSED_ADM = "ACCESSED_ADM",
  RESERCHED = "RESERCHED",
  PREREGISTER = "PREREGISTER",
  CONTACT_CREATE = "CONTACT_CREATE",
  CONTACT_UPDATE = "CONTACT_UPDATE",
  CONTACT_DELETE = "CONTACT_DELETE",
  CONTACT_READ = "CONTACT_READ",
  CONTACT_SHARE = "CONTACT_SHARE",
  MESSAGE_CREATE = "MESSAGE_CREATE",
  MESSAGE_DELETE = "MESSAGE_DELETE",
  MESSAGE_READ = "MESSAGE_READ",
  DOCUMENT_CREATE = "DOCUMENT_CREATE",
  DOCUMENT_UPDATE = "DOCUMENT_UPDATE",
  DOCUMENT_DELETE = "DOCUMENT_DELETE",
  DOCUMENT_READ = "DOCUMENT_READ",
  DOCUMENT_SHARE = "DOCUMENT_SHARE"
}

export enum ConfigValidationModes {
  CODE = "CODE",
  LINK = "LINK"
}

export enum InviteStatus {
  SENT = "SENT",
  CANCELED = "CANCELED",
  ACCEPTED = "ACCEPTED"
}

export enum MidiaTypes {
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  PDF = "PDF",
  DOC = "DOC",
  XLS = "XLS",
  FILE = "FILE",
  ZIP = "ZIP"
}

export enum PageType {
  CONTENT = "CONTENT",
  COMMERCE = "COMMERCE"
}



type RelationLinkMetaData = {
  readOnlyFields: 'createdAt';
}

type RelationMetaData = {
  readOnlyFields: 'createdAt';
}

type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'updatedAt';
}

type ProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LogMetaData = {
  readOnlyFields: 'updatedAt';
}

type AddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PayMethodMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'updatedAt';
}

type OptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartOptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'updatedAt';
}

type OrderOptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DocumentMetaData = {
  readOnlyFields;
}

type ConfigMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InviteMetaData = {
  readOnlyFields: 'updatedAt';
}

type FolderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MidiaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MenuMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PageMetaData = {
  readOnlyFields: 'updatedAt';
}

type BlockMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type deliveryMethodMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class RelationLink {
  readonly id: string;
  readonly userID: string;
  readonly relationID: string;
  readonly updatedAt?: string;
  readonly relation?: Relation;
  readonly createdAt?: string;
  constructor(init: ModelInit<RelationLink, RelationLinkMetaData>);
  static copyOf(source: RelationLink, mutator: (draft: MutableModel<RelationLink, RelationLinkMetaData>) => MutableModel<RelationLink, RelationLinkMetaData> | void): RelationLink;
}

export declare class Relation {
  readonly id: string;
  readonly type: RelationTypes | keyof typeof RelationTypes;
  readonly mode: RelationModes | keyof typeof RelationModes;
  readonly name?: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly reference?: string;
  readonly members: string[];
  readonly admins: string[];
  readonly updatedAt?: string;
  readonly status: RelationStatus | keyof typeof RelationStatus;
  readonly search?: string;
  readonly relationsLink?: (RelationLink | null)[];
  readonly messages?: (Message | null)[];
  readonly documents?: (Document | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<Relation, RelationMetaData>);
  static copyOf(source: Relation, mutator: (draft: MutableModel<Relation, RelationMetaData>) => MutableModel<Relation, RelationMetaData> | void): Relation;
}

export declare class Message {
  readonly id: string;
  readonly relationID: string;
  readonly userID: string;
  readonly type: MessagesTypes | keyof typeof MessagesTypes;
  readonly content?: string;
  readonly fileKey?: string;
  readonly isSent?: boolean;
  readonly isViewed?: boolean;
  readonly createdAt?: string;
  readonly user?: User;
  readonly relation?: Relation;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly status?: UserStatus | keyof typeof UserStatus;
  readonly active?: boolean;
  readonly avatar?: string;
  readonly search?: string;
  readonly createdAt?: string;
  readonly profile?: Profile;
  readonly logs?: (Log | null)[];
  readonly addresses?: (Address | null)[];
  readonly payMethods?: (PayMethod | null)[];
  readonly relationsLink?: (RelationLink | null)[];
  readonly carts?: (Cart | null)[];
  readonly ordersByCreatedAt?: (Order | null)[];
  readonly ordersByStatusCreatedAt?: (Order | null)[];
  readonly updatedAt?: string;
  readonly userProfileId?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Profile {
  readonly id: string;
  readonly userID: string;
  readonly doc?: string;
  readonly specialties?: string;
  readonly subSpecialties?: string;
  readonly profession?: string;
  readonly bio?: string;
  readonly gender?: GenderOptions | keyof typeof GenderOptions;
  readonly birth?: string;
  readonly notes?: string;
  readonly urlUserName?: string;
  readonly urlEnable?: boolean;
  readonly allowViewEmail?: boolean;
  readonly allowViewPhone?: boolean;
  readonly allowCookiesPreference?: boolean;
  readonly allowCookiesStatistic?: boolean;
  readonly pix?: string;
  readonly zipCodeCoverage?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Profile, ProfileMetaData>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

export declare class Log {
  readonly id: string;
  readonly userID: string;
  readonly tag: string;
  readonly source: LogSource | keyof typeof LogSource;
  readonly notes?: string;
  readonly message?: string;
  readonly page?: string;
  readonly manufacturer?: string;
  readonly model?: string;
  readonly osName?: string;
  readonly osVersion?: string;
  readonly platform?: string;
  readonly uuid?: string;
  readonly ip?: string;
  readonly city?: string;
  readonly region?: string;
  readonly country?: string;
  readonly provider?: string;
  readonly lat?: number;
  readonly lng?: number;
  readonly createdAt?: string;
  readonly user?: User;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Log, LogMetaData>);
  static copyOf(source: Log, mutator: (draft: MutableModel<Log, LogMetaData>) => MutableModel<Log, LogMetaData> | void): Log;
}

export declare class Address {
  readonly id: string;
  readonly userID: string;
  readonly name?: string;
  readonly reference?: string;
  readonly street?: string;
  readonly number?: string;
  readonly complement?: string;
  readonly zipcode?: string;
  readonly neighborhood?: string;
  readonly city?: string;
  readonly state?: string;
  readonly country?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Address, AddressMetaData>);
  static copyOf(source: Address, mutator: (draft: MutableModel<Address, AddressMetaData>) => MutableModel<Address, AddressMetaData> | void): Address;
}

export declare class PayMethod {
  readonly id: string;
  readonly userID: string;
  readonly name?: string;
  readonly number?: string;
  readonly expires?: string;
  readonly cvc?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PayMethod, PayMethodMetaData>);
  static copyOf(source: PayMethod, mutator: (draft: MutableModel<PayMethod, PayMethodMetaData>) => MutableModel<PayMethod, PayMethodMetaData> | void): PayMethod;
}

export declare class Cart {
  readonly id: string;
  readonly userID: string;
  readonly productID: string;
  readonly product?: Product;
  readonly options?: (CartOption | null)[];
  readonly qty?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Cart, CartMetaData>);
  static copyOf(source: Cart, mutator: (draft: MutableModel<Cart, CartMetaData>) => MutableModel<Cart, CartMetaData> | void): Cart;
}

export declare class Product {
  readonly id: string;
  readonly alias: string;
  readonly status: PageStatus | keyof typeof PageStatus;
  readonly category: string;
  readonly code?: string;
  readonly name: string;
  readonly description?: string;
  readonly content?: string;
  readonly tags?: (string | null)[];
  readonly changeFreq?: PageChangeFreq | keyof typeof PageChangeFreq;
  readonly priority?: PagePriority | keyof typeof PagePriority;
  readonly price_of?: number;
  readonly price: number;
  readonly qty?: number;
  readonly photo1?: string;
  readonly photo2?: string;
  readonly photo3?: string;
  readonly photo4?: string;
  readonly photo5?: string;
  readonly thumbnail?: string;
  readonly thumbnailSrc?: string;
  readonly thumbnailCropper?: string;
  readonly titlePadX?: string;
  readonly titlePadY?: string;
  readonly contentPadX?: string;
  readonly contentPadY?: string;
  readonly optionTitle?: PageOptionTitle | keyof typeof PageOptionTitle;
  readonly sideColumn?: PageSideColumn | keyof typeof PageSideColumn;
  readonly sideColumnPadX?: string;
  readonly sideColumnPadY?: string;
  readonly sideColumnContent?: string;
  readonly optionSideColumn?: PageOptionSideColumn | keyof typeof PageOptionSideColumn;
  readonly hideFooter?: boolean;
  readonly hideInMenu?: boolean;
  readonly createdAt?: string;
  readonly search?: string;
  readonly options?: (Option | null)[];
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class Option {
  readonly id: string;
  readonly productID: string;
  readonly name?: string;
  readonly price?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Option, OptionMetaData>);
  static copyOf(source: Option, mutator: (draft: MutableModel<Option, OptionMetaData>) => MutableModel<Option, OptionMetaData> | void): Option;
}

export declare class CartOption {
  readonly id: string;
  readonly cartID: string;
  readonly optionID: string;
  readonly option?: Option;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CartOption, CartOptionMetaData>);
  static copyOf(source: CartOption, mutator: (draft: MutableModel<CartOption, CartOptionMetaData>) => MutableModel<CartOption, CartOptionMetaData> | void): CartOption;
}

export declare class Order {
  readonly id: string;
  readonly userID: string;
  readonly status: string;
  readonly createdAt?: string;
  readonly productID: string;
  readonly product?: Product;
  readonly options?: (OrderOption | null)[];
  readonly qty: number;
  readonly code?: string;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly photo1?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class OrderOption {
  readonly id: string;
  readonly orderID: string;
  readonly optionID: string;
  readonly option?: Option;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OrderOption, OrderOptionMetaData>);
  static copyOf(source: OrderOption, mutator: (draft: MutableModel<OrderOption, OrderOptionMetaData>) => MutableModel<OrderOption, OrderOptionMetaData> | void): OrderOption;
}

export declare class Document {
  readonly id: string;
  readonly relationID: string;
  readonly ownerID: string;
  readonly title?: string;
  readonly description?: string;
  readonly notes?: string;
  readonly conclusion?: string;
  readonly content?: string;
  readonly fileKey?: string;
  readonly identityId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly relation?: Relation;
  readonly owner?: User;
  constructor(init: ModelInit<Document>);
  static copyOf(source: Document, mutator: (draft: MutableModel<Document>) => MutableModel<Document> | void): Document;
}

export declare class Config {
  readonly id: string;
  readonly validationMode: ConfigValidationModes | keyof typeof ConfigValidationModes;
  readonly googleAnalyticsID?: string;
  readonly googleSiteVerification?: string;
  readonly inviteSubject?: string;
  readonly inviteMessage?: string;
  readonly inviteSMS?: string;
  readonly facebook?: string;
  readonly twitter?: string;
  readonly instagram?: string;
  readonly infoFooter?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Config, ConfigMetaData>);
  static copyOf(source: Config, mutator: (draft: MutableModel<Config, ConfigMetaData>) => MutableModel<Config, ConfigMetaData> | void): Config;
}

export declare class Invite {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly groups?: (string | null)[];
  readonly status: InviteStatus | keyof typeof InviteStatus;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Invite, InviteMetaData>);
  static copyOf(source: Invite, mutator: (draft: MutableModel<Invite, InviteMetaData>) => MutableModel<Invite, InviteMetaData> | void): Invite;
}

export declare class Folder {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Folder, FolderMetaData>);
  static copyOf(source: Folder, mutator: (draft: MutableModel<Folder, FolderMetaData>) => MutableModel<Folder, FolderMetaData> | void): Folder;
}

export declare class Midia {
  readonly id: string;
  readonly key: string;
  readonly type?: MidiaTypes | keyof typeof MidiaTypes;
  readonly title?: string;
  readonly subTitle?: string;
  readonly description?: string;
  readonly identifyText?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Midia, MidiaMetaData>);
  static copyOf(source: Midia, mutator: (draft: MutableModel<Midia, MidiaMetaData>) => MutableModel<Midia, MidiaMetaData> | void): Midia;
}

export declare class Menu {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly orderDesc?: boolean;
  readonly thumbnail?: string;
  readonly thumbnailSrc?: string;
  readonly thumbnailCropper?: string;
  readonly showDescriptionPage?: string;
  readonly showThumbnailPage?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Menu, MenuMetaData>);
  static copyOf(source: Menu, mutator: (draft: MutableModel<Menu, MenuMetaData>) => MutableModel<Menu, MenuMetaData> | void): Menu;
}

export declare class Page {
  readonly id: string;
  readonly alias: string;
  readonly status: PageStatus | keyof typeof PageStatus;
  readonly type: PageType | keyof typeof PageType;
  readonly menu: string;
  readonly order: number;
  readonly title: string;
  readonly titlePadX?: string;
  readonly titlePadY?: string;
  readonly description?: string;
  readonly content?: string;
  readonly contentPadX?: string;
  readonly contentPadY?: string;
  readonly tags?: (string | null)[];
  readonly thumbnail?: string;
  readonly thumbnailSrc?: string;
  readonly thumbnailCropper?: string;
  readonly changeFreq?: PageChangeFreq | keyof typeof PageChangeFreq;
  readonly priority?: PagePriority | keyof typeof PagePriority;
  readonly optionTitle?: PageOptionTitle | keyof typeof PageOptionTitle;
  readonly sideColumn?: PageSideColumn | keyof typeof PageSideColumn;
  readonly sideColumnPadX?: string;
  readonly sideColumnPadY?: string;
  readonly sideColumnContent?: string;
  readonly optionSideColumn?: PageOptionSideColumn | keyof typeof PageOptionSideColumn;
  readonly hideFooter?: boolean;
  readonly hideInMenu?: boolean;
  readonly createdAt?: string;
  readonly search?: string;
  readonly blocks?: (Block | null)[];
  readonly updatedAt?: string;
  constructor(init: ModelInit<Page, PageMetaData>);
  static copyOf(source: Page, mutator: (draft: MutableModel<Page, PageMetaData>) => MutableModel<Page, PageMetaData> | void): Page;
}

export declare class Block {
  readonly id: string;
  readonly pageID: string;
  readonly order: number;
  readonly component: string;
  readonly content: string;
  readonly config?: string;
  readonly page?: Page;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Block, BlockMetaData>);
  static copyOf(source: Block, mutator: (draft: MutableModel<Block, BlockMetaData>) => MutableModel<Block, BlockMetaData> | void): Block;
}

export declare class Category {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly thumbnail?: string;
  readonly thumbnailSrc?: string;
  readonly thumbnailCropper?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class deliveryMethod {
  readonly id: string;
  readonly name?: string;
  readonly zipCode?: string;
  readonly price?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<deliveryMethod, deliveryMethodMetaData>);
  static copyOf(source: deliveryMethod, mutator: (draft: MutableModel<deliveryMethod, deliveryMethodMetaData>) => MutableModel<deliveryMethod, deliveryMethodMetaData> | void): deliveryMethod;
}