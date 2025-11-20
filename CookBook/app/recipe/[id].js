import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { getRecipeById } from "../../database";
import { useLocalSearchParams } from "expo-router";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const load = async () => {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        const r = await getRecipeById(numericId);
        setRecipe(r);
      } else {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(res.data.meals[0]);
      }
    };
    load();
  }, [id]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      {(recipe.image || recipe.strMealThumb) && (
        <Image source={{ uri: recipe.image || recipe.strMealThumb }} style={styles.image} />
      )}
      <Text style={styles.title}>{recipe.name || recipe.strMeal}</Text>
      <Text style={styles.subtitle}>Ingrediente:</Text>
      <Text>{recipe.ingredients || recipe.strInstructions}</Text>
      <Text style={styles.subtitle}>Instrucțiuni:</Text>
      <Text>{recipe.instructions || recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  image: { width: "100%", height: 220, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
});
