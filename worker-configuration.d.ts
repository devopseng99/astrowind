/**
 * Cloudflare Worker environment and bindings type definitions
 * This file provides TypeScript support for Cloudflare Workers runtime APIs
 */

declare global {
  /**
   * Cloudflare Worker environment interface
   * Add your custom environment variables and bindings here
   */
  interface Env {
    // Environment variables
    ENVIRONMENT: 'development' | 'staging' | 'production';
    
    // Assets binding for static files
    ASSETS: Fetcher;
    
    // KV namespace bindings (uncomment and customize as needed)
    // MY_KV_NAMESPACE: KVNamespace;
    
    // D1 database bindings (uncomment and customize as needed)
    // DB: D1Database;
    
    // R2 bucket bindings (uncomment and customize as needed)
    // MY_BUCKET: R2Bucket;
    
    // AI binding (uncomment if using Cloudflare AI)
    // AI: Ai;
    
    // Analytics Engine bindings (uncomment if needed)
    // AE: AnalyticsEngineDataset;
    
    // Durable Object bindings (uncomment and customize as needed)
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    
    // Queue bindings (uncomment and customize as needed)
    // MY_QUEUE: Queue;
    
    // Service bindings (uncomment and customize as needed)
    // MY_SERVICE: Fetcher;
    
    // Vectorize bindings (uncomment and customize as needed)
    // VECTORIZE_INDEX: VectorizeIndex;
    
    // Hyperdrive bindings (uncomment and customize as needed)
    // HYPERDRIVE: Hyperdrive;
  }

  /**
   * Cloudflare Workers execution context
   */
  interface ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
  }

  /**
   * Cloudflare Workers fetch event
   */
  interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Response | Promise<Response>): void;
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
  }
}

/**
 * Cloudflare Workers Types
 * These are the main types you'll work with in your worker
 */

export interface CloudflareEnv extends Env {}

export interface CloudflareExecutionContext extends ExecutionContext {}

/**
 * Worker handler function signature
 */
export type WorkerHandler = (
  request: Request,
  env: CloudflareEnv,
  ctx: CloudflareExecutionContext
) => Response | Promise<Response>;

/**
 * Scheduled event handler function signature
 */
export type ScheduledEventHandler = (
  event: ScheduledEvent,
  env: CloudflareEnv,
  ctx: CloudflareExecutionContext
) => Promise<void>;

/**
 * Queue message handler function signature
 */
export type QueueMessageHandler<T = unknown> = (
  batch: MessageBatch<T>,
  env: CloudflareEnv,
  ctx: CloudflareExecutionContext
) => Promise<void>;

/**
 * Durable Object handler class interface
 */
export interface DurableObjectHandler {
  fetch(request: Request): Response | Promise<Response>;
  alarm?(): Promise<void>;
  webSocketMessage?(ws: WebSocket, message: string | ArrayBuffer): void;
  webSocketClose?(ws: WebSocket, code: number, reason: string, wasClean: boolean): void;
  webSocketError?(ws: WebSocket, error: Error): void;
}

export {};