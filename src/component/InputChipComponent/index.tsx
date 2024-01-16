import {
  FC,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../../types";
import { RoundedImageWrap } from "..";

import CloseIcon from "../../assets/closeIcon.svg";

interface InputChipComponent {
  list: User[];
  originalList: User[];
  chips: User[];
  imageKey: string;
  labelKey: string;
  labelUnique: string;
  children: ReactNode;
  handleList: Dispatch<SetStateAction<User[]>>;
  handleChip: Dispatch<SetStateAction<User[]>>;
}

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
      className={`flex gap-1 rounded-full bg-[#ddd] items-center ${
        isHighlight.data?.id === selectedId &&
        isHighlight.isReadyToDelete &&
        "bg-[#aaa]"
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

const InputChipComponent: FC<InputChipComponent> = ({
  chips,
  imageKey,
  labelKey,
  labelUnique,
  children,
  handleList,
  handleChip,
  originalList,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isToBeDeleted, setIsToBeDeleted] = useState({
    isReadyToDelete: false,
    data: null,
  });
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 400);
  };
  const [searchText, setSearchText] = useState<string>("");

  const common = originalList
    .filter((originalUser) =>
      chips.some((user) => user.name === originalUser.name)
    )
    .map((filteredUser) => {
      // @ts-ignore
      return filteredUser[labelUnique];
    });
  //@ts-ignore
  const handleBackDelete = (e) => {
    const keyType = e.code;
    const isInputText = e.target.value === "";
    if (keyType == "Backspace" && isInputText && chips.length > 0) {
      if (isToBeDeleted.isReadyToDelete) {
        let item: User;
        handleChip((prevList) => {
          item = prevList[prevList.length - 1];
          return [...prevList.slice(0, prevList.length - 1)];
        });

        handleList((prev) => {
          return [...prev, item];
        });
        setIsToBeDeleted({
          isReadyToDelete: false,
          data: null,
        });
      } else {
        setIsToBeDeleted({
          isReadyToDelete: true,
          //@ts-ignore
          data: chips[chips.length - 1],
        });
      }
    }
  };

  useEffect(() => {
    const filteredList = originalList;
    const updatedList = filteredList.filter((item) => {
      return common.every((elem) => elem !== item.id);
    });

    // @ts-ignore
    handleList((prevList) => {
      return updatedList.filter((item: User) => {
        // @ts-ignore
        // return item[labelKey].includes(searchText);
        return item[labelKey].toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [searchText]);

  return (
    <div className="relative">
      <div className="border-2 border-[#ddd] w-full">
        <div className="flex gap-2 p-1 items-center flex-wrap">
          {chips.map((item) => {
            return (
              <Chip
                key={item.id}
                // @ts-ignore
                image={item[imageKey]}
                // @ts-ignore
                label={item[labelKey]}
                // @ts-ignore
                handleChip={handleChip}
                // @ts-ignore
                handleList={handleList}
                selectedId={item.id}
                item={item}
                isHighlight={isToBeDeleted}
              />
            );
          })}
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="text-xl p-2 outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={(e) => handleBackDelete(e)}
          />
        </div>
      </div>
      {isFocused && <div className="absolute">{children}</div>}
    </div>
  );
};

export default InputChipComponent;
