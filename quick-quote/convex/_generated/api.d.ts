/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clients from "../clients.js";
import type * as images from "../images.js";
import type * as myFunctions from "../myFunctions.js";
import type * as notificationSettings from "../notificationSettings.js";
import type * as pricingRules from "../pricingRules.js";
import type * as quotes from "../quotes.js";
import type * as tenants from "../tenants.js";
import type * as users from "../users.js";
import type * as vehicles from "../vehicles.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clients: typeof clients;
  images: typeof images;
  myFunctions: typeof myFunctions;
  notificationSettings: typeof notificationSettings;
  pricingRules: typeof pricingRules;
  quotes: typeof quotes;
  tenants: typeof tenants;
  users: typeof users;
  vehicles: typeof vehicles;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
