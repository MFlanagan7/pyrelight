import * as React from "react";

/** Gradient-hairline frame around art. Children are an <img>, <video>, or an image slot. */
export interface ImageFrameProps {
  /** CSS aspect-ratio string, e.g. "16 / 9", "2 / 3", "4 / 3" */
  ratio?: string;
  /** overlay applied above the art so type stays legible */
  scrim?: "none" | "card" | "caption" | "full";
  radius?: string;
  /** adds the deep float shadow — for panels that overlap a section boundary */
  float?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ImageFrame(props: ImageFrameProps): JSX.Element;
