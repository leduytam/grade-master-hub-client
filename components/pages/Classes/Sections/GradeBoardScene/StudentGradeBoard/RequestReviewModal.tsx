import Modal from "components/Modal";
import React, { useCallback, useEffect } from "react";
import {
  Button,
  HStack,
  UnorderedList,
  Text,
  VStack,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import FormInput from "components/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ReviewGradeSchema,
  IReviewGradeSchema,
} from "constants/validation/classes";
import { usePostRequestReview } from "API/post/post.class.request-review";
import { ICompositionGrade } from "interfaces/classes";

type RequestReviewModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initGrade: ICompositionGrade;
};

const RequestReviewModal = ({
  isVisible,
  onClose,
  initGrade,
}: RequestReviewModalProps) => {
  const { mutateAsync: createReview, isLoading } = usePostRequestReview();
  const toast = useToast();
  const method = useForm<IReviewGradeSchema>({
    defaultValues: {
      explanation: "",
      expectedGrade: 0,
    },
    resolver: yupResolver(ReviewGradeSchema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = method;

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = async (values: IReviewGradeSchema) => {
    const res = await createReview({
      expectedGrade: values?.expectedGrade,
      explanation: values?.explanation,
      gradeId: initGrade?.id ?? "",
    });

    if (res.status >= 400) {
      toast({
        description: res?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      toast({
        description: "Request review successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onCloseModal();
    }
  };

  useEffect(() => {
    if (initGrade?.grade) {
      method.setValue("expectedGrade", initGrade?.grade);
    }
  }, [initGrade?.grade, isVisible]);

  const Title = useCallback(() => {
    return (
      <HStack w="full" justifyContent={"space-between"}>
        <Text fontSize={20} fontWeight={600}>
          Request review to your teachers
        </Text>

        <Button
          variant="primary"
          isDisabled={!isValid}
          size="md"
          onClick={handleSubmit(onSubmit)}
          w={100}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </HStack>
    );
  }, [isValid, isLoading]);

  return (
    <Modal
      isVisible={isVisible}
      onClose={onCloseModal}
      title={<Title />}
      size="full"
    >
      <FormProvider {...method}>
        <VStack alignItems={"center"} spacing={5} p={5}>
          <VStack
            w={{
              base: "90%",
              md: "50%",
              lg: "40%",
            }}
            gap={8}
          >
            <VStack
              gap={3}
              p={5}
              borderWidth={1}
              borderColor={"gray.300"}
              alignItems={"start"}
              borderRadius={10}
              w={"full"}
            >
              <Text fontSize={18} fontWeight={900}>
                Request review
              </Text>

              <FormInput
                name="expectedGrade"
                placeholder="Enter your expected grade"
                isRequired={true}
                label="Your expected grade"
              />

              <FormInput
                name="explanation"
                placeholder="Enter your explanation"
                isRequired={true}
                multiple={true}
                label="Explanation"
              />
            </VStack>

            <VStack alignItems={"start"} w={"full"}>
              <Text fontWeight={600}>To request review to your teachers:</Text>
              <UnorderedList>
                <ListItem key={1}>
                  Use an authorized account to request review
                </ListItem>
                <ListItem key={2}>
                  Fill in your expected grade and the reason why you want to
                </ListItem>
              </UnorderedList>
            </VStack>
          </VStack>
        </VStack>
      </FormProvider>
    </Modal>
  );
};

export default RequestReviewModal;
