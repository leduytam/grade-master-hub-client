import { useQuery } from "react-query";
import { api } from "API";
import { UsersApiRouters } from "API/router";
import { IClass, IMetaResponse } from "interfaces/class";

export interface IClassesAsStudentResponse {
  data: IClass[];
  meta: IMetaResponse;
}

export const getClassesAsStudent = async (userId: string) => {
  const response = await api.get<IClassesAsStudentResponse>(
    UsersApiRouters.get.classes_as_student.value(userId, {
      sortBy: "updatedAt",
      page: 1,
      limit: 10,
    })
  );

  return response.data;
};

export const useGetClassesAsStudent = (userId: string) => {
  // @ts-ignore
  return useQuery<IClassesAsStudentResponse, Error, IClassesAsStudentResponse>({
    queryKey: [
      UsersApiRouters.get.classes_as_student.value(userId, {
        sortBy: "updatedAt",
        page: 1,
        limit: 10,
      }),
    ],
    queryFn: () => getClassesAsStudent(userId),
    enabled: !!userId,
  });
};
