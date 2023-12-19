// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RelationTypes = {
  "CONTACT": "CONTACT",
  "DOCUMENT": "DOCUMENT"
};

const RelationModes = {
  "PRIVATE": "PRIVATE",
  "GROUP": "GROUP"
};

const RelationStatus = {
  "STANDBY": "STANDBY",
  "ABORTED": "ABORTED",
  "STARTED": "STARTED",
  "FINALIZED": "FINALIZED",
  "INPROGRESS": "INPROGRESS",
  "INANALYZE": "INANALYZE",
  "ACTIVE": "ACTIVE",
  "ARCHIVED": "ARCHIVED"
};

const MessagesTypes = {
  "ALERT": "ALERT",
  "TEXT": "TEXT",
  "AUDIO": "AUDIO",
  "VIDEO": "VIDEO",
  "IMAGE": "IMAGE",
  "LOCATION": "LOCATION"
};

const UserStatus = {
  "DEFAULT": "DEFAULT",
  "PREREGISTER": "PREREGISTER",
  "SUSPENDED": "SUSPENDED",
  "ACTIVE": "ACTIVE"
};

const GenderOptions = {
  "M": "M",
  "F": "F",
  "UNKNOWN": "UNKNOWN"
};

const LogSource = {
  "APP": "APP"
};

const PageStatus = {
  "ON": "ON",
  "OFF": "OFF"
};

const PageChangeFreq = {
  "NEVER": "NEVER",
  "YEARLY": "YEARLY",
  "MONTHLY": "MONTHLY",
  "WEEKLY": "WEEKLY",
  "DAILY": "DAILY",
  "HOURLY": "HOURLY",
  "ALWAYS": "ALWAYS"
};

const PagePriority = {
  "P0": "P0",
  "P1": "P1",
  "P2": "P2",
  "P3": "P3",
  "P4": "P4",
  "P5": "P5",
  "P6": "P6",
  "P7": "P7",
  "P8": "P8",
  "P9": "P9",
  "P10": "P10"
};

const PageOptionTitle = {
  "L": "L",
  "R": "R",
  "C": "C",
  "N": "N"
};

const PageSideColumn = {
  "L": "L",
  "R": "R",
  "N": "N"
};

const PageOptionSideColumn = {
  "MENU_CONTENT_TAGS": "MENU_CONTENT_TAGS",
  "MENU_CONTENT": "MENU_CONTENT",
  "TAGS_CONTENT": "TAGS_CONTENT",
  "CONTENT_MENU_TAGS": "CONTENT_MENU_TAGS",
  "CONTENT_MENU": "CONTENT_MENU",
  "CONTENT_TAGS": "CONTENT_TAGS"
};

const LogTags = {
  "CONNECTED": "CONNECTED",
  "DISCONNECTED": "DISCONNECTED",
  "CHANGE_PASSWORD": "CHANGE_PASSWORD",
  "ACTIVATED": "ACTIVATED",
  "USER_CHANGED": "USER_CHANGED",
  "PROFILE_CHANGED": "PROFILE_CHANGED",
  "ADRESSES_CHANGED": "ADRESSES_CHANGED",
  "ADDRESS_CREATED": "ADDRESS_CREATED",
  "ADDRESS_DELETED": "ADDRESS_DELETED",
  "PAYMENT_METHOD_CHANGED": "PAYMENT_METHOD_CHANGED",
  "PAYMENT_METHOD_CREATED": "PAYMENT_METHOD_CREATED",
  "PAYMENT_METHOD_DELETED": "PAYMENT_METHOD_DELETED",
  "ACCESSED": "ACCESSED",
  "ACCESSED_ADM": "ACCESSED_ADM",
  "RESERCHED": "RESERCHED",
  "PREREGISTER": "PREREGISTER",
  "CONTACT_CREATE": "CONTACT_CREATE",
  "CONTACT_UPDATE": "CONTACT_UPDATE",
  "CONTACT_DELETE": "CONTACT_DELETE",
  "CONTACT_READ": "CONTACT_READ",
  "CONTACT_SHARE": "CONTACT_SHARE",
  "MESSAGE_CREATE": "MESSAGE_CREATE",
  "MESSAGE_DELETE": "MESSAGE_DELETE",
  "MESSAGE_READ": "MESSAGE_READ",
  "DOCUMENT_CREATE": "DOCUMENT_CREATE",
  "DOCUMENT_UPDATE": "DOCUMENT_UPDATE",
  "DOCUMENT_DELETE": "DOCUMENT_DELETE",
  "DOCUMENT_READ": "DOCUMENT_READ",
  "DOCUMENT_SHARE": "DOCUMENT_SHARE"
};

const ConfigValidationModes = {
  "CODE": "CODE",
  "LINK": "LINK"
};

const InviteStatus = {
  "SENT": "SENT",
  "CANCELED": "CANCELED",
  "ACCEPTED": "ACCEPTED"
};

const MidiaTypes = {
  "AUDIO": "AUDIO",
  "VIDEO": "VIDEO",
  "IMAGE": "IMAGE",
  "PDF": "PDF",
  "DOC": "DOC",
  "XLS": "XLS",
  "FILE": "FILE",
  "ZIP": "ZIP"
};

const PageType = {
  "CONTENT": "CONTENT",
  "COMMERCE": "COMMERCE"
};

const { RelationLink, Relation, Message, User, Profile, Log, Address, PayMethod, Cart, Product, Option, CartOption, Order, OrderOption, Document, Config, Invite, Folder, Midia, Menu, Page, Block, Category, deliveryMethod } = initSchema(schema);

export {
  RelationLink,
  Relation,
  Message,
  User,
  Profile,
  Log,
  Address,
  PayMethod,
  Cart,
  Product,
  Option,
  CartOption,
  Order,
  OrderOption,
  Document,
  Config,
  Invite,
  Folder,
  Midia,
  Menu,
  Page,
  Block,
  Category,
  deliveryMethod,
  RelationTypes,
  RelationModes,
  RelationStatus,
  MessagesTypes,
  UserStatus,
  GenderOptions,
  LogSource,
  PageStatus,
  PageChangeFreq,
  PagePriority,
  PageOptionTitle,
  PageSideColumn,
  PageOptionSideColumn,
  LogTags,
  ConfigValidationModes,
  InviteStatus,
  MidiaTypes,
  PageType
};