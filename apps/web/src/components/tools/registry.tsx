import type { ComponentType } from "react";

/**
 * Components for the tool keys declared in lib/tools.ts.
 *
 * Kept apart from the key list because the Payload config imports the keys to
 * validate a field, and must not pull the component tree in with them.
 *
 * A key present in lib/tools.ts but missing here renders an explanatory message
 * rather than nothing — a half-built tool should be visibly half-built.
 */
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  // "astralite-shard": AstraliteShardGenerator,
};
