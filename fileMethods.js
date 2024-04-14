import fs from "fs";

export const get = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file + ".json", "utf-8", (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(content));
    });
  });
};

export const save = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file + ".json", JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

export const deleteExpense = async (file, idToDelete) => {
  let currentExpenses = await get(file);
  currentExpenses = currentExpenses.filter(
    (expense) => expense.id !== idToDelete
  );
  await save(file, currentExpenses);
};
