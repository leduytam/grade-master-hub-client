import { useQuery } from "react-query";
import { IClass, IMetaResponse } from "interfaces/classes";
import { api } from "API";
import { ClassesApiRouters } from "API/router.api";
export interface IAccountListResponse {
  data: IClass[];
  meta: IMetaResponse;
  links: any;
}
export const getClassDetails = async (classId: string) => {
  const response = await api.get<IClass>(
    ClassesApiRouters.get.class_details.value(classId)
  );
  if (response.status !== 200) throw new Error(response.statusText);
  return response.data;
};

export const useGetClassDetails = (classId: string) => {
  return useQuery<IClass, Error, IClass>({
    queryKey: [ClassesApiRouters.get.class_details.value(classId)],
    queryFn: () => getClassDetails(classId),
    enabled: !!classId,
    keepPreviousData: true,
  });
};

export const getAllClasses = async (pageNumber: string) => {
  const response = await api.get<IAccountListResponse>(
    ClassesApiRouters.get.all_classes.value(pageNumber)
  );
  if (response.status !== 200) throw new Error(response.statusText);
  return response.data;
};
