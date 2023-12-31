import {
  Button,
  Collapse,
  HStack,
  Link,
  LinkProps,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Icon from "components/Icon";
import SvgIcon from "components/SvgIcon";
import { gray500 } from "theme/colors.theme";
import { checkValidArray } from "utils/common";
import React, { useEffect } from "react";
import { observer } from "mobx-react";

export interface INavLinkProps extends LinkProps {
  isActive?: boolean;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  isExpanded?: boolean;
  isCollapsed?: boolean;
  children?: React.ReactNode[];
  isLoading?: boolean;
  _style?: {
    iconColor?: string;
    hoverBgColor?: string;
    textColor?: string;
  };
}

const NavLink = (props: INavLinkProps) => {
  const {
    icon,
    isActive,
    label,
    href,
    onClick,
    isExpanded = true,
    isCollapsed = false,
    isLoading = false,
    children,
    _style,
  } = props;
  const isSVGIcon = icon?.endsWith(".svg");
  const { hoverBgColor, textColor } = _style ?? {};
  const isHavingChildren = checkValidArray(children);
  const [collapsed, setCollapsed] = React.useState(isCollapsed);

  const setOpenChildren = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <VStack
      w={"100%"}
      spacing={0}
      alignItems="flex-start"
      maxW={isExpanded ? "250px" : undefined}
    >
      <HStack
        className={undefined}
        paddingY={3}
        px={1}
        w={"100%"}
        borderRadius="lg"
        minW={isExpanded ? "250px" : undefined}
        bgColor={isActive ? "gray.200" : "transparent"}
        _hover={{
          bg: hoverBgColor ?? "gray.200",
        }}
        cursor="pointer"
        position="relative"
      >
        <Link
          className={undefined}
          onClick={onClick}
          href={href}
          _hover={{
            textDecoration: "none",
          }}
          as={href ? NextLink : undefined}
          flex={1}
          w={"full"}
        >
          <HStack spacing={3} px={3} flex={1} w={"full"}>
            {isSVGIcon ? (
              <SvgIcon
                iconName={icon}
                size={30}
                color={
                  _style?.iconColor
                    ? _style?.iconColor
                    : isActive
                    ? gray500
                    : "#767676"
                }
              />
            ) : (
              <Icon iconName={icon} size={30} alt="" />
            )}
            {isExpanded ? (
              <Text
                as="span"
                flexGrow={1}
                color={textColor ?? "gray.500"}
                fontWeight={600}
                fontSize="sm"
                lineHeight="1.5rem"
                noOfLines={1}
                isTruncated
                w={"100%"}
              >
                {label}
              </Text>
            ) : null}
          </HStack>
        </Link>

        {isHavingChildren && isExpanded ? (
          <Button
            variant="ghost"
            size="sm"
            color="gray.500"
            _hover={{
              bg: "transparent",
            }}
            bg="transparent"
            onClick={setOpenChildren}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            margin={"auto"}
          >
            {!isLoading ? (
              <SvgIcon
                iconName={collapsed ? "ic-up.svg" : "ic-down.svg"}
                size={30}
                color={"#767676"}
              />
            ) : (
              <Spinner size="sm" color="gray.500" />
            )}
          </Button>
        ) : null}
      </HStack>

      <Collapse in={collapsed && isExpanded} animateOpacity>
        <VStack spacing={0} alignItems="flex-start" gap={2} mt={2} flex={1}>
          {children}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default observer(NavLink);
