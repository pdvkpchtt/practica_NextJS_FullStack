import Image from "next/image";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";

const ChatsEmpty = () => {
  return (
    <Card
      style={
        "[@media(pointer:coarse)]:hidden h-full flex justify-center items-center flex-col [@media(hover)]:mt-[62px] w-[436px]"
      }
    >
      <div className="w-full h-fit flex justify-center items-center">
        <Image
          src={"/TwoGuysOneCup.png"}
          quality={100}
          unoptimized
          className="h-[300px] w-fit"
          width={1620}
          height={1308}
        />
      </div>
      <TextSecondary
        text="Начните общение, выбрав чат"
        style={
          "h-fit w-full mt-[12px] flex justify-center items-center select-none"
        }
      />
    </Card>
  );
};

export default ChatsEmpty;
