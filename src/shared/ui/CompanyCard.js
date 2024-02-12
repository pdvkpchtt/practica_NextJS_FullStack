import Image from "next/image";
import { useRouter } from "next/navigation";

import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";
import EmptyAvatar from "./EmptyAvatar";

const CompanyCard = ({ item }) => {
  const router = useRouter();

  const location = [item.city || null, item.country || null];

  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5 || dig > 999) return "вакансий";
    if (dig % 10 > 1 && dig % 10 < 5) return "вакансии";
    else return "вакансия";
  };

  function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  return (
    <div className="flex flex-row gap-[12px] bg-white dark:bg-[#212122] p-[12px] rounded-[20px]">
      <div className="min-w-[67px] bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 aspect-square h-[67px] w-[67px] min-h-[67px] max-w-[67px] max-h-[67px] overflow-hidden rounded-full">
        {item.image ? (
          <Image
            src={item.image}
            width={67}
            unoptimized
            height={67}
            alt="Profile image"
            className="min-w-[67px] max-w-[67px] object-cover max-h-[67px] h-[67px] w-[67px] min-h-[67px]"
          />
        ) : (
          <EmptyAvatar sixtySeven />
        )}
      </div>

      <div className="flex flex-col gap-[4px]">
        <TextMain
          text={item.name}
          style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em]"
          onClick={() =>
            router.push(
              `/companyprofile/${item.username ? item.username : item.id}`
            )
          }
        />
        <TextSecondary
          text={item.about}
          style="font-normal text-[14px] leading-[18px] tracking-[-0.182px]"
        />
        <TextSecondary
          text={`${abbreviateNumber(item.Vacancy.length)} ${getNoun(
            item.Vacancy.length
          )}`}
          style="font-medium text-[14px] leading-[18px] tracking-[-0.182px]"
        />
      </div>
    </div>
  );
};

export default CompanyCard;
