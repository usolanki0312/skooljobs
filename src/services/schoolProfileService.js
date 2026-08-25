import { Configuration, SchoolProfileApi } from "../generated/school-api";

const BASE_URL = "http://dev.app.skooljobs.com/school-profiles";
const configuration = new Configuration({
    basePath: BASE_URL,
});

const schoolProfileApi = new SchoolProfileApi(configuration);

export const saveSchoolProfile = async (payload) => {
    return schoolProfileApi.createSchoolProfile(payload);
};