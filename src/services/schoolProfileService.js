import { Configuration, SchoolProfileApi } from "../generated/school-api";

const BASE_URL = "http://localhost:8081";

const configuration = new Configuration({
    basePath: BASE_URL,
});

const schoolProfileApi = new SchoolProfileApi(configuration);

export const saveSchoolProfile = async (payload) => {
    return schoolProfileApi.createSchoolProfile(payload);
};