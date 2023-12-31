import { Flex, Stack, VStack, Divider, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { EZIndexLayer } from "enums/theme";
import { useStores } from "hooks/useStores";
import routes from "routes";
import NavLink, { INavLinkProps } from "../NavLink";
import { EAdminPageName, EUserPageName } from "constants/pages/common";
import { observer } from "mobx-react";
import { red300, red500 } from "theme/colors.theme";
import { useMediaQuery } from "react-responsive";
import { maxMobileWidth, maxTabletWidth } from "theme/globalStyles";
import { useGetClassesAsStudent } from "API/get/get.classes.student";
import { useGetClassesAsOwner } from "API/get/get.classes.owned";
import { useGetClassesAsTeacher } from "API/get/get.classes.teacher";
import { getValidArray } from "utils/common";

export interface ISidebarRefProps {
  onExpand: () => void;
}

interface ISidebarProps {}
const SideBar = forwardRef<ISidebarRefProps, ISidebarProps>((_, ref) => {
  const router = useRouter();
  const { authStore, settingStore } = useStores();
  const { isSideBarExpanded, setSideBarExpanded } = settingStore;
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth });
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth });

  const query = {
    limit: 10,
  };

  const { data: studentClasses, isLoading: isLoadingStudentClasses } =
    useGetClassesAsStudent(authStore?.user?.id ?? "", query);

  const { data: ownedClasses, isLoading: isLoadingOwnedClasses } =
    useGetClassesAsOwner(authStore?.user?.id ?? "", query);

  const { data: teachingClasses, isLoading: isLoadingTeachingClasses } =
    useGetClassesAsTeacher(authStore?.user?.id ?? "", query);

  function getLinkProps(
    href: string,
    iconName: string,
    children?: INavLinkProps[]
  ): Omit<INavLinkProps, "label"> {
    const isActive = router.asPath.includes(href);
    const isCollapsed = children
      ?.map((child) => child?.href)
      ?.some((href) => router.asPath.includes(href ?? ""));
    const icon = `${iconName?.replace(".svg", "")}.svg`;

    return {
      isActive,
      href,
      icon: icon,
      isExpanded: isSideBarExpanded,
      isCollapsed,
      children: children?.map((child) => {
        return (
          <NavLink
            key={child.href}
            label={child?.label}
            {...getLinkProps(child.href ?? "", child?.icon)}
          />
        );
      }),
    };
  }

  useEffect(() => {
    if (isMobile || isTabletMobile) {
      setSideBarExpanded(false);
    } else {
      setSideBarExpanded(true);
    }
  }, [isMobile, isTabletMobile]);

  useImperativeHandle(ref, () => ({
    onExpand: () => {
      const isSideBarExpanded = Boolean(settingStore.isSideBarExpanded);
      setSideBarExpanded(!isSideBarExpanded);
    },
  }));

  return (
    <VStack
      minWidth="24px"
      width={"fit-content"}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      color="white"
      zIndex={EZIndexLayer.NAV}
      borderRightWidth={1}
      borderRightColor={"gray.300"}
      px={5}
    >
      <VStack
        display="flex"
        flex={1}
        width="full"
        h={"full"}
        overflowX="hidden"
        overflowY="auto"
        justifyContent={"space-between"}
        divider={<Divider h={0.5} bgColor={"gray.400"} />}
        py={3}
      >
        <Stack
          width="full"
          flex={1}
          divider={<Divider h={"1px"} bgColor={"gray.400"} />}
        >
          <NavLink
            label={EAdminPageName.ACCOUNTS}
            {...getLinkProps(routes.admin.manageAccount.value, "ic-home")}
          />
          <NavLink
            label={EAdminPageName.CLASSES}
            {...getLinkProps(routes.admin.manageClass.value, "ic-home")}
          />
        </Stack>
        <Stack w="full" alignSelf={"end"}>
          <NavLink
            label={EUserPageName.SETTINGS}
            {...getLinkProps(routes.admin.profile.value, "ic-settings", [
              {
                label: EUserPageName.CHANGE_PASSWORD,
                ...getLinkProps(
                  routes.admin.profile.change_password.value,
                  "ic-password"
                ),
              },
            ])}
          />
          <NavLink
            label={EUserPageName.LOGOUT}
            onClick={() => {
              authStore.logout();
            }}
            icon={"ic-logout.svg"}
            isExpanded={isSideBarExpanded}
            _style={{
              iconColor: red500,
              hoverBgColor: red300,
              textColor: red500,
            }}
          />
        </Stack>
      </VStack>
    </VStack>
  );
});

export default observer(SideBar);
