import {
  VStack,
  HStack,
  Text,
  Center,
  Spinner,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import EmptyList from "components/EmptyState/EmptyList";
import { useStores } from "hooks/useStores";
import { IClass, IReview } from "interfaces/classes";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { checkValidArray, getValidArray } from "utils/common";
import { EReviewStatus } from "enums/classes";
import ReviewsDetailItem from "./ReviewDetailsItem";
import { useGetMyReviews } from "API/get/get.class.my-reviews";
import { useRouter } from "next/router";
import ReviewDetails from "../ReviewDetailsModal";

interface Props {
  details: IClass;
}

const StudentReviewsScene = ({ details }: Props) => {
  const { settingStore } = useStores();
  const [filterStatus, setFilterStatus] = React.useState<EReviewStatus>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router?.isReady) return;
    if (router?.query?.reviewId) {
      setIsModalOpen(true);
      setSelectedReviewId(router?.query?.reviewId as string);
    }
  }, [router?.isReady, router?.query?.reviewId]);

  const {
    data: getClassReviews,
    isLoading: isClassReviewsLoading,
    refetch: refetchClassReviews,
  } = useGetMyReviews(details?.id ?? "", {
    "filter.status": filterStatus,
  });
  const { data: getAllClassReviews, isLoading: isAllClassReviewsLoading } =
    useGetMyReviews(details?.id ?? "");
  const { data: classReviews } = getClassReviews ?? {};

  settingStore?.setHeaderLoading(
    isClassReviewsLoading || isAllClassReviewsLoading
  );

  const renderReviewItem = (item: IReview) => {
    return (
      <ReviewsDetailItem
        review={item}
        key={item.id}
        refetch={async () => {
          refetchClassReviews();
        }}
      />
    );
  };

  const onChangeTab = async (index: number) => {
    switch (index) {
      case 0:
        setFilterStatus(undefined);
        break;
      case 1:
        setFilterStatus(EReviewStatus.PENDING);
        break;
      case 2:
        setFilterStatus(EReviewStatus.ACCEPTED);
        break;
      case 3:
        setFilterStatus(EReviewStatus.REJECTED);
        break;
      default:
        break;
    }
  };

  if (isClassReviewsLoading || isAllClassReviewsLoading) {
    return (
      <Center mt={20}>
        <Spinner boxSize={30} />
      </Center>
    );
  }

  if (!checkValidArray(getAllClassReviews?.data)) {
    return (
      <EmptyList title={"No reviews"} description={"There are no reviews"} />
    );
  }

  return (
    <VStack alignSelf={"center"} alignItems={"center"} h="full" flex={1}>
      <VStack
        w={"full"}
        maxW={"container.lg"}
        p={10}
        borderColor={"gray.300"}
        alignItems={"start"}
        h={"full"}
        gap={5}
      >
        <HStack w={"full"} justifyContent={"space-between"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Reviews history
          </Text>
        </HStack>

        <Tabs isFitted variant="enclosed" w={"full"} onChange={onChangeTab}>
          <TabList mb="1em">
            <Tab
              _selected={{
                color: "primary.500",
                fontWeight: "bold",
                bg: "primary.100",
              }}
            >
              All
            </Tab>
            <Tab
              color="yellow.900"
              _selected={{
                color: "yellow.800",
                fontWeight: "bold",
                bg: "yellow.100",
              }}
            >
              Pending
            </Tab>
            <Tab
              color="green.900"
              _selected={{
                color: "green.500",
                fontWeight: "bold",
                bg: "green.100",
              }}
            >
              Approved
            </Tab>
            <Tab
              color="red.900"
              _selected={{
                color: "red.500",
                fontWeight: "bold",
                bg: "red.100",
              }}
            >
              Rejected
            </Tab>
          </TabList>
        </Tabs>
        {checkValidArray(classReviews) ? (
          <VStack px={5} w={"full"} gap={7}>
            {getValidArray(classReviews)?.map(renderReviewItem)}
          </VStack>
        ) : (
          <EmptyList
            title={"No reviews"}
            description={"There are no reviews"}
          />
        )}
      </VStack>
      <ReviewDetails
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewId={selectedReviewId}
      />
    </VStack>
  );
};

export default observer(StudentReviewsScene);
