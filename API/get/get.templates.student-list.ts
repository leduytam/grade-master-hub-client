import { api } from "API";
import { GlobalApiRouters } from "API/router.api";

export const getTemplateStudentList = async () => {
  const res = await api.get(GlobalApiRouters.get.templates_student_list.value);
  return res?.data;
};

export const getGradesTemplate = async () => {
  const res = await api.get(GlobalApiRouters.get.templates_grades.value);
  return res?.data;
}