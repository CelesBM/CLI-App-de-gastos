import inquirer from "inquirer";
import { get, save, deleteExpense } from "./fileMethods.js";

// Función para agregar un gasto:

async function addExpense() {
  return await inquirer
    .prompt([
      {
        type: "input",
        name: "description",
        message: "Descripción del gasto:",
      },
      {
        type: "number",
        name: "amount",
        message: "Monto del gasto: $",
      },
    ])
    .then(async (data) => {
      const newExpense = {
        id: Date.now(),
        description: data.description,
        amount: data.amount,
      };
      const currentExpenses = await get("expenses");
      currentExpenses.push(newExpense);
      await save("expenses", currentExpenses);
    });
}

//Función para ver todos los gastos:

async function showAllExpenses() {
  const currentExpenses = await get("expenses");
  console.table(currentExpenses);
}

//Función para eliminar un gasto:

async function deleteAnExpense() {
  const currentExpenses = await get("expenses");
  console.table(currentExpenses);

  return await inquirer
    .prompt([
      {
        type: "number",
        name: "idToDelete",
        message: "Ingrese el ID del gasto que desea eliminar:",
      },
    ])
    .then(async (data) => {
      await deleteExpense("expenses", data.idToDelete);
      console.log("Gasto eliminado exitosamente.");
    })
    .catch((err) => {
      console.error("Error al eliminar el gasto:", err);
    });
}

//Función main:

async function main() {
  let run = true;
  while (run) {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "chosen",
        message: "¿Qué desea hacer?",
        choices: [
          { value: 1, name: "Agregar un gasto" },
          { value: 2, name: "Ver todos los gastos" },
          { value: 3, name: "Eliminar un gasto" },
          { value: 4, name: "Salir" },
        ],
      },
    ]);
    switch (action.chosen) {
      case 1:
        await addExpense();
        break;
      case 2:
        await showAllExpenses();
        break;
      case 3:
        await deleteAnExpense();
        break;
      case 4:
        run = false;
        break;
      default:
        run = false;
        break;
    }
  }
  console.log("Muchas gracias por usar nuestra app! Hasta pronto.");
}

main();
