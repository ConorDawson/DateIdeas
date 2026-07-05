import { getIdeas } from "./ideas.js";

export async function randomIdea(listName) {
  const { data } = await getIdeas(listName);

  const idea = data[Math.floor(Math.random() * data.length)];

  return idea;
}

export function coinFlip(idea1, idea2) {
  return Math.random() < 0.5 ? idea1 : idea2;
}