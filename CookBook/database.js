import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("recipes.db");

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recipes (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          ingredients TEXT NOT NULL,
          instructions TEXT NOT NULL,
          image TEXT
        );`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

// Inserare rețetă
export const addRecipe = ({ name, ingredients, instructions, image }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO recipes (name, ingredients, instructions, image) VALUES (?, ?, ?, ?);`,
        [name, ingredients, instructions, image],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

// Fetch toate rețetele
export const getRecipes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM recipes;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM recipes WHERE id = ?;`,
        [id],
        (_, { rows }) => resolve(rows._array[0]),
        (_, err) => reject(err)
      );
    });
  });
};

