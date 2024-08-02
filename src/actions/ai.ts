import { post } from "@/utils/request";
export async function getAIAnswers(body: object) {
  return post("/ai/query", body);
}
