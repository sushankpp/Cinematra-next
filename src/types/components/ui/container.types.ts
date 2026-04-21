export type ContainerSize = "sm" | "md" | "lg" | "xl";
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}
