import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import SvgIcon from "components/SvgIcon";
import { useStores } from "hooks/useStores";
import { IComposition } from "interfaces/classes";
import { observer } from "mobx-react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { gray600 } from "theme/colors.theme";

const StructureItem = ({
  item,
  index,
  onEdit,
  onRemove,
}: {
  item: IComposition;
  index: number;
  onEdit?: (item: IComposition) => void;
  onRemove?: (item: IComposition) => void;
}) => {
  const { classStore } = useStores();
  const { isStudentOfClass } = classStore;
  return (
    <Draggable
      draggableId={item?.id}
      index={index}
      isDragDisabled={isStudentOfClass}
    >
      {(provided) => (
        <Card
          width={"full"}
          ref={provided.innerRef}
          boxShadow={"md"}
          mt={4}
          {...provided.draggableProps}
        >
          <CardBody justifyContent={"flex-end"} py={10}>
            <HStack
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <HStack w={"full"}>
                <HStack gap={6} flex={1}>
                  <Box
                    {...provided.dragHandleProps}
                    display={isStudentOfClass ? "none" : "flex"}
                  >
                    <SvgIcon iconName="ic-menu.svg" size={25} color={gray600} />
                  </Box>
                  <Text
                    noOfLines={1}
                    w={"full"}
                    fontSize={"lg"}
                    fontWeight={"bold"}
                  >
                    {item?.name}
                  </Text>
                </HStack>

                <Text fontSize={"lg"} fontWeight={"bold"}>
                  {item?.percentage}%
                </Text>
              </HStack>
              <Menu>
                <MenuButton
                  aria-label="Options"
                  disabled={isStudentOfClass}
                  display={isStudentOfClass ? "none" : "flex"}
                >
                  <Button
                    as={"div"}
                    variant={"ghost"}
                    borderRadius={"full"}
                    _hover={{
                      bgColor: "gray.200",
                    }}
                    onClick={() => {}}
                  >
                    <SvgIcon
                      iconName={"ic-threedot-vertical.svg"}
                      size={20}
                      color={gray600}
                    />
                  </Button>
                </MenuButton>
                <MenuList bgColor={"white.100"}>
                  <MenuItem
                    onClick={() => {
                      onEdit?.(item);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onRemove?.(item);
                    }}
                    color="red.500"
                  >
                    Remove
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </CardBody>
        </Card>
      )}
    </Draggable>
  );
};

export default observer(StructureItem);
