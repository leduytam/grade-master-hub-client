import {
  Alert,
  AlertIcon,
  Button,
  HStack,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import get from "lodash/get";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { verifyToken } from "API/post/post.auth.verify-token";
import { useStores } from "hooks/useStores";
import routes from "routes";

export interface IVerifyEmailFormData {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

const VerifyEmailForm = () => {
  const method = useForm<IVerifyEmailFormData>();
  const toast = useToast();
  const router = useRouter();
  const isQueryReady = router && router.isReady;
  const { authStore } = useStores();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  useEffect(() => {
    if (!isQueryReady) return;
    const query = router && get(router, "query", {});
    const token = get(query, "token", "");
    setIsLoading(false);
    async function verifyTokenAtFirst(tokenInput: string) {
      try {
        const res = await verifyToken(tokenInput);
        if (!res) {
          setErrorMessage(true);
          setSuccessMessage(false);
        }
        setSuccessMessage(true);
        setErrorMessage(false);
      } catch (error) {
        setErrorMessage(true);
        setSuccessMessage(false);
      }
    }
    verifyTokenAtFirst(token);
  }, [isQueryReady]);

  const showError = (error?: string): void => {
    toast({
      status: "error",
      description: error || "Something went wrong",
    });
  };

  const showSuccess = (message?: string): void => {
    toast({
      status: "success",
      description: message || "Change password successfully",
    });
    router.push(routes.auth.login.value);
  };

  if (isLoading) {
    return (
      <Stack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          alignSelf={"center"}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <HStack>
        {successMessage ? (
          <>
            <>
              <Alert status="success">
                <AlertIcon />
                Email verified successfully!
              </Alert>
            </>
          </>
        ) : (
          <></>
        )}
        {errorMessage ? (
          <>
            <>
              <Alert status="error">
                <AlertIcon />
                Verify email failed, try again!
              </Alert>
            </>
          </>
        ) : (
          <></>
        )}
      </HStack>
      <Button
        variant="solid"
        onClick={() => {
          router.push(routes.auth.login.value);
        }}
      >
        Go to login
      </Button>
    </Stack>
  );
};

export default VerifyEmailForm;
