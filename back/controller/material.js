import Material from "../model/material";

export async function createMaterial({ lecture, title, body, attachments }) {
  const material = new Material({ lecture, title, body, attachments });
  console.log(material);
  return await material.save();
}

export async function readMaterial({ lecture }) {
  return await Material.find({ lecture });
}
