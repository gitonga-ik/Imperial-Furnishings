import { UUID } from "crypto";
import { createCategory, getCategory } from "./category";
import { Category } from "./interfaces";

// const id: UUID = "4741f0a7-d5f2-420d-b7bd-6206b2a4ed6b";

// const category: Category = {
//   name: "Bedroom",
//   description: "Heavenly Interiors",
//   created_by: id,
//   image: "", 
// };

const run = async () => {
  try {
    const output = await getCategory("living-room");
    console.log(output);
  } catch (error) {
    console.error("Failed to create category:", error);
  }
};

run();