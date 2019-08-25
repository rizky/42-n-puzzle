// flow-typed signature: ba9ec9b2e54b29cd9424bb47d81e9de3
// flow-typed version: c6154227d1/object-hash_v1.x.x/flow_>=v0.104.x

/**
 * Flow libdef for 'object-hash'
 * See https://www.npmjs.com/package/object-hash
 * by Vincent Driessen, 2018-12-21
 */

declare module "object-hash" {
  declare type Options = {|
    algorithm?: "sha1" | "sha256" | "md5" | "passthrough",
    excludeValues?: boolean,
    encoding?: "buffer" | "hex" | "binary" | "base64",
    ignoreUnknown?: boolean,
    unorderedArrays?: boolean,
    unorderedSets?: boolean,
    unorderedObjects?: boolean,
    excludeKeys?: string => boolean
  |};

  declare export default (
    value: { +[string]: mixed, ... } | Array<mixed>,
    options?: Options
  ) => string;
}
