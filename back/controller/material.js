import Material from "../model/material";

export async function createMaterial({ lecture, title, body, attachments }) {
  const material = new Material({ lecture, title, body, attachments });
  console.log(material);
  return await material.save();
}

export async function readMaterial({ lecture }) {
  return await Material.find({ lecture });
}

export async function updateMaterial({ material, title, body, attachments }) {
  const update = {};
  if (title) {
    update.title = title;
  }
  if (body) {
    update.body = body;
  }
  if (attachments) {
    update.attachments = attachments;
  }
  return await Material.findByIdAndUpdate(material, update, { new: true });
}

export async function deleteMaterial({ material }) {
  return await Material.findByIdAndDelete(material);
}
