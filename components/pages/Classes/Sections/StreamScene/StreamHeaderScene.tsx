import {
  VStack,
  Image,
  Text,
  Button,
  Tooltip,
  Collapse,
  HStack,
  useToast,
} from "@chakra-ui/react";
import SvgIcon from "components/SvgIcon";
import {
  StudentClassBackground,
  TeacherClassBackground,
} from "constants/pages/classes";
import { ETabName } from "enums/classes";
import { useStores } from "hooks/useStores";
import { capitalize } from "lodash";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React from "react";
import routes from "routes";
import { gray500 } from "theme/colors.theme";

interface Props {
  onOpenCodeModal?: () => void;
}

const StreamHeaderScene = ({ onOpenCodeModal }: Props) => {
  const { classStore } = useStores();
  const { currentClass, currentStudentId, isStudentOfClass } = classStore;
  const router = useRouter();
  const [showDetails, setShowDetails] = React.useState(true);
  const toast = useToast();

  return (
    <VStack
      w={"full"}
      h={"full"}
      alignItems={"center"}
      shadow={"md"}
      borderRadius={10}
      overflow={"hidden"}
    >
      <VStack w={"full"} position={"relative"}>
        <Image
          src={
            currentClass?.role === "teacher"
              ? TeacherClassBackground
              : StudentClassBackground
          }
          w={"full"}
          h={"full"}
          objectFit={"contain"}
        />

        <Button
          rounded={"full"}
          onClick={() => {
            setShowDetails(!showDetails);
          }}
          p={0}
          justifyItems={"center"}
          alignItems={"center"}
          variant={"icon"}
          position={"absolute"}
          zIndex={1}
          right={3}
          bottom={5}
        >
          <SvgIcon iconName={"ic-info.svg"} fill="white" color="white" />
        </Button>

        <VStack
          w={"full"}
          h={"full"}
          position={"absolute"}
          alignItems={"start"}
          justifyContent={"flex-end"}
          bottom={0}
          left={0}
          p={5}
          bgGradient={"linear(to-t, blackAlpha.500, transparent)"}
          borderRadius={10}
        >
          <Text color={"white"} fontSize={"3xl"} fontWeight={"bold"}>
            {currentClass?.name}
          </Text>
          <Text color={"white"} fontSize={"xl"} fontWeight={"normal"}>
            {currentClass?.description}
          </Text>
        </VStack>
      </VStack>
      <Collapse
        in={showDetails}
        animateOpacity
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          width: "100%",
        }}
      >
        <VStack w={"full"} alignItems={"start"} p={5} gap={3}>
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"}>ID:</Text>
            <HStack
              spacing={2}
              alignItems={"center"}
              justifyContent={"flex-end"}
              onClick={() => {
                navigator.clipboard.writeText(currentClass?.id ?? "");
                toast({
                  title: "Copied!",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              <Text textAlign={"right"}>{currentClass?.id}</Text>
              <SvgIcon
                iconName={"ic-copy.svg"}
                fill={gray500}
                color={gray500}
                size={20}
              />
            </HStack>
          </HStack>
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"}>Code:</Text>

            <HStack
              spacing={2}
              alignItems={"center"}
              justifyContent={"flex-end"}
              onClick={() => {
                onOpenCodeModal?.();
              }}
            >
              <Text>{currentClass?.code}</Text>
              <SvgIcon
                iconName={"ic-frame.svg"}
                fill={gray500}
                color={gray500}
                size={20}
              />
            </HStack>
          </HStack>

          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"}>Role:</Text>
            <Text>{capitalize(currentClass?.role) ?? ""}</Text>
          </HStack>

          {isStudentOfClass ? (
            <HStack
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text fontWeight={"bold"}>Student:</Text>
              {currentStudentId ? (
                <Text>{currentStudentId ?? ""}</Text>
                ): (
                  <Button
                    variant={"link"}
                    onClick={async () => {
                      await router.push(routes.classes.details.value(currentClass?.id ?? "", ETabName.Students))
                      router.reload();
                    }}
                    rightIcon={
                      <SvgIcon
                        iconName={"ic-arrow-right.svg"}
                        size={20}
                      />
                    }
                  >
                    Assign now
                  </Button>
                )}
            </HStack>
          ) : null}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default observer(StreamHeaderScene);
