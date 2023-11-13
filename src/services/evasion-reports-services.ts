import api from "@src/config/axios";
import { EvasionReport } from "@src/models/EvasionReport";

const BASE_URL = "/evasion-reports";

export type CreateEvasionReport = Pick<
  EvasionReport,
  "communityId" | "userId" | "reason"
>;
export const createEvasionReport = async (body: CreateEvasionReport) => {
  const { data } = await api.post<EvasionReport>(BASE_URL, body);
  return data;
};
