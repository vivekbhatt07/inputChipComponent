import { FC, CSSProperties } from "react";

interface RoundedImageWrap {
  style?: CSSProperties;
  dimension: number;
  source: string;
  alternative: string;
  dimensionUnit?: string;
}

const RoundedImageWrap: FC<RoundedImageWrap> = ({
  style,
  dimension = 30,
  source,
  alternative,
  dimensionUnit,
}) => {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: dimensionUnit
          ? `${dimension}${dimensionUnit}`
          : `${dimension}px`,
        height: dimensionUnit
          ? `${dimension}${dimensionUnit}`
          : `${dimension}px`,
        ...style,
      }}
    >
      <img
        src={source}
        alt={alternative}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default RoundedImageWrap;
