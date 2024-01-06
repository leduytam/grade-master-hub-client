import { VStack, HStack, Text, Center, Spinner } from "@chakra-ui/react";
import { useGetClassReviews } from "API/get/get.class.reviews";
import EmptyList from "components/EmptyState/EmptyList";
import { useStores } from "hooks/useStores";
import { IClass, IReview } from "interfaces/classes";
import { observer } from "mobx-react";
import React from "react";
import { checkValidArray, getValidArray } from "utils/common";
import ReviewsDetailItem from "./ReviewDetailsItem";

interface Props {
  details: IClass;
}

const TeacherReviewsScene = ({ details }: Props) => {
  const { settingStore } = useStores();
  const {
    data: getClassReviews,
    isLoading: isClassReviewsLoading,
    refetch: refetchClassReviews,
  } = useGetClassReviews(details?.id ?? "");
  const { data: classReviews } = getClassReviews ?? {};

  settingStore?.setHeaderLoading(isClassReviewsLoading);

  if (isClassReviewsLoading) {
    return (
      <Center mt={20}>
        <Spinner boxSize={30} />
      </Center>
    );
  }

  const renderReviewItem = (item: IReview) => {
    return <ReviewsDetailItem review={item} key={item.id} />;
  };

  return (
    <VStack alignSelf={"center"} alignItems={"center"} h="full" flex={1}>
      {checkValidArray(classReviews) ? (
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
              Reviews
            </Text>
          </HStack>

          <VStack px={5} w={"full"}>
            {getValidArray(classReviews)?.map(renderReviewItem)}
          </VStack>
        </VStack>
      ) : (
        <EmptyList
          title={"No reviews"}
          description={"There are no reviews for this class"}
        />
      )}
    </VStack>
  );
};

export default observer(TeacherReviewsScene);