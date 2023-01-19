import Material from "../model/material";

export async function createMaterial({ lecture, title, body, attachement }) {
  const material = new Material({ lecture, title, body, attachement });
  return await material.save();
}

export async function readMaterial({ lecture }) {
  return await Material.find({ lecture });
}
