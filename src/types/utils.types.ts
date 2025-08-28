// ================================
// src/types/utils.types.ts
// ================================

// Utility Types - Separated to avoid conflicts

// Make all properties optional
export type PartialType<T> = {
    [P in keyof T]?: T[P];
  };
  
  // Make all properties required
  export type RequiredType<T> = {
    [P in keyof T]-?: T[P];
  };
  
  // Pick specific properties
  export type PickType<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  
  // Omit specific properties
  export type OmitType<T, K extends keyof T> = PickType<T, Exclude<keyof T, K>>;
  
  // Create a type with some properties optional
  export type PartialBy<T, K extends keyof T> = OmitType<T, K> & PartialType<PickType<T, K>>;
  
  // Create a type with some properties required
  export type RequiredBy<T, K extends keyof T> = T & RequiredType<PickType<T, K>>;
  
  // Function types
  export type AsyncFunction<T = any, R = any> = (args: T) => Promise<R>;
  export type VoidFunction = () => void;
  export type AsyncVoidFunction = () => Promise<void>;
  
  // Deep partial type
  export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  // Extract array element type
  export type ArrayElement<T> = T extends (infer U)[] ? U : never;
  
  // Extract function return type
  export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
  
  // Extract function parameters type
  export type Parameters<T> = T extends (...args: infer P) => any ? P : never;
  
  // Nullable type
  export type Nullable<T> = T | null;
  
  // Optional type
  export type Optional<T> = T | undefined;