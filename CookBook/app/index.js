
import { View, Text, TextInput, Button, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const searchRecipes = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.log("Eroare la căutare", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Căutare Rețete</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: pasta, chicken..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Caută" onPress={searchRecipes} />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.push(`/recipe/${item.idMeal}`)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.cardText}>{item.strMeal}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#FFF8F0" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
  cardText: { fontSize: 16, flex: 1, flexWrap: "wrap" },
});
