import { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, StyleSheet, Image } from "react-native";
import { getRecipes } from "../../database";
import { useRouter } from "expo-router";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  const load = async () => {
    try {
      const rows = await getRecipes();
      setRecipes(rows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsub = router.addListener?.("focus", load); // reload la întoarcere
    load();
    return () => unsub && unsub();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/recipe/${item.id}`)} style={styles.card}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
            <Text style={styles.title}>{item.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>Nu ai rețete salvate.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  card: { padding: 10, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8, elevation: 2 },
  image: { width: "100%", height: 120, borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "bold" }
});
