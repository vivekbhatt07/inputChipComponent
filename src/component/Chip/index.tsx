import { FC } from "react";
import { RoundedImageWrap } from "..";
import { User } from "../../types";
import CloseIcon from "../../assets/closeIcon.svg";

interface Chip {
  image?: string;
  label: string;
  handleChip: () => void;
  handleList: () => void;
  selectedId: string;
  item: User;
}

const Chip: FC<Chip> = ({
  image,
  label,
  handleChip,
  handleList,
  selectedId,
  item,
  // @ts-ignore
  isHighlight,
}) => {
  return (
    <div
      className={`flex gap-1 rounded-full bg-[#ddd] items-center transition-all ${
        isHighlight.data?.id === selectedId &&
        isHighlight.isReadyToDelete &&
        "bg-[#a8a29e] text-[#fff]"
      }`}
    >
      {image && (
        <RoundedImageWrap source={image} alternative={label} dimension={30} />
      )}

      <span className="text-xs">{label}</span>
      <button
        className="w-4 h-4 rounded-full hover:bg-[#aaa] mr-2 flex justify-center items-center transition-all"
        title="Remove"
        onClick={() => {
          // @ts-ignore
          handleList((prev) => {
            return [...prev, item];
          });
          // @ts-ignore
          handleChip((prev) => {
            return prev.filter((item: User) => {
              return item.id !== selectedId;
            });
          });
        }}
      >
        <img src={CloseIcon} alt="close" className="w-[10px] h-[10px]" />
      </button>
    </div>
  );
};

export default Chip;
