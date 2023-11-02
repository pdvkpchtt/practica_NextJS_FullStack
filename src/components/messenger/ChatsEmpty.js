import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";

const ChatsEmpty = () => {
  return (
    <Card
      style={
        "[@media(pointer:coarse)]:hidden h-full [@media(hover)]:mt-[62px] w-[436px]"
      }
    >
      <TextSecondary
        text="Начни общение выбрав чат"
        style={"h-full w-full flex justify-center items-center select-none"}
      />
    </Card>
  );
};

export default ChatsEmpty;
